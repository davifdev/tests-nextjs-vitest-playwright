import { makeTestTodoRepository } from "@/app/core/__tests__/utils/make-test-todo-repository";
import { test, expect, Page } from "@playwright/test";

const helpers = {
  HOME_URL: "/",
  HEADING: "Lista de Tarefas",
  INPUT: "Tarefa",
  BUTTON: "Criar tarefa",
  BUTTON_BUSY: "Criando tarefa...",
  NEW_TODO_TEXT: "New Todo",
};

const getHeading = (p: Page) =>
  p.getByRole("heading", { name: helpers.HEADING });
const getInput = (p: Page) => p.getByRole("textbox", { name: helpers.INPUT });
const getButton = (p: Page) => p.getByRole("button", { name: helpers.BUTTON });
const getButtonBusy = (p: Page) =>
  p.getByRole("button", { name: helpers.BUTTON_BUSY });

const getAll = (p: Page) => ({
  heading: getHeading(p),
  input: getInput(p),
  button: getButton(p),
  buttonBusy: getButtonBusy(p),
});

test.beforeEach(async ({ page }) => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();

  await page.goto(helpers.HOME_URL);
});

test.afterAll(async () => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();
});

test.describe("<Home /> (e2e)", () => {
  // Renderização
  test.describe("Renderização", () => {
    test("deve ter o title html correto", async ({ page }) => {
      await expect(page).toHaveTitle("Testes com Vitest e Playwright");
    });

    test("deve renderizar o cabeçalho, o input e o botão para criar TODOs", async ({
      page,
    }) => {
      await expect(getHeading(page)).toBeVisible();
      await expect(getInput(page)).toBeVisible();
      await expect(getButton(page)).toBeVisible();
    });
  });
  // Criação
  // Exclusão
  // Erros
});
