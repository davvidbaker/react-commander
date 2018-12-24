import { Machine, actions } from 'xstate';
import * as Utilities from '../utilities';

const { assign } = actions;

const commitParameter = assign((ctx, event) => ({
  parameters: {
    ...ctx.parameters,
    [event.parameter.key]: event.parameter.value,
  },
}));

const commandFullyLoaded = (ctx, event) =>
  ctx.command && Utilities.commandFullyLoaded(ctx.command, ctx.parameters);

const commandHasParameters = (ctx, event) =>
  Utilities.commandHasParameters(event.command);

const commandNotNull = ctx => ctx.command !== null;

const setCommand = assign((ctx, event) => ({ command: event.command }));

const submitCommand = () => {};

const fieldMachine = Machine(
  {
    id: 'field',
    initial: 'initial',
    context: {
      command: null,
      parameters: {},
    },
    states: {
      initial: {
        on: {
          '': [
            {
              target: 'fully_loaded',
              cond: 'commandFullyLoaded',
            },
            {
              target: 'parameters',
              cond: 'commandNotNull',
            },
            {
              target: 'command',
            },
          ],
        },
      },
      command: {
        on: {
          COMMAND_SELECT: [
            {
              target: 'parameters',
              cond: 'commandHasParameters',
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
        on: {
          '': [
            {
              target: 'fully_loaded',
              cond: 'commandFullyLoaded',
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
    guards: { commandFullyLoaded, commandHasParameters, commandNotNull },
  },
);

export default fieldMachine;
