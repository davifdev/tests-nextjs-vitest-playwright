/* eslint-disable storybook/no-renderer-packages */
import { TodoForm } from "../app/components/TodoForm";
import type { Meta, StoryObj } from "@storybook/react";
import { todoActionStoryMock } from "@/app/core/__tests__/mocks/todo-action-story";

const meta = {
  title: "Components/Forms/TodoForm",
  component: TodoForm,
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-12 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    action: {
      control: false,
    },
  },
} satisfies Meta<typeof TodoForm>;

export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    action: todoActionStoryMock.create.success,
  },
};

export const WithError: Story = {
  args: {
    action: todoActionStoryMock.create.error,
  },
};
