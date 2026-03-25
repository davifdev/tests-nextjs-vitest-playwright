import { render, screen, waitFor, within } from "@testing-library/react";

import { mockTodos } from "../../app/core/__tests__/mocks/todo";
import { Todo } from "../core/todo/schemas/todo.contract";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

const user = userEvent.setup();

describe("<TodoList /> (integration)", () => {
  test("deve renderizar heading, lista e itens da lista de TODOs", async () => {});

  test("não deve renderizar a lista de items sem TODOs", async () => {});

  test("deve chamar a action correta para cada item da lista", async () => {});

  test("deve desativar os items da lista enquanto envia a action", async () => {});

  test("deve desativar os botões da lista enquanto envia a action", async () => {});

  test("deve avisar o usuário se houver erro ao apagar o TODO", async () => {});

  test("não deve chamar a action se o ID for inválido, vazio ou formado apenas com espaços", async () => {});
});

type RenderListProps = {
  delay?: number;
  success?: boolean;
  todos?: Todo[];
};

function renderList({
  delay = 0,
  success = true,
  todos = mockTodos,
}: RenderListProps = {}) {
  const newTodos = [...todos];
  const actionSuccessResult = {
    success: true,
    todo: { id: "id", description: "desc", createdAt: "createdAt" },
  };
  const actionErrorResult = {
    success: false,
    errors: ["falha ao apagar todo"],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;
  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise((r) => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  const renderResult = render(<TodoList action={action} todos={newTodos} />);

  return { action, renderResult, todos: newTodos };
}
