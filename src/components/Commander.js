import * as React from 'react';
import styled from 'styled-components';
// 🔮 might not want to rely on a modal
import Modal from 'react-modal';

import Wrapper from './Wrapper';
import Field from './Field';

function Commander({
  commands,
  onSubmit,
  onCatch,
  placeholder,
  hideCommander,
  appElement,
  isOpen,
  getItems,
}) {
  return (
    <Modal
      appElement={appElement}
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
      isOpen={isOpen}
      onRequestClose={hideCommander}
    >
      <Wrapper>
        <Field
          availableCommands={commands}
          field={undefined}
          getItems={getItems}
          onFullyLoaded={onSubmit}
        />
      </Wrapper>
    </Modal>
  );
}

export default Commander;
