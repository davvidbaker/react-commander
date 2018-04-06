import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// 🔮 might not want to rely on a modal
import Modal from 'react-modal';
import regeneratorRuntime from 'regenerator-runtime';

import SimplePrompt from './SimplePrompt';
import FuzzyAutocomplete from './FuzzyAutocomplete';
import Div from './StyledDiv';
import Buildup from './Buildup';

class Commander extends Component {
  state = {
    phase: 'command',
    parameter: {},
    parameterItems: {},
    enteredCommands: [],
  };

  constructor(props) {
    super(props);

    this.enterCommand = this.enterCommand.bind(this);
  }

  selectParameterItem = item => {
    this.enterParameter(
      this.state.parameter.itemReturnKey
        ? item[this.state.parameter.itemReturnKey]
        : item
    );
  };

  enterParameter = val => {
    this.setState({
      enteredCommands: [
        ...this.state.enteredCommands,
        {
          phase: this.state.phase,
          copy: `${
            this.state.parameter.placeholder
              ? this.state.parameter.placeholder
              : this.state.parameter.key
          }: ${val}`,
        },
      ],
    });
    this.runner.next(val);
  };

  *parameterRunner(commandItem) {
    /** 💁 loaded as in loaded up, bogged down, made heavy */
    let loadedItem = { ...commandItem };
    for (let i = 0; i < commandItem.parameters.length; i++) {
      // mehhhhh
      const parameterItems = commandItem.parameters[i].selector
        ? this.props.getItems(commandItem.parameters[i].selector)
        : null;
      this.setState({ parameter: commandItem.parameters[i], parameterItems });

      loadedItem = {
        ...loadedItem,
        [commandItem.parameters[i].key]: yield commandItem.parameters[i],
      };
    }

    this.reset();
    this.props.onSubmit(loadedItem);
  }

  enterCommand(commandItem) {
    if (commandItem.parameters) {
      this.setState({ phase: 'parameters' });

      this.setState({
        enteredCommands: [
          ...this.state.enteredCommands,
          { phase: this.state.phase, copy: commandItem.copy },
        ],
      });

      this.runner = this.parameterRunner(commandItem);
      this.runner.next();
    } else {
      this.reset();
      this.props.onSubmit(commandItem);
    }
  }

  reset = () => {
    this.props.hideCommander();
    this.setState({ phase: 'command', parameter: {}, enteredCommands: [] });
  };

  render() {
    return (
      <Modal
        appElement={this.props.appElement}
        style={{
          overlay: { zIndex: 20 },
          content: {
            padding: 0,
            border: 'none',
            borderRadius: 0,
            background: 'none',
            overflow: 'unset',
            right: 'unset',
            bottom: 'unset',
            position: 'unset',
          },
        }}
        isOpen={this.props.isOpen}
        onRequestClose={this.reset}
        onAfterOpen={this.onAfterOpen}
      >
        <Div>
          {this.props.withBuildup &&
            this.state.enteredCommands.length > 0 && (
              <Buildup enteredCommands={this.state.enteredCommands} />
            )}
          {this.state.phase === 'command' ? (
            <FuzzyAutocomplete
              itemStringKey="copy"
              onChange={this.enterCommand}
              placeholder={this.props.placeholder}
              items={this.props.commands}
            />
          ) : this.state.parameter.selector ? (
            <FuzzyAutocomplete
              itemStringKey={this.state.parameter.itemStringKey}
              items={this.state.parameterItems}
              onChange={this.selectParameterItem}
              placeholder={
                this.state.parameter.placeholder
                  ? this.state.parameter.placeholder
                  : this.state.parameter.key
              }
            />
          ) : (
            <SimplePrompt
              placeholder={
                this.state.parameter.placeholder
                  ? this.state.parameter.placeholder
                  : this.state.parameter.key
              }
              initialValue={''}
              onSubmit={this.enterParameter}
            />
          )}
        </Div>
      </Modal>
    );
  }
}

Commander.propTypes = {
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      copy: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Commander.defaultProps = {
  commands: null,
  placeholder: 'Type ? to see available commands',
};

export default Commander;

// export default connect(null, dispatch => ({
//   dispatchAction: type => dispatch({ type }),
// }))(Commander);
