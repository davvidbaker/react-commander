import React from 'react';
import { storiesOf } from '@storybook/react';

import Commander from '../';
import commands, { getItems } from '../fixtures/commands';

console.log(`🔥  commands`, commands);

function onSubmit(command) {
  console.log('%c 🙌 SUBMITTED', 'font-weight: bold;', command);
}

storiesOf('Commander', module)
  .add('default', () => (
    <Commander
      isOpen={true}
      commands={commands}
      onSubmit={onSubmit}
      hideCommander={() => {
        console.log('hiding');
      }}
      getItems={getItems}
    />
  ))
  .add('command selected', () => (
    <Commander
      isOpen={true}
      commands={commands}
      onSubmit={onSubmit}
      hideCommander={() => {
        console.log('hiding');
      }}
      getItems={getItems}
      field={{ command: commands[0], parameters: {} }}
    />
  ))
  .add('command selected and a parameter already filled out', () => (
    <Commander
      isOpen={true}
      commands={commands}
      onSubmit={onSubmit}
      hideCommander={() => {
        console.log('hiding');
      }}
      getItems={getItems}
      field={{ command: commands[0], parameters: { name: 'asf' } }}
    />
  ))
  // awesome this just worked without me doing anything haha yus 🤙
  .add('command selected and a not-first parameter already filled out', () => (
    <Commander
      isOpen={true}
      commands={commands}
      onSubmit={onSubmit}
      hideCommander={() => {
        console.log('hiding');
      }}
      getItems={getItems}
      field={{ command: commands[0], parameters: { thread_id: 0 } }}
    />
  ))
  // this shold just go straight to the fully loaded state
  .add('command selected and all parameters already filled out', () => (
    <Commander
      isOpen={true}
      commands={commands}
      onSubmit={onSubmit}
      hideCommander={() => {
        console.log('hiding');
      }}
      getItems={getItems}
      field={{
        command: commands[0],
        parameters: { name: 'asdf', thread_id: 0, category_id: 1 },
      }}
    />
  ));
