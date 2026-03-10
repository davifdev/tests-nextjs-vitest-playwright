import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  it("should return errors when the description has fewer than 4 characters", () => {
    const description = "abc";
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([
      "Descrição precisa ter mais de 3 caracteres",
    ]);
    expect(result.success).toBe(false);
  });

  it("should return success when the description has more than 3 characters.", () => {
    const description = "abcd";

    expect(validateTodoDescription(description).errors).toStrictEqual([]);
    expect(validateTodoDescription(description).success).toBe(true);
  });
});
