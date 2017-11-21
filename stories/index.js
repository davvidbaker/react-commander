import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Commander from '../src';
import COMMANDS from './commands';

function getItems() {
  return [1, 2, 3];
}

storiesOf('Commander', module).add('default', () => (
  <Commander
    isOpen={true}
    commands={COMMANDS}
    onSubmit={command => {
      console.log('submitted', command);
    }}
    hideCommander={() => {
      console.log('hiding');
    }}
    getItems={getItems}
  />
));
