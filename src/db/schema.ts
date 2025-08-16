import {
  numeric,
  pgTable,
  timestamp,
  varchar,
  pgEnum
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

export const aiResultClassificationEnum = pgEnum('classification', ['racist', 'non-racist'])

export const aiResultsTable = pgTable("ai_results", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  text: varchar("text").notNull(),
  classification: aiResultClassificationEnum("classification").notNull(),
  confidence: numeric("confidence").notNull(),
  source: varchar("source").notNull(),
  collectedAt: timestamp("collected_at").defaultNow(),
});

export type AIResult = typeof aiResultsTable.$inferSelect;
export const aiResultSelectSchema = createSelectSchema(aiResultsTable);
