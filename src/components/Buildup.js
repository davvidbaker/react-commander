import React, { Component } from 'react';
import styled from 'styled-components';

const UL = styled.ul`
  list-style: none;
  padding: 5px;
  margin: 0;
  font-size: 0.75em;
`;

const COMMAND = styled.li``;

const PARAMETER = styled.li`
  margin-left: 5px;
`;

class Buildup extends Component {
  render() {
    return (
      <UL>
        {this.props.enteredCommands.map(
          ({ phase, copy }) =>
            phase === 'command' ? (
              <COMMAND key={copy}>{copy}</COMMAND>
            ) : (
              <PARAMETER key={copy}>{copy}</PARAMETER>
            )
        )}
      </UL>
    );
  }
}

export default Buildup;
