import React from 'react';
import { storiesOf } from '@storybook/react';

import Commander from '../';
import commands, { getItems } from '../fixtures/commands';

storiesOf('Commander', module).add('default', () => (
  <Commander
    isOpen={true}
    commands={commands}
    onSubmit={command => {
      console.log('submitted', command);
    }}
    hideCommander={() => {
      console.log('hiding');
    }}
    getItems={getItems}
  />
));
