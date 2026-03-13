import { drizzleDatabase } from "../../../db/index";
import { DrizzleTodoRepository } from "../../todo/repositories/drizzle-todo.repository";
import { eq } from "drizzle-orm";

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);
  const todos = makeTestTodos();

  const insertTodoDb = () => db.insert(todoTable);
  const deleteTodoNoWhere = () => db.delete(todoTable);
  const deleteTodoDb = (id: string) =>
    db.delete(todoTable).where(eq(todoTable.id, id));

  return {
    insertTodoDb,
    deleteTodoNoWhere,
    deleteTodoDb,
    repository,
    todos,
  };
}

export const insertTestTodos = async () => {
  const { insertTodoDb } = await makeTestTodoRepository();
  const todos = makeTestTodos();

  await insertTodoDb().values(todos);
};

export const makeTestTodos = () => {
  return Array.from({ length: 5 }).map((_, index) => {
    const newTodo = {
      id: index.toString(),
      description: `Todo ${index}`,
      createdAt: `Date ${index}`,
    };
    return newTodo;
  });
};
