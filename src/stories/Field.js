import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Field from '../components/Field';
import commands, { getItems } from '../fixtures/commands';

storiesOf('Field', module).add('default', () => (
  <Field availableCommands={commands} field={undefined} getItems={getItems} />
));
