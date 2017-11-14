import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// 🔮 might not want to rely on a modal
import Modal from 'react-modal';
import fuzzaldrin from 'fuzzaldrin-plus';
import Downshift from 'downshift';

class CommandPalette extends Component {
  onChange = ({ action }) => {
    this.props.dispatchAction(action);
    this.props.hideCommandPalette();
  };

  render() {
    const placeholder = 'Type ? to see available commands';
    return (
      <Modal
        style={{ overlay: { zIndex: 20 } }}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.hideCommandPalette}
        onAfterOpen={() => this.input.focus()}
      >
        <Downshift
          isOpen={this.props.isOpen}
          onChange={this.onChange}
          defaultInputValue=""
          defaultHighlightedIndex={0}
          itemToString={i => (i ? i.copy : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => {
            return (
              <div>
                <label {...getLabelProps()} />
                <input
                  autoFocus
                  ref={input => {
                    this.input = input;
                  }}
                  {...getInputProps({
                    placeholder,
                  })}
                />
                {isOpen ? (
                  <div>
                    {fuzzaldrin
                      .filter(this.props.commands, inputValue, { key: 'copy' })
                      .map((item, index) => (
                        <div
                          {...getItemProps({
                            key: item.action,
                            index,
                            item: item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'lightgray'
                                  : 'white',
                              fontWeight:
                                selectedItem === item.copy ? 'bold' : 'normal',
                            },
                          })}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: fuzzaldrin.wrap(item.copy, inputValue),
                            }}
                          />
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            );
          }}
        </Downshift>
      </Modal>
    );
  }
}

CommandPalette.propTypes = {
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  dispatchAction: PropTypes.func.isRequired,
};

export default CommandPalette;

// export default connect(null, dispatch => ({
//   dispatchAction: type => dispatch({ type }),
// }))(CommandPalette);
