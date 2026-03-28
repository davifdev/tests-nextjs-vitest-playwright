import { makeMocks } from '../../__tests__/utils/make-test-todo-mocks';

import { deleteTodoAction } from './delete-todo-action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  it('deve chama o deleteTodoUseCase com os valores corretos', async () => {
    const { deleteTodoUseCaseSpy } = makeMocks();
    const id = 'any-id';
    await deleteTodoAction(id);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(id);
  });

  it('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeMocks();
    const id = 'any-id';
    await deleteTodoAction(id);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  it('deve retornar o mesmo valor do usecase em caso de sucesso', async () => {
    const { successResult } = makeMocks();
    const id = 'any-id';
    const result = await deleteTodoAction(id);

    expect(result.success).toBe(true);
    expect(result).toStrictEqual(successResult);
  });

  it('deve retornar o mesmo valor do usecase em caso de erro', async () => {
    const { errorResult, deleteTodoUseCaseSpy } = makeMocks();
    const id = 'any-id';
    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);
    const result = await deleteTodoAction(id);

    expect(result.success).toBe(false);
    expect(result).toStrictEqual(errorResult);
  });
});
