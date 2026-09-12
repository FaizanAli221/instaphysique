/**
 * Minimal fixed-window rate limiter keyed by IP, held in a global Map so it
 * survives across invocations on the same warm serverless instance.
 *
 * Honest limitation: Vercel can run multiple concurrent instances of the
 * same function, each with its own memory, so this does NOT guarantee a
 * hard global cap under real load — a determined attacker spread across
 * instances could exceed it. It's enough to stop naive bots and accidental
 * double-submits. For a hard guarantee, swap this for Upstash Redis
 * (`@upstash/ratelimit` + `@upstash/redis`), which is free-tier friendly
 * and works identically across every instance — see the README for the
 * drop-in swap.
 */

interface WindowEntry {
  count: number;
  windowStart: number;
}

declare global {
  // eslint-disable-next-line no-var
  var _rateLimitStore: Map<string, WindowEntry> | undefined;
}

const store = global._rateLimitStore ?? new Map<string, WindowEntry>();
global._rateLimitStore = store;

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  {
    windowMs = WINDOW_MS,
    maxRequests = MAX_REQUESTS_PER_WINDOW,
  }: { windowMs?: number; maxRequests?: number } = {}
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil(
      (entry.windowStart + windowMs - now) / 1000
    );
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    retryAfterSeconds: 0,
  };
}

/** Best-effort client IP extraction behind Vercel's edge network. */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
