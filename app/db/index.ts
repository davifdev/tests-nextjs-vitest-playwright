import Database from "better-sqlite3";
import { getFullEnv } from "../env/configs";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { todoTable } from "../core/todo/schemas/drizzle-todo-table.schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const makeDrizzle = () => {
  const { databaseFile, currentEnv, drizzleMigrationsFolder } = getFullEnv();
  const sqliteDatabase = new Database(databaseFile);

  const db = drizzle(sqliteDatabase, {
    schema: { todo: todoTable },
  });

  // Se o ambiente for testes unit e int ou end-to-end faz a migração
  if (["test", "e2e"].includes(currentEnv)) {
    migrate(db, { migrationsFolder: drizzleMigrationsFolder });
  }

  return db;
};

declare global {
  var __db__: DrizzleDatabase;
}

if (!globalThis.__db__) {
  globalThis.__db__ = makeDrizzle();
}

export const drizzleDatanase = {
  db: globalThis.__db__,
  todoTable,
};

export type DrizzleDatabase = ReturnType<typeof makeDrizzle>;
