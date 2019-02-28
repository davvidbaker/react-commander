import * as React from 'react';

import fieldMachine from '../machines/field';
import useMachine from '../machines/use-machine';
import FuzzyAutocomplete from './FuzzyAutocomplete';
import SimplePrompt from './SimplePrompt';
import * as Utilities from '../utilities';

const CommandSelect = ({ command, availableCommands, onChange, editing }) => {
  return editing ? (
    <FuzzyAutocomplete
      items={availableCommands}
      onChange={onChange}
      itemStringKey="copy"
    />
  ) : (
    <span
      css={`
        padding: 5px;
        font-size: 0.75em;
        font-weight: bold;
      `}
    >
      {command && command.copy}
    </span>
  );
};

const ParameterEntry = ({
  parameter,
  onSubmit,
  getItems,
  initialInputValue = '',
  onBlur = () => {},
}) =>
  parameter ? (
    parameter.selector ? (
      <FuzzyAutocomplete
        items={getItems(parameter.selector)}
        itemStringKey={parameter.itemStringKey}
        onChange={item =>
          onSubmit({ key: parameter.key, value: item[parameter.itemReturnKey] })
        }
        placeholder={parameter.placeholder}
        initialInputValue={initialInputValue}
        onBlur={onBlur}
      />
    ) : (
      <SimplePrompt
        onSubmit={value => onSubmit({ key: parameter.key, value })}
        onBlur={onBlur}
        placeholder={parameter.placeholder}
        type="text"
        initialInputValue={initialInputValue}
      />
    )
  ) : null;

const CommittedParameters = ({
  parameters,
  command,
  getItems,
  commitParameter,
}) => {
  const [editingParameter, setEditingParameter] = React.useState(null);

  return (
    <ul
      css={`
        list-style: none;
        font-size: 0.75em;
        padding: 5px 10px;
        margin: 0;

        /* ignores the top one*/
        li + li {
          margin-top: 3px;
        }
      `}
    >
      {Object.entries(parameters).map(([key, value]) => {
        const parameter = Utilities.parameterGivenKey(command, key);

        return (
          <li
            css={`
              position: relative;
            `}
            key={key}
            onClick={() => setEditingParameter(parameter)}
          >
            <span>{parameter.placeholder}</span>:{' '}
            {editingParameter && editingParameter.key === key ? (
              <div
                css={`
                  display: inline-block;
                  position: absolute;
                  top: -5px;
                  transform: translatex(-2px);
                  z-index: 10000;

                  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
                    0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1);
                `}
              >
                <ParameterEntry
                  onSubmit={p => {
                    setEditingParameter(null);
                    commitParameter(p);
                  }}
                  getItems={getItems}
                  parameter={parameter}
                  initialInputValue={Utilities.parameterDisplayValue(
                    value,
                    parameter,
                    getItems,
                  )}
                  onBlur={() => {
                    setEditingParameter(null);
                  }}
                />
              </div>
            ) : (
              <span
                css={`
                  &:hover {
                    background: #ccf1ff;
                  }
                `}
              >
                {Utilities.parameterDisplayValue(value, parameter, getItems)}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Parameters = ({ command, parameters, commitParameter, getItems }) => {
  return (
    <div>
      {Object.keys(parameters).length > 0 && (
        <CommittedParameters
          parameters={parameters}
          command={command}
          getItems={getItems}
          commitParameter={commitParameter}
        />
      )}
      {command && (
        <ParameterEntry
          onSubmit={commitParameter}
          getItems={getItems}
          parameter={Utilities.currentParameter(command, parameters)}
        />
      )}
    </div>
  );
};

function Field({
  availableCommands,
  getItems,
  field = {
    command: null,
    parameters: {},
  },
  onFullyLoaded,
}) {
  const [state, send] = useMachine(
    fieldMachine.withConfig(
      {
        actions: {
          submitCommand: (ctx, _event) =>
            onFullyLoaded({ action: ctx.command.action, ...ctx.parameters }),
        },
      },
      { ...field },
    ),
    {
      /* 💁  set to true to help debugging */
      log: true,
    },
  );

  // eslint-disable-next-line no-unused-vars
  const { command, parameters, _currentOptions } = state.context;

  return (
    <div>
      <CommandSelect
        command={command}
        availableCommands={availableCommands}
        onChange={command => send({ type: 'COMMAND_SELECT', command })}
        // is this coupling to the state machine state bad?
        editing={state.value === 'command'}
      />
      <Parameters
        parameters={parameters}
        command={command}
        getItems={getItems}
        commitParameter={parameter =>
          send({ type: 'PARAMETER_COMMIT', parameter })
        }
      />
    </div>
  );
}

export default Field;
