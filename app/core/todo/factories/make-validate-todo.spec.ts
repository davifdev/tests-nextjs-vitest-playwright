import * as sanitizeStrMod from '../../../utils/sanitize-str';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import * as validatedTodoDescriptionMod from '../schemas/validate-todo-description';
import * as makeNewTodoMod from './make-new-todo';
import { makeValidatedTodo } from './make-validate-todo';

describe('makeValidateTodo (unit)', () => {
  it('deve chamar a função sanitizeStr com o valor correto', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  it('deve chamar validatedTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validatedDescriptionSpy } =
      makeMocks();
    const sanitizeSrtReturn = 'retorno da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeSrtReturn);

    makeValidatedTodo(description);

    expect(validatedDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeSrtReturn,
    );
  });

  it('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description: 'abcd',
      createdAt: expect.any(String),
    });
  });

  it('deve chamar validatedDescription.errors se a validação falhou', () => {
    const { errors, description, validatedDescriptionSpy } = makeMocks();
    validatedDescriptionSpy.mockReturnValue({ success: false, errors });
    const result = makeValidatedTodo(description) as InvalidTodo;

    expect(result).toStrictEqual({ errors, success: false });
  });
});

const makeMocks = (description = 'abcd') => {
  const errors = ['Err'];
  const todo = {
    id: 'any-id',
    description,
    createdAt: new Date().toISOString(),
  };
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);
  const validatedDescriptionSpy = vi
    .spyOn(validatedTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({ success: true, errors: [] });
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    sanitizeStrSpy,
    validatedDescriptionSpy,
    makeNewTodoSpy,
    description,
    todo,
    errors,
  };
};
