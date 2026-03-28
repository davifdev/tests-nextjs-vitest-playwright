import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

const user = userEvent.setup();

describe('<TodoForm /> (integration)', () => {
  test('deve renderizar todos os componentes do form', async () => {
    const { input, button } = renderForm();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('deve chamar a action com os valores corretos', async () => {
    const { action, input, button } = renderForm();

    await user.type(input, 'tarefa');
    await user.click(button);

    expect(action).toHaveBeenCalledExactlyOnceWith('tarefa');
  });

  test('deve cortar os espaços do inicio e fim da description (trim)', async () => {
    const { action, input, button } = renderForm();

    await user.type(input, '  tarefa  ');
    await user.click(button);

    expect(action).toHaveBeenCalledExactlyOnceWith('tarefa');
  });

  test('deve limpar o input se o formulário retornar sucesso', async () => {
    const { button, input } = renderForm();

    await user.type(input, 'tarefa');
    await user.click(button);

    expect(input).toHaveValue('');
  });

  test('deve desativar o botão enquanto envia a action', async () => {
    const { button, input } = renderForm({ delay: 10 });

    await user.type(input, 'tarefa');
    await user.click(button);

    await waitFor(() => expect(button).toBeDisabled());
    await waitFor(() => expect(button).toBeEnabled());
  });

  test('deve desativar o input enquanto envia a action', async () => {
    const { button, input } = renderForm({ delay: 10 });

    await user.type(input, 'tarefa');
    await user.click(button);

    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  test('deve trocar o texto do botão enquanto envia a action', async () => {
    const { button, input } = renderForm({ delay: 10 });

    await user.type(input, 'tarefa');
    await user.click(button);

    await waitFor(() => expect(button).toHaveAccessibleName('Criando tarefa'));
    await waitFor(() => expect(button).toHaveAccessibleName('Criar tarefa'));
  });

  test('deve mostrar o erro quando a action retornar erro', async () => {
    const { button, input } = renderForm({ success: false });

    await user.type(input, 'tarefa');
    await user.click(button);

    const error = await screen.findByRole('alert');

    expect(error).toHaveTextContent('falha ao criar todo');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  test('deve manter o texto digitado no input se a action retornar erro', async () => {
    const { button, input } = renderForm({ success: false });

    await user.type(input, 'tarefa');
    await user.click(button);

    expect(input).toHaveValue('tarefa');
  });
});

type RenderForm = {
  delay?: number;
  success?: boolean;
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: 'any-id', description: 'description', createdAt: 'any-date' },
  };

  const actionErrorResult = {
    success: false,
    errors: ['falha ao criar todo'],
  };

  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText('Tarefa');
  const button = screen.getByRole('button');

  return { input, button, action };
}
