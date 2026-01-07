// Rate limiting implementation
// Uses in-memory storage for development, Redis for production

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

// In-memory storage (development only)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

// Clean up expired entries every minute
if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of inMemoryStore.entries()) {
      if (value.resetAt < now) {
        inMemoryStore.delete(key);
      }
    }
  }, 60 * 1000);
}

/**
 * Check rate limit for a given identifier (userId or IP)
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60 * 60 * 1000 } // 5 requests per hour default
): Promise<RateLimitResult> {
  const key = `${identifier}:${action}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Check if we should use Redis (production)
  if (process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL) {
    return checkRedisRateLimit(key, config);
  }

  // In-memory implementation for development
  let record = inMemoryStore.get(key);

  // Reset if window expired
  if (!record || record.resetAt < now) {
    record = { count: 0, resetAt: now + config.windowMs };
    inMemoryStore.set(key, record);
  }

  record.count++;

  const allowed = record.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - record.count);

  return {
    allowed,
    remaining,
    resetAt: new Date(record.resetAt),
  };
}

/**
 * Redis-based rate limiting for production
 */
async function checkRedisRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  try {
    // Dynamic import to avoid issues in environments without Redis
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const now = Date.now();
    const windowKey = `ratelimit:${key}:${Math.floor(now / config.windowMs)}`;

    const current = await redis.incr(windowKey);

    if (current === 1) {
      // Set expiry on first increment
      await redis.expireat(windowKey, Math.floor((now + config.windowMs) / 1000));
    }

    const allowed = current <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - current);
    const ttl = await redis.ttl(windowKey);
    const resetAt = new Date(now + ttl * 1000);

    return { allowed, remaining, resetAt };
  } catch (error) {
    console.error("Redis rate limit error, falling back to allow:", error);
    // Fail open - allow request if Redis is down
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetAt: new Date(Date.now() + config.windowMs),
    };
  }
}

/**
 * Rate limit configurations for different actions
 */
export const RATE_LIMITS = {
  generate_case: { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  regenerate: { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 per hour
  create_case: { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 per hour
} as const;
