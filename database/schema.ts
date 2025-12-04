import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text().$defaultFn(() => crypto.randomUUID()),
  username: text().notNull(),
  password_hash: text().notNull(),
});

export interface ClientUser {
  id: string;
  username: string;
}
