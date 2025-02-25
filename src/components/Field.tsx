import * as React from 'react';

import fieldMachine from '../machines/field-machine';
import FuzzyAutocomplete from './FuzzyAutocomplete';
import SimplePrompt from './SimplePrompt';
// @ts-ignore
import * as Utilities from '../utilities';
import { useActor } from '@xstate/react';
import styled from 'styled-components';
// import { createBrowserInspector } from '@statelyai/inspect';

// const { inspect } = createBrowserInspector(
//   { iframe: document.getElementById('storybook-preview-iframe') },
// );


export interface Parameter {
  key: string, placeholder: string,
  selector?: (props: unknown) => unknown[],
  itemStringKey?: string,
  itemReturnKey?: string,

}

export interface Command {
  action: string;
  copy: string,
  shortcut?: string
  parameters?: Parameter[]
}

interface CommandSelectProps {
  command: Command;
  availableCommands: Command[];
  onChange: (command: Command) => void;
  editing: boolean;
}

const Span = styled.span`
&: hover {
  background: #ccf1ff;
}
              `


const CommandSelect = ({ command, availableCommands, onChange, editing }: CommandSelectProps) => {
  return editing ? (
    // @ts-ignore
    <FuzzyAutocomplete
      items={availableCommands}
      onChange={onChange}
      itemStringKey="copy"
    />
  ) : (
    <span
      style={{
        padding: '5px',
        fontSize: '0.75em',
        fontWeight: 'bold',
      }}
    >
      {command && command.copy}
    </span >
  );
};

interface ParameterEntryProps {
  parameter: Parameter,
  onSubmit: (p: Parameter) => void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItems: (selector: string) => any[];
  initialInputValue?: string;
  onBlur?: () => void;
}

const ParameterEntry = ({
  parameter,
  onSubmit,
  getItems,
  initialInputValue = '',
  onBlur = () => { },
}: ParameterEntryProps) =>
  parameter ? (
    parameter.selector ? (
      <FuzzyAutocomplete
        // @ts-ignore
        items={getItems(parameter.selector)}
        itemStringKey={parameter.itemStringKey}
        // @ts-ignore
        onChange={item =>
          // @ts-ignore
          onSubmit({ key: parameter.key, value: item[parameter.itemReturnKey] })
        }
        placeholder={parameter.placeholder}
        initialInputValue={initialInputValue}
        // @ts-ignore
        onBlur={onBlur}
      />
    ) : (
      <SimplePrompt
        // @ts-ignore
        onSubmit={value => onSubmit({ key: parameter.key, value })}
        onBlur={onBlur}
        placeholder={parameter.placeholder}
        // @ts-ignore
        type="text"
        initialInputValue={initialInputValue}
      />
    )
  ) : null;

interface ParametersProps {
  parameters: Parameter[];
  command: Command;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItems: (selector: string) => any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commitParameter: (parameter: { key: string; value: any }) => void;
}

const UL = styled.ul`
list-style: none;
font-size: 0.75em;
padding: 5px 10px;
margin: 0;

/* ignores the top one*/
li + li {
  margin-top: 3px;
}`
const CommittedParameters = ({
  parameters,
  command,
  getItems,
  commitParameter,
}: ParametersProps) => {
  const [editingParameter, setEditingParameter] = React.useState<Parameter | null>(null);

  return (
    <UL>
      {Object.entries(parameters).map(([key, value]) => {
        const parameter = Utilities.parameterGivenKey(command, key);

        return (
          <li
            style={{
              position: 'relative',
            }}
            key={key}
            onClick={() => setEditingParameter(parameter)}
          >
            <span>{parameter.placeholder}</span>:{' '}
            {editingParameter && editingParameter.key === key ? (
              <div
                style={{
                  display: 'inline-block',
                  position: 'absolute',
                  top: '-5px',
                  transform: 'translatex(-2px)',
                  zIndex: 10000,

                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05) 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ParameterEntry
                  onSubmit={p => {
                    setEditingParameter(null);
                    // @ts-ignore
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
              <Span>
                {Utilities.parameterDisplayValue(value, parameter, getItems)}
              </Span>
            )
            }
          </li>
        );
      })}
    </UL>
  );
};

const Parameters = ({ command, parameters, commitParameter, getItems }: ParametersProps) => {
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
          // @ts-ignore
          onSubmit={commitParameter}
          getItems={getItems}
          parameter={Utilities.currentParameter(command, parameters)}
        />
      )}
    </div>
  );
};

export interface FieldProps {
  availableCommands: Command[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItems: (selector: string) => any[];
  field?: {
    command: Command | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: Record<string, any>;
  };
  onFullyLoaded: (field: {
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: Record<string, any>;
  }) => void;
}

function Field({
  availableCommands,
  getItems,
  field = {
    command: null,
    parameters: {},
  },
  onFullyLoaded,
}: FieldProps) {
  const [state, send] = useActor(
    fieldMachine.provide(
      {
        actions: {
          submitCommand: ({ context }) =>
            onFullyLoaded({ action: context.command.action, ...context.parameters }),
        },
      },
    ),
    {
      // inspect, 
      input: field
    }
  );

  const { command, parameters } = state.context;

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
