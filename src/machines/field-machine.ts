// @ts-nocheck
import { assign, createMachine } from 'xstate';
import * as utilities from '../utilities';

const commitParameter = assign({
  parameters: ({ event, context }) => ({
    ...context.parameters,
    [event.parameter.key]: event.parameter.value,
  })
})

const commandFullyLoaded = ({ context }) => context.command && utilities.commandFullyLoaded(context.command, context.parameters);

const commandHasParameters = ({ event }) => utilities.commandHasParameters(event.command);

const commandNotNull = ({ context }) => context.command !== null;

const setCommand = assign({ command: ({ event }) => event.command });

const submitCommand = () => { };

const fieldMachine = createMachine(
  {
    id: 'field',
    initial: 'initial',
    context: ({ input }) => input,
    states: {
      initial: {
        always: [
          {
            target: 'fully_loaded',
            guard: 'commandFullyLoaded',
          },
          {
            target: 'parameters',
            guard: 'commandNotNull',
          },
          {
            target: 'command',
          },
        ],
      },
      command: {
        on: {
          COMMAND_SELECT: [
            {
              target: 'parameters',
              guard: 'commandHasParameters',
              actions: 'setCommand',
            },
            {
              target: 'fully_loaded',
              actions: 'setCommand',
            },
          ],
        },
      },
      parameters: {
        on: {
          PARAMETER_COMMIT: [
            {
              target: 'parameter_committed',
              actions: 'commitParameter',
            },
          ],
        },
      },
      parameter_committed: {
        always: [
          {
            target: 'fully_loaded',
            guard: 'commandFullyLoaded',
          },
          { target: 'parameters' },
        ],
      },
      fully_loaded: {
        entry: 'submitCommand',
      },
    },
  },
  {
    actions: {
      commitParameter,
      setCommand,
      submitCommand,
    },
    guards: { commandFullyLoaded, commandHasParameters, commandNotNull },
  },
);

export default fieldMachine;
