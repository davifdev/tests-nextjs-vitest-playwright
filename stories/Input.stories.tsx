/* eslint-disable storybook/no-renderer-packages */
import { InputText } from '../app/components/InputText';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-3xl mx-auto p-12 flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input Types',
    },
    labelText: {
      control: 'text',
      description: 'Input Label',
    },
    placeholder: {
      control: 'text',
      description: 'Input example',
    },
    errorMessage: {
      control: 'text',
      description: 'Error Message',
    },
    required: {
      control: 'boolean',
      description: 'field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'field is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'reading',
    },
  },
} satisfies Meta<typeof InputText>;

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input Label',
    placeholder: 'Digite algo...',
    errorMessage: '',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'Esse é o valor padrão',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Essa é a mensagem de erro',
  },
};
