import { render, screen } from "@testing-library/react";
import { InputText, InputTextProps } from "./InputText";
import userEvent from "@testing-library/user-event";

type Props = Partial<InputTextProps>;
const makeInput = (props: Props = {}) => {
  return (
    <InputText
      labelText="label"
      placeholder="placeholder"
      type="text"
      disabled={false}
      required={true}
      readOnly={false}
      {...props}
    />
  );
};

const renderInput = (props?: Props) => {
  const renderResult = render(makeInput(props));
  const input = screen.getByRole("textbox");
  return { input, renderResult };
};

const input = (props?: Props) => renderInput(props).input;

describe("<Input />", () => {
  describe("comportamento padrão", async () => {
    it("renderiza com label", async () => {
      const element = input({ labelText: "novo label" });
      const label = screen.getByText("novo label");

      expect(element).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it("renderiza com placeholder", async () => {
      const element = input({ placeholder: "novo placeholder" });

      expect(element).toHaveAttribute("placeholder", "novo placeholder");
    });

    it("renderiza sem label", async () => {
      input({ labelText: undefined });
      const label = screen.queryByRole("novo label");
      expect(label).not.toBeInTheDocument();
    });

    it("renderiza sem placeholder", async () => {
      const element = input({ placeholder: undefined });

      expect(element).not.toHaveAttribute("placeholder");
    });

    it("usa labelText como aria-label quando possível", async () => {
      expect(input()).toHaveAttribute("aria-label", "label");
    });

    it("usa placeholder como fallback de aria-label", async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        "aria-label",
        "placeholder",
      );
    });

    it("exibe o valor padrão corretamente", async () => {
      expect(input({ defaultValue: "valor qualquer" })).toHaveValue(
        "valor qualquer",
      );
    });

    it("aceita outras props do JSX (data-testId, maxLength)", async () => {
      const element = input({ name: "name", maxLength: 10 });
      expect(element).toHaveAttribute("name", "name");
      expect(element).toHaveAttribute("maxLength", "10");
    });
  });

  describe("acessibilidade", async () => {
    it("não exibe mensagem de erro por padrão", async () => {
      const element = input();
      expect(element).toHaveAttribute("aria-invalid", "false");
      expect(element).not.toHaveAttribute("aria-describedby");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("não marca o input como inválido por padrão", async () => {
      const element = input();
      expect(element).toHaveAttribute("aria-invalid", "false");
    });

    it("renderiza mensagem de erro quando `errorMessage` é passada", async () => {
      const element = input({ errorMessage: "tem erro" });
      const error = screen.getByRole("alert");
      const errorId = error.getAttribute("id");

      expect(element).toHaveAttribute("aria-invalid", "true");
      expect(element).toHaveAttribute("aria-describedby", errorId);
      expect(screen.queryByRole("alert")).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
  });

  describe("comportamento interativo", () => {
    it("atualiza o valor conforme o usuário digita", async () => {
      const user = userEvent.setup();
      const element = input();
      await user.type(element, "texto");
      56;

      expect(element).toHaveValue("texto");
    });
  });

  describe("estados visuais", () => {
    it("aplica classes visuais quando desabilitado", async () => {
      const element = input({ disabled: true });
      expect(element).toHaveClass(
        "disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300",
      );
    });

    it("aplica classes visuais quando readonly", async () => {
      const element = input({ readOnly: true });
      expect(element).toHaveClass("read-only:bg-slate-100");
    });

    it("adiciona classe de erro (ring vermelha) quando invpalido", async () => {
      const element = input({ errorMessage: "erro" });
      expect(element).toHaveClass("ring-red-500 focus:ring-red-700");
    });

    it("mantém classes personalizadas do usuário", async () => {
      const element = input({ className: "custom" });
      expect(element).toHaveClass("custom");
    });
  });
});
