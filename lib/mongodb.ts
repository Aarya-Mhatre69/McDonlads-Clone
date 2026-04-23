import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB  = process.env.MONGODB_DB  || "mcdonald";

if (!MONGODB_URI) {
  throw new Error(
    "❌ MONGODB_URI is missing from .env.local\n" +
    "Add this line: MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/"
  );
}

/* ── Connection cache (survives hot-reloads in dev) ── */
let cachedClient: MongoClient | null = null;
let cachedDb:     Db | null          = null;

async function getConnection(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db     = client.db(MONGODB_DB);
  cachedClient = client;
  cachedDb     = db;
  return { client, db };
}

/*
 * Both names exported — works regardless of which your files use:
 *   import { connectToDatabase } from "@/lib/mongodb"  ✓
 *   import { connectDB }         from "@/lib/mongodb"  ✓
 */
export const connectToDatabase = getConnection;
export const connectDB         = getConnection;