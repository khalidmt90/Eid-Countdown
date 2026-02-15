import { type User, type InsertUser, type Session, users, sessions } from "@shared/schema";
import { db } from "./db";
import { eq, gt } from "drizzle-orm";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY_DAYS = 30;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSession(userId: string): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<void>;
  hashPassword(plain: string): Promise<string>;
  verifyPassword(plain: string, hashed: string): Promise<boolean>;
}

class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await this.hashPassword(insertUser.password);
    const [user] = await db.insert(users).values({
      username: insertUser.username,
      password: hashedPassword,
    }).returning();
    return user;
  }

  async createSession(userId: string): Promise<Session> {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + TOKEN_EXPIRY_DAYS);

    const [session] = await db.insert(sessions).values({
      token,
      userId,
      expiresAt,
    }).returning();
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, token));

    if (!session) return undefined;
    if (session.expiresAt < new Date()) {
      await this.deleteSession(token);
      return undefined;
    }
    return session;
  }

  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS);
  }

  async verifyPassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}

export const storage = new DatabaseStorage();
