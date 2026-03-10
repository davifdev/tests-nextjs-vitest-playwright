import { makeNewTodo } from "./make-new-todo";

it("should return a new valid todo", () => {
  // AAA --> Arrange, Act, Assert

  // Arrange --> Criar tudo que eu preciso para o teste
  const expectedTodo = {
    id: expect.any(String),
    description: "descrição do todo",
    createdAt: expect.any(String),
  };

  // Act --> Executar a Ação que deve ser testada
  const newTodo = makeNewTodo("descrição do todo");

  // Assert --> Eu preciso checar se oque eu espero aconteceu
  // toBe: Valores Primitivos ===
  // toEqual, toStrictEqual: Objetos

  // Checando apenas a description
  expect(expectedTodo.description).toBe(newTodo.description);

  // Checando o objeto inteiro
  expect(expectedTodo).toStrictEqual(newTodo);
});
