import { createTodoAction } from "./create-todo.action";
import { makeMocks } from "../../__tests__/utils/make-test-todo-mocks";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("createTodoAction (unit)", () => {
  it("deve chamar createTodoUseCase com os valores corretos", async () => {
    const { createTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = "Usecase should be called with this";
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  it("deve chamar o revalidatePath se o usecase retornar sucesso", async () => {
    const { revalidatePathMocked } = makeMocks();
    const description = "Usecase should be called with this";
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  it("deve retornar o mesmo valor do usecase em caso de sucesso", async () => {
    const { successResult } = makeMocks();
    const description = "Usecase should be called with this";
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  it("deve retornar o mesmo valor do usecase em caso de erro", async () => {
    const { errorResult, createTodoUseCaseSpy } = makeMocks();
    const description = "Usecase should be called with this";
    createTodoUseCaseSpy.mockResolvedValue(errorResult);
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
