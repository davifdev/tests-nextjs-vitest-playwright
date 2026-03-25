"use client";

import React, { useRef, useState, useTransition } from "react";

import { sanitizeStr } from "../utils/sanitize-str";
import { InputText } from "./InputText";
import { Button } from "./Button";
import { CirclePlusIcon } from "lucide-react";
import { CreateTodoAction } from "../core/todo/actions/todo.action.types";

interface TodoFormProps {
  action: CreateTodoAction;
}

export function TodoForm({ action }: TodoFormProps) {
  const [pending, startTransition] = useTransition();
  const [inputError, setInputError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = inputRef.current;

    if (!input) return;

    const description = sanitizeStr(input.value);

    startTransition(async () => {
      const result = await action(description);

      if (!result.success) {
        setInputError(result.errors[0]);
        return;
      }

      input.value = "";
      setInputError("");
    });
  }

  return (
    <form onSubmit={handleCreateTodo} className="flex flex-col flex-1 gap-6">
      <InputText
        name="description"
        labelText="Tarefa"
        placeholder="Digite sua tarefa"
        disabled={pending}
        errorMessage={inputError}
        ref={inputRef}
      />
      <Button type="submit" disabled={pending}>
        <CirclePlusIcon />
        {!pending && <span>Criar tarefa</span>}
        {pending && <span>Criando tarefa</span>}
      </Button>
    </form>
  );
}
