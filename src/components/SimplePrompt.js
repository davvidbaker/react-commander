import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimplePrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  maybeSubmit = event => {
    if (event.key === 'Enter') {
      this.setState({ value: '' });
      this.props.onSubmit(event.target.value);
    }
  };

  render() {
    return (
      <input
        autoFocus
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.maybeSubmit}
        placeholder={this.props.placeholder}
      />
    );
  }
}

SimplePrompt.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
};

SimplePrompt.defaultProps = {
  initialValue: '',
};

export default SimplePrompt;
