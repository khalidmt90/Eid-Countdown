import type { Request, Response, NextFunction } from "express";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const buckets = new Map<string, Map<string, RateLimitEntry>>();

function getClientIP(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip || req.socket.remoteAddress || "unknown";
}

function cleanBucket(bucket: Map<string, RateLimitEntry>) {
  const now = Date.now();
  for (const [key, entry] of bucket.entries()) {
    if (entry.resetAt <= now) bucket.delete(key);
  }
}

setInterval(() => {
  for (const bucket of buckets.values()) {
    cleanBucket(bucket);
  }
}, 60_000);

export function rateLimit(name: string, config: RateLimitConfig) {
  const bucket = new Map<string, RateLimitEntry>();
  buckets.set(name, bucket);

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIP(req);
    const now = Date.now();
    const entry = bucket.get(ip);

    if (!entry || entry.resetAt <= now) {
      bucket.set(ip, { count: 1, resetAt: now + config.windowMs });
      res.setHeader("X-RateLimit-Limit", config.maxRequests);
      res.setHeader("X-RateLimit-Remaining", config.maxRequests - 1);
      return next();
    }

    entry.count++;

    if (entry.count > config.maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", retryAfter);
      res.setHeader("X-RateLimit-Limit", config.maxRequests);
      res.setHeader("X-RateLimit-Remaining", 0);
      return res.status(429).json({
        error: {
          code: "RATE_LIMITED",
          message: `Too many requests. Try again in ${retryAfter} seconds.`,
        },
      });
    }

    res.setHeader("X-RateLimit-Limit", config.maxRequests);
    res.setHeader("X-RateLimit-Remaining", config.maxRequests - entry.count);
    next();
  };
}

export const apiRateLimit = rateLimit("api", {
  windowMs: 60_000,
  maxRequests: 60,
});

export const authRateLimit = rateLimit("auth", {
  windowMs: 60_000,
  maxRequests: 10,
});
