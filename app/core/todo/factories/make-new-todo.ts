// Quando eu chamar essa função eu passo um parâmetro description, e essa função irá me retornar um objeto que tenha uma chave id, description e createdAt
export function makeNewTodo(description: string) {
  return {
    id: crypto.randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
