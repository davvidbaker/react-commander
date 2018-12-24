import { Machine, actions } from 'xstate';
import { commandHasParameters, commandFullyLoaded } from '../utilities';

const { assign } = actions;

const commitParameter = assign((ctx, event) => ({
  parameters: {
    ...ctx.parameters,
    [event.parameter.key]: event.parameter.value,
  },
}));

const setCommand = assign((ctx, event) => ({ command: event.command }));

const submitCommand = () => {};

const fieldMachine = Machine(
  {
    id: 'field',
    initial: 'command',
    context: {
      command: null,
      parameters: {},
    },
    states: {
      command: {
        on: {
          COMMAND_SELECT: [
            {
              target: 'parameters',
              cond: (ctx, event) => commandHasParameters(event.command),
              actions: 'setCommand',
            },
            {
              target: 'fully_loaded',
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
        on: {
          '': [
            {
              target: 'fully_loaded',
              cond: (ctx, event) =>
                commandFullyLoaded(ctx.command, ctx.parameters),
            },
            { target: 'parameters' },
          ],
        },
      },
      fully_loaded: {
        onEntry: 'submitCommand',
      },
    },
  },
  {
    actions: {
      commitParameter,
      setCommand,
      submitCommand,
    },
  },
);

export default fieldMachine;
