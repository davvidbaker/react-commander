import type { Meta, StoryObj } from '@storybook/react';
import commands, { getItems } from '../fixtures/commands';

import Field from './Field';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableCommands: commands,
    field: undefined,
    getItems: getItems,
    onFullyLoaded: (...args) => {
      console.log("Fully Loaded", args)
    },
  }
}
