import mongoose from "mongoose";

/**
 * Helper to check whether MONGODB_URI is configured.
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0);
}

/**
 * Serverless functions (and Next.js dev-mode hot reload) can invoke this
 * module many times per process. Without caching, each invocation would
 * open a new connection and quickly exhaust MongoDB Atlas's free-tier
 * connection limit. We cache the connection (and in-flight connection
 * promise) on the Node.js global object so it survives across invocations
 * within the same warm Lambda/edge instance.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};
global._mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to .env.local (dev) " +
        "or your Vercel project's Environment Variables (production)."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      // Keep the pool small — free-tier Atlas clusters (M0) cap total
      // connections around 500, and serverless can spin up many instances.
      maxPoolSize: 5,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next request can retry a fresh connection instead of
    // reusing a rejected promise forever.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
