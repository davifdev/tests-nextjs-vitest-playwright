import { Metadata } from "next";
import { TodoContainer } from "./components/TodoContainer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testes com Vitest e Playwright",
};

export default function Home() {
  return <TodoContainer />;
}
