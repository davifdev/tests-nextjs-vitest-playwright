// Esse é um teste de implementação consciente:
// Estamos testando se o botão tem as classes certa baseadas em props.
//  A Testing Library recomenda evitar esse tipo de teste.
// mas nesse caso, o comportamento é visual.
// Logo, esse teste é necessário e justificado.

import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { userEvent } from "@testing-library/user-event";

const props = {
  VARIANT_DEFAULT_CLASSES: "bg-blue-600 hover:bg-blue-700 text-blue-100",
  VARIANT_DANGER_CLASSES: "bg-red-600 hover:bg-red-700 text-red-100",
  VARIANT_GHOST_CLASSES: "bg-slate-300 hover:bg-slate-400 text-slate-950",
  SIZE_MD_CLASSES:
    "text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2",
  SIZE_SM_CLASSES:
    "text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1",
  SIZE_LG_CLASSES:
    "text-lg/tight py-4 px-6  rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3",
  DISABLED_CLASSES:
    "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed",
};

describe("<Button />", () => {
  describe("props padrão e JSX", async () => {
    it("deve renderizar o botão com props padrão (apenas com children)", async () => {
      render(<Button>Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(props.VARIANT_DEFAULT_CLASSES);
      expect(button).toHaveClass(props.SIZE_MD_CLASSES);
    });

    it("verifica se as propiedades padrão do JSX funcionam corretamente", async () => {
      const handleClick = vi.fn();
      render(
        <Button
          onClick={handleClick}
          type="submit"
          aria-label="Enviar formulário"
        >
          Enviar formulário
        </Button>,
      );

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveAttribute("aria-label", "Enviar formulário");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("variants (colors)", async () => {
    it("checa se default aplica a cor correta", async () => {
      render(<Button variant="default">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.VARIANT_DEFAULT_CLASSES);
    });

    it("checa se danger aplica a cor correta", async () => {
      render(<Button variant="danger">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.VARIANT_DANGER_CLASSES);
    });

    it("checa se ghost aplica a cor correta", async () => {
      render(<Button variant="ghost">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.VARIANT_GHOST_CLASSES);
    });
  });

  describe("size (tamanhos)", async () => {
    it("tamanho sm deve ser menor", async () => {
      render(<Button size="sm">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.SIZE_SM_CLASSES);
    });

    it("tamanho md deve ser médio", async () => {
      render(<Button size="md">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.SIZE_MD_CLASSES);
    });

    it("tamanho lg deve ser maior", async () => {
      render(<Button size="lg">Enviar formulário</Button>);

      const button = screen.getByRole("button", {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass(props.SIZE_LG_CLASSES);
    });
  });

  describe("disabled", () => {
    it("classes para estado desativado estão corretas", async () => {
      render(<Button disabled>Enviar formulário</Button>);

      const button = screen.getByRole("button", { name: /enviar formulário/i });

      expect(button).toHaveClass(props.DISABLED_CLASSES);
      expect(button).toBeDisabled();
    });
  });
});
