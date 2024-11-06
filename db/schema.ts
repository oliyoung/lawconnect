import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const prompts = sqliteTable("prompts", {
    id: int().primaryKey({ autoIncrement: true }),
    body: text().notNull(),
});

export const responses = sqliteTable("responses", {
    id: int().primaryKey({ autoIncrement: true }),
    body: text().notNull(),
    promptId: int('prompt_id').notNull().references(() => prompts.id),
})