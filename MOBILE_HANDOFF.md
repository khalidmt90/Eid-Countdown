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

HTTP status: `200`

### Error

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

HTTP status: `400`, `404`, or `500`

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

### 2. Next Prayer

**`GET /api/next-prayer`**

Returns the next upcoming prayer time for a location.

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
{
  "error": {
    "code": "NEXT_PRAYER_FAILED",
    "message": "Failed to compute next prayer time"
  }
}
```

#### Caching

Responses are cached for 5 minutes per location+language combination.

---

### 3. Prayer Times

**`GET /api/prayer-times`**

Returns all prayer times for a specific date and location, including Hijri date and city name.

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
{
  "error": {
    "code": "INVALID_DATE",
    "message": "Date must be in YYYY-MM-DD format"
  }
}
```

**Server error (500)**:
```json
{
  "error": {
    "code": "PRAYER_TIMES_FAILED",
    "message": "Failed to compute prayer times"
  }
}
```

#### Caching

Responses are cached for 10 minutes per location+language+date combination.

---

### 4. Unknown Endpoint

**`ANY /api/*`**

Any request to an undefined API path returns:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Endpoint GET /api/foo not found"
  }
}
```

HTTP status: `404`

---

## CORS

All API endpoints accept cross-origin requests from any domain. The following headers are set:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## Calculation Method

All prayer times use:
- **Method**: Umm al-Qura (Saudi Arabia)
- **Madhab**: Shafi'i (for Asr calculation)
- **Library**: [adhan-js](https://github.com/batoulapps/adhan-js)

---

## Notes for Mobile Developers

1. **Location**: Always send `lat` and `lng` from the device GPS for accurate results. If unavailable, the server uses IP geolocation as a fallback.
2. **Language**: Send the user's preferred language as `lang=ar` or `lang=en`. Arabic prayer names are returned for `ar`.
3. **Offline**: Cache prayer times responses locally on the device since they don't change within the same day for the same location.
4. **Time Parsing**: `nextPrayer.timeISO` includes timezone offset (e.g., `+03:00`). Use this for countdown timers. Prayer `time` fields are `HH:MM` strings in local time.
5. **Error Handling**: Always check for the `error` key in responses before accessing `data`.
6. **Health Check**: Use `/api/health` on app startup to verify backend connectivity.
