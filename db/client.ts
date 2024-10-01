import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/schemas";

/**
 * Single client is instantiated and shared across the application.
 * This Postgres client is used by Drizzle ORM.
 */

declare global {
  var drizzle: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV !== "production") {
  if (!global.drizzle)
    global.drizzle = drizzle(postgres(`${process.env["POSTGRES_URI"]}`), {
      schema,
    });

  db = global.drizzle;
} else {
  db = drizzle(postgres(`${process.env["POSTGRES_URI"]}`), { schema });
}

export { db };
