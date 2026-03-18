import {
  insertTestTodos,
  makeTestTodoRepository,
} from "../../__tests__/utils/make-test-todo-repository";

describe("DrizzleTodoRepository, (integration)", () => {
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

  describe("findAll", () => {
    it("deve retornar um array vazio se a tabela estiver limpa", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
    });

    it("deve retornar todos os TODOS em ordem decrescente", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();

      console.log(result);
      expect(result[0].createdAt).toBe("Date 4");
      expect(result[1].createdAt).toBe("Date 3");
      expect(result[2].createdAt).toBe("Date 2");
      expect(result[3].createdAt).toBe("Date 1");
      expect(result[4].createdAt).toBe("Date 0");
    });
  });

  describe("create", () => {
    it("cria um todo se os dados estão válidos", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    it("falha se houver uma descrição igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com a mesma descrição
      const anotherTodo = {
        id: "any-id",
        description: todos[0].description,
        createdAt: "any-date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com ID ou descrição enviados"],
      });
    });

    it("falha se houver um ID igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com o mesmo id
      const anotherTodo = {
        id: todos[0].id,
        description: "any-description",
        createdAt: "any-date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com ID ou descrição enviados"],
      });
    });

    it("falha se houver um ID e descrição iguais", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com o mesmo id
      const anotherTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: "any-date",
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com ID ou descrição enviados"],
      });
    });
  });

  describe("remove", () => {
    it("apaga um todo se ele existir", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    it("falha ao apagar se o todo não existir", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const result = await repository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo não existe"],
      });
    });
  });
});
