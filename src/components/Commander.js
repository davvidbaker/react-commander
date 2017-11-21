import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// 🔮 might not want to rely on a modal
import Modal from 'react-modal';
import regeneratorRuntime from 'regenerator-runtime';

import SimplePrompt from './SimplePrompt';
import FuzzyAutocomplete from './FuzzyAutocomplete';
import Div from './StyledDiv';

class Commander extends Component {
  state = {
    phase: 'command',
    parameter: {},
    parameterItems: {},
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
    this.runner.next(val);
  };

  *parameterRunner(commandItem) {
    console.log('i am in the runner', commandItem);
    /** 💁 loaded as in loaded up, bogged down, made heavy */
    let loadedItem = { ...commandItem };
    for (let i = 0; i < commandItem.parameters.length; i++) {
      console.log('loadedItem top of loop', loadedItem);

      // mehhhhh
      const parameterItems = commandItem.parameters[i].selector
        ? this.props.getItems(commandItem.parameters[i].selector)
        : null;
      this.setState({ parameter: commandItem.parameters[i], parameterItems });

      loadedItem = {
        ...loadedItem,
        [commandItem.parameters[i].key]: yield commandItem.parameters[i],
      };
      console.log('loadedItem', loadedItem);
    }

    this.reset();
    this.props.onSubmit(loadedItem);
  }

  enterCommand(commandItem) {
    if (commandItem.parameters) {
      this.setState({ phase: 'parameters' });

      console.log('here I am before the stuff');
      this.runner = this.parameterRunner(commandItem);
      this.runner.next();
    } else {
      this.reset();
      this.props.onSubmit(commandItem);
    }
  }

  reset = () => {
    this.props.hideCommander();
    this.setState({ phase: 'command', parameter: {} });
  };

  render() {
    return (
      <Modal
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
