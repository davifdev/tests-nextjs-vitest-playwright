import { makeTestTodoRepository } from "../../__tests__/utils/make-test-todo-repository";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo.usecase";

describe("createTodoUsecase (integration)", async () => {
  // Limpa a base de dados antes de cada teste
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  // Limpa a base de dados depois do bloco inteiro
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  it("deve retornar erro se a validação falhar", async () => {
    const result = (await createTodoUseCase("")) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it("deve retornar o TODO se a validação passar", async () => {
    const description = "my description";
    const result = (await createTodoUseCase(description)) as ValidTodo;

    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description,
      createdAt: expect.any(String),
    });
  });

  it("deve retornar erro se o repositório falhar", async () => {
    const description = "my description";
    (await createTodoUseCase(description)) as ValidTodo;
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Já existe um todo com ID ou descrição enviados",
    ]);
  });
});
