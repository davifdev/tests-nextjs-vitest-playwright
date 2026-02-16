import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  describe("create", () => {
    it("should return a new valid todo", () => {
      // AAA --> Arrange, Act, Assert
      // Arrange --> Criar as coisas que eu preciso
      const expectedTodo = {
        id: expect.any(String),
        description: "my new todo",
        createdAt: expect.any(String),
      };

      // Act --> Ação que você está testando
      const newTodo = makeNewTodo("my new todo");

      // Assert --> Checar se oque eu espero realmente aconteceu

      // Checando apenas a description
      expect(newTodo.description).toBe(expectedTodo.description);

      // Checando o objeto inteiro
      expect(newTodo).toStrictEqual(expectedTodo);
    });
  });
});
