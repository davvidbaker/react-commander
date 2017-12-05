import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Commander from '../src';
import COMMANDS from './commands';

const PROPS = {
  threads: [
    { rank: 0, name: 'Main', id: 0 },
    { rank: 3, name: 'Curiosity', id: 1 },
    { rank: 4, name: 'react-commander', id: 2 },
    { rank: 1, name: 'Puppy Club 🐶', id: 3 },
    { rank: 2, name: 'Blog', id: 21 },
    { rank: 6, name: 'davidbaker.is/', id: 4 },
    { rank: 6, name: 'whoa', id: 30 },
  ],
  user: {
    categories: [{ name: 'one', id: 1 }, { name: 'two', id: 2 }],
  },
};

function getItems(selector) {
  return selector(PROPS);
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
