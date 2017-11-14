import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// 🔮 might not want to rely on a modal
import Modal from 'react-modal';
import regeneratorRuntime from 'regenerator-runtime';

import SimplePrompt from './SimplePrompt';
import FuzzyAutocomplete from './FuzzyAutocomplete';

class CommandPalette extends Component {
  state = {
    phase: 'command',
    parameter: {},
  };

  constructor(props) {
    super(props);

    this.enterCommand = this.enterCommand.bind(this);
  }

  enterParameter = item => {
    this.runner.next(item);
  };

  *parameterRunner(commandItem) {
    console.log('i am in the runner', commandItem);
    /** 💁 loaded as in loaded up, bogged down, made heavy */
    let loadedItem = { ...commandItem };
    for (let i = 0; i < commandItem.parameters.length; i++) {
      console.log('loadedItem top of loop', loadedItem);
      // mehhhhh
      this.setState({ parameter: commandItem.parameters[i] }, () => {
        console.log('this.state', this.state);
      });

      loadedItem = {
        ...loadedItem,
        [commandItem.parameters[i].key]: yield commandItem.parameters[i],
      };
      console.log('loadedItem', loadedItem);
    }

    this.props.onSubmit(loadedItem);
  }

  enterCommand(commandItem) {
    if (commandItem.parameters) {
      this.setState({ phase: 'parameters' });

      console.log('here I am before the stuff');
      this.runner = this.parameterRunner(commandItem);
      this.runner.next();
    } else {
      this.props.onSubmit(commandItem);
    }
  }

  onAfterOpen = () => {
    // if (this.props.isOnlyPrompt) {
    // } else {
    //   this.downshiftInput.focus();
    // }
  };

  reset = () => {
    this.props.hideCommandPalette();
    this.setState({ phase: 'command', parameter: {} });
  };

  render() {
    return (
      <Modal
        style={{ overlay: { zIndex: 20 } }}
        isOpen={this.props.isOpen}
        onRequestClose={this.reset}
        onAfterOpen={this.onAfterOpen}
      >
        {this.state.phase === 'command' ? (
          <FuzzyAutocomplete
            itemStringKey="copy"
            onChange={this.enterCommand}
            placeholder={this.props.placeholder}
            items={this.props.commands}
          />
        ) : this.state.parameter.isOnlyPrompt ? (
          <SimplePrompt
            placeholder={
              this.state.parameter.placeholder
                ? this.state.parameter.placeholder
                : this.state.parameter.key
            }
            initialValue={''}
            onSubmit={this.enterParameter}
          />
        ) : (
          <FuzzyAutocomplete />
        )}
      </Modal>
    );
  }
}

CommandPalette.propTypes = {
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      copy: PropTypes.string,
    })
  ),
  isOnlyPrompt: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CommandPalette.defaultProps = {
  commands: null,
  isOnlyPrompt: false,
  placeholder: 'Type ? to see available commands',
};

export default CommandPalette;

// export default connect(null, dispatch => ({
//   dispatchAction: type => dispatch({ type }),
// }))(CommandPalette);
