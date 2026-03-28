import { makeTestTodoRepository } from '../../__tests__/utils/make-test-todo-repository';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import { deleteTodoUseCase } from './delete-todo-usecase';

describe('deletTodoUseCase (integration)', () => {
  // Limpa a base de dados antes de cada teste
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  // Limpa a base de dados depois do bloco inteiro
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  it('deve retornar erro se o id for inválido', async () => {
    const id = '';
    const result = (await deleteTodoUseCase(id)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(['Id inválido']);
  });

  it('deve retornar sucesso se o TODO existe na base de dados', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos[0]);

    const result = (await deleteTodoUseCase(todos[0].id)) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual(todos[0]);
  });

  it('deve retornar erro se o TODO não existe na base de dados', async () => {
    const id = 'any-string';
    const result = (await deleteTodoUseCase(id)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(['Todo não existe']);
  });
});
