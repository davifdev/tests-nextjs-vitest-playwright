'use server';

import { revalidatePath } from 'next/cache';
import { deleteTodoUseCase } from '../usecases/delete-todo-usecase';
import { devOnlyDelay } from '../../../utils/dev-only-delay';

export async function deleteTodoAction(id: string) {
  await devOnlyDelay(500);
  const result = await deleteTodoUseCase(id);

  if (result) {
    revalidatePath('/');
  }

  return result;
}
