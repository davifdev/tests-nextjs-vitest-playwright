import { revalidatePath } from "next/cache";
import { InvalidTodo, ValidTodo } from "../../todo/schemas/todo.contract";
import * as createTodoUseCaseMod from "../../todo/usecases/create-todo.usecase";
import * as deleteTodoUseCaseMod from "../../todo/usecases/delete-todo-usecase";

export const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: "any-id",
      description: "any-description",
      createdAt: "any-date",
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ["any-error"],
  } as InvalidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, "createTodoUseCase")
    .mockResolvedValue(successResult);
  const deleteTodoUseCaseSpy = vi
    .spyOn(deleteTodoUseCaseMod, "deleteTodoUseCase")
    .mockResolvedValue(successResult);
  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    createTodoUseCaseSpy,
    deleteTodoUseCaseSpy,
    successResult,
    errorResult,
    revalidatePathMocked,
  };
};
