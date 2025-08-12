import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@/db/schema";

neonConfig.useSecureWebSocket = true;

const client = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(client, { schema: schema });
