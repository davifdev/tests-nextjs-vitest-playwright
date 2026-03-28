'use server';

import { revalidatePath } from 'next/cache';
import { createTodoUseCase } from '../usecases/create-todo.usecase';
import { devOnlyDelay } from '../../../utils/dev-only-delay';

export async function createTodoAction(description: string) {
  await devOnlyDelay(500);
  const createResult = await createTodoUseCase(description);

  if (createResult) {
    revalidatePath('/');
  }

  return createResult;
}
