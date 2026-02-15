# Mobile App API Documentation

Base URL: `https://<your-app>.replit.app`

API Version: `1.0`

## Response Format

All endpoints return JSON with a consistent shape.

### Success

```json
{
  "data": { ... }
}
```

HTTP status: `200` (or `201` for resource creation)

### Error

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

HTTP status: `400`, `401`, `404`, `409`, or `500`

---

## Authentication

Token-based authentication using Bearer tokens. No cookies are used. No redirects are returned.

### Flow

1. Call `POST /api/auth/register` or `POST /api/auth/login` to get a token
2. Store the token securely on the device (Keychain on iOS, EncryptedSharedPreferences on Android)
3. Send the token in the `Authorization` header for protected endpoints:
   ```
   Authorization: Bearer <token>
   ```
4. Tokens expire after 30 days. On `SESSION_EXPIRED` error, prompt the user to log in again.

---

## Endpoints

### 1. Health Check

**`GET /api/health`**

Use this to verify the backend is running and reachable.

#### Query Parameters

None.

#### Example Response (200)

```json
{
  "data": {
    "ok": true,
    "version": "1.0",
    "time": "2025-06-15T12:00:00.000Z"
  }
}
```

---

### 2. Register

**`POST /api/auth/register`**

Creates a new user account and returns an auth token.

#### Request Body (JSON)

| Field      | Type   | Required | Description                        |
|------------|--------|----------|------------------------------------|
| `username` | string | Yes      | Min 3 characters, must be unique   |
| `password` | string | Yes      | Min 6 characters                   |

#### Example Request

```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "ahmed",
  "password": "securepass123"
}
```

#### Example Response (201)

```json
{
  "data": {
    "token": "a1b2c3d4e5f6...",
    "expiresAt": "2025-07-15T12:00:00.000Z",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "ahmed"
    }
  }
}
```

#### Error Responses

**Short username (400)**:
```json
{ "error": { "code": "INVALID_USERNAME", "message": "Username must be at least 3 characters" } }
```

**Short password (400)**:
```json
{ "error": { "code": "INVALID_PASSWORD", "message": "Password must be at least 6 characters" } }
```

**Username taken (409)**:
```json
{ "error": { "code": "USERNAME_TAKEN", "message": "This username is already registered" } }
```

---

### 3. Login

**`POST /api/auth/login`**

Authenticates an existing user and returns an auth token.

#### Request Body (JSON)

| Field      | Type   | Required | Description |
|------------|--------|----------|-------------|
| `username` | string | Yes      | Username    |
| `password` | string | Yes      | Password    |

#### Example Request

```json
POST /api/auth/login
Content-Type: application/json

{
  "username": "ahmed",
  "password": "securepass123"
}
```

#### Example Response (200)

```json
{
  "data": {
    "token": "a1b2c3d4e5f6...",
    "expiresAt": "2025-07-15T12:00:00.000Z",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "ahmed"
    }
  }
}
```

#### Error Responses

**Missing fields (400)**:
```json
{ "error": { "code": "INVALID_USERNAME", "message": "Username is required" } }
```

**Wrong credentials (401)**:
```json
{ "error": { "code": "INVALID_CREDENTIALS", "message": "Invalid username or password" } }
```

---

### 4. Logout

**`POST /api/auth/logout`**

Invalidates the current session token. Requires `Authorization: Bearer <token>`.

#### Headers

```
Authorization: Bearer <token>
```

#### Example Response (200)

```json
{
  "data": {
    "ok": true
  }
}
```

#### Error Response (401)

```json
{ "error": { "code": "UNAUTHORIZED", "message": "Authorization header with Bearer token is required" } }
```

---

### 5. Current User Profile

**`GET /api/me`**

Returns the authenticated user's profile. Requires `Authorization: Bearer <token>`.

#### Headers

```
Authorization: Bearer <token>
```

#### Example Response (200)

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "ahmed",
    "createdAt": "2025-06-15T12:00:00.000Z"
  }
}
```

#### Error Responses

**No token (401)**:
```json
{ "error": { "code": "UNAUTHORIZED", "message": "Authorization header with Bearer token is required" } }
```

**Expired/invalid token (401)**:
```json
{ "error": { "code": "SESSION_EXPIRED", "message": "Token is invalid or expired" } }
```

---

### 6. Next Prayer

**`GET /api/next-prayer`**

Returns the next upcoming prayer time for a location. No authentication required.

#### Query Parameters

| Param  | Type   | Required | Description                        |
|--------|--------|----------|------------------------------------|
| `lat`  | number | No       | Latitude (-90 to 90)               |
| `lng`  | number | No       | Longitude (-180 to 180)            |
| `lang` | string | No       | `"ar"` or `"en"` (default: `"en"`) |

If `lat`/`lng` are omitted, the server falls back to IP geolocation, then to Riyadh (24.71, 46.68).

#### Example Request

```
GET /api/next-prayer?lat=21.42&lng=39.83&lang=ar
```

#### Example Response (200)

```json
{
  "data": {
    "tz": "Asia/Riyadh",
    "method": "UmmAlQura",
    "location": {
      "lat": 21.42,
      "lng": 39.83,
      "source": "gps"
    },
    "nextPrayer": {
      "name": "العصر",
      "timeISO": "2025-06-15T15:30:00+03:00"
    }
  }
}
```

#### Location Source Values

| Value      | Meaning                                |
|------------|----------------------------------------|
| `"gps"`    | Coordinates provided via query params  |
| `"ip"`     | Resolved from server's IP geolocation  |
| `"fallback"` | Default Riyadh coordinates used     |

#### Error Response (500)

```json
{ "error": { "code": "NEXT_PRAYER_FAILED", "message": "Failed to compute next prayer time" } }
```

#### Caching

Responses are cached for 5 minutes per location+language combination.

---

### 7. Prayer Times

**`GET /api/prayer-times`**

Returns all prayer times for a specific date and location, including Hijri date and city name. No authentication required.

#### Query Parameters

| Param  | Type   | Required | Description                                  |
|--------|--------|----------|----------------------------------------------|
| `lat`  | number | No       | Latitude (-90 to 90)                         |
| `lng`  | number | No       | Longitude (-180 to 180)                      |
| `lang` | string | No       | `"ar"` or `"en"` (default: `"en"`)           |
| `date` | string | No       | Date in `YYYY-MM-DD` format (default: today) |

#### Example Request

```
GET /api/prayer-times?lat=21.42&lng=39.83&lang=en&date=2025-06-15
```

#### Example Response (200)

```json
{
  "data": {
    "city": "Mecca",
    "hijri": "19 Dhul-Hijjah 1446",
    "date": "2025-06-15",
    "tz": "Asia/Riyadh",
    "location": {
      "lat": 21.42,
      "lng": 39.83,
      "source": "gps"
    },
    "prayers": [
      { "key": "fajr",    "name": "Fajr",    "time": "04:25" },
      { "key": "sunrise", "name": "Sunrise", "time": "05:47" },
      { "key": "dhuhr",   "name": "Dhuhr",   "time": "12:22" },
      { "key": "asr",     "name": "Asr",     "time": "15:45" },
      { "key": "maghrib", "name": "Maghrib", "time": "18:57" },
      { "key": "isha",    "name": "Isha",    "time": "20:27" }
    ]
  }
}
```

#### Prayer Keys

Always returned in this order: `fajr`, `sunrise`, `dhuhr`, `asr`, `maghrib`, `isha`.

Times are in 24-hour `HH:MM` format in the local timezone.

#### Error Responses

**Invalid date (400)**:
```json
{ "error": { "code": "INVALID_DATE", "message": "Date must be in YYYY-MM-DD format" } }
```

**Server error (500)**:
```json
{ "error": { "code": "PRAYER_TIMES_FAILED", "message": "Failed to compute prayer times" } }
```

#### Caching

Responses are cached for 10 minutes per location+language+date combination.

---

### 8. Unknown Endpoint

**`ANY /api/*`**

Any request to an undefined API path returns:

```json
{ "error": { "code": "NOT_FOUND", "message": "Endpoint GET /api/foo not found" } }
```

HTTP status: `404`

---

## CORS

All API endpoints accept cross-origin requests from any domain. The following headers are set:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## Caching

The server caches prayer time calculations in memory to avoid redundant computation.

| Endpoint           | Cache Key                          | TTL        |
|--------------------|------------------------------------|------------|
| `/api/next-prayer` | lat (2dp) + lng (2dp) + lang       | 5 minutes  |
| `/api/prayer-times`| lat (2dp) + lng (2dp) + lang + date| 10 minutes |

**How it works:**
- Coordinates are rounded to 2 decimal places for cache keys (e.g., `21.42_39.83_en`)
- Requests with the same rounded location, language, and date within the TTL window return the cached result instantly
- Cached responses include the `X-Cache: HIT` response header so your app can detect cache hits
- Cache is cleaned automatically; expired entries are purged periodically

**Mobile recommendation:** Cache prayer times locally on the device as well. Prayer times for a given location and date do not change, so a 24-hour local cache is safe.

---

## Rate Limiting

Rate limits are enforced per IP address to protect the API from abuse.

| Scope               | Limit              | Window   |
|----------------------|--------------------|----------|
| General `/api/*`     | 60 requests        | 1 minute |
| Auth `/api/auth/*`   | 10 requests        | 1 minute |

**Response headers** (included on every API response):

| Header                  | Description                              |
|-------------------------|------------------------------------------|
| `X-RateLimit-Limit`     | Max requests allowed in the window       |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `Retry-After`           | Seconds until the window resets (only on 429) |

**When rate limited (429)**:
```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Try again in 45 seconds."
  }
}
```

**Mobile recommendation:** If you receive a 429, read the `Retry-After` header and wait that many seconds before retrying. Auth endpoints have a stricter limit (10/min) to prevent brute-force attacks.

---

## Calculation Method

All prayer times use:
- **Method**: Umm al-Qura (Saudi Arabia)
- **Madhab**: Shafi'i (for Asr calculation)
- **Library**: [adhan-js](https://github.com/batoulapps/adhan-js)

---

## Error Code Reference

| Code                | HTTP | Meaning                              |
|---------------------|------|--------------------------------------|
| `INVALID_USERNAME`  | 400  | Username missing or too short        |
| `INVALID_PASSWORD`  | 400  | Password missing or too short        |
| `INVALID_DATE`      | 400  | Date not in YYYY-MM-DD format        |
| `UNAUTHORIZED`      | 401  | No Bearer token provided             |
| `INVALID_CREDENTIALS` | 401 | Wrong username or password          |
| `SESSION_EXPIRED`   | 401  | Token expired or invalid             |
| `USER_NOT_FOUND`    | 401  | User account no longer exists        |
| `NOT_FOUND`         | 404  | Endpoint does not exist              |
| `USERNAME_TAKEN`    | 409  | Username already registered          |
| `RATE_LIMITED`      | 429  | Too many requests, retry later       |
| `REGISTER_FAILED`   | 500  | Registration server error            |
| `LOGIN_FAILED`      | 500  | Login server error                   |
| `LOGOUT_FAILED`     | 500  | Logout server error                  |
| `PROFILE_FAILED`    | 500  | Profile fetch server error           |
| `NEXT_PRAYER_FAILED`| 500  | Prayer computation error             |
| `PRAYER_TIMES_FAILED`| 500 | Prayer times computation error       |

---

## Notes for Mobile Developers

1. **Auth tokens**: Store the token from login/register in secure device storage (iOS Keychain, Android EncryptedSharedPreferences). Never store in plain UserDefaults/SharedPreferences.
2. **Token expiry**: Tokens last 30 days. Check `expiresAt` to proactively refresh. On `SESSION_EXPIRED` (401), redirect to login screen.
3. **No cookies**: The API never sets or reads cookies. All auth is via the `Authorization: Bearer` header.
4. **No redirects**: The API never returns HTTP 3xx redirects. All responses are JSON.
5. **Location**: Always send `lat` and `lng` from the device GPS for accurate prayer times. If unavailable, the server uses IP geolocation as a fallback.
6. **Language**: Send the user's preferred language as `lang=ar` or `lang=en`. Arabic prayer names are returned for `ar`.
7. **Offline**: Cache prayer times responses locally on the device since they don't change within the same day for the same location.
8. **Time Parsing**: `nextPrayer.timeISO` includes timezone offset (e.g., `+03:00`). Use this for countdown timers. Prayer `time` fields are `HH:MM` strings in local time.
9. **Error Handling**: Always check for the `error` key in responses before accessing `data`.
10. **Health Check**: Use `/api/health` on app startup to verify backend connectivity.
