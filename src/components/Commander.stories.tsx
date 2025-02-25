// @ts-nocheck
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Commander } from './Commander';
import { Command } from './Field'
import commands, { getItems } from '../fixtures/commands';

const meta = {
  title: 'Commander',
  component: Commander,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Commander>;

export default meta
type Story = StoryObj<typeof meta>;

const Template: Story = (args) => <Commander {...args} />;

function onSubmit(command: Command) {
  console.log('%c 🙌 SUBMITTED', 'font-weight: bold;', command);
}

export const Default = Template.bind({});
Default.args = {
  appElement: document.body,
  isOpen: true,
  commands: commands,
  onSubmit: onSubmit,
  hideCommander: () => {
    console.log('hiding');
  },
  getItems: getItems,
};

export const CommandSelected = Template.bind({});
CommandSelected.args = {
  ...Default.args,
  field: { command: commands[0], parameters: {} },
};



export const CommandSelectedWithParameter = Template.bind({});
CommandSelectedWithParameter.args = {
  ...Default.args,
  field: { command: commands[0], parameters: { name: 'asf' } },
};

export const CommandSelectedWithNonFirstParameterFilledOut = Template.bind({});
CommandSelectedWithNonFirstParameterFilledOut.args = {
  ...Default.args,
  field: { command: commands[0], parameters: { thread_id: 0 } },
};

// this shold just go straight to the fully loaded state
export const CommandFullyLoaded = Template.bind({});
CommandFullyLoaded.args = {
  ...Default.args,
  field: { command: commands[0], parameters: { name: 'asdf', thread_id: 0, category_id: 1 } },
};

const ButtonTemplate: Story = () => {
  const [isOpen, toggleOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => toggleOpen(!isOpen)}>Click to open</button>
      <Commander
        appElement={document.body}
        isOpen={isOpen}
        commands={commands}
        onSubmit={onSubmit}
        hideCommander={() => {
          console.log('hiding');
        }}
        field={{
          command: commands[0],
          parameters: { name: 'asdf', thread_id: 0 },
        }}
        getItems={getItems}
      />
    </div>
  );
};

export const ButtonToOpenPartiallyFilledOut = ButtonTemplate.bind({});
