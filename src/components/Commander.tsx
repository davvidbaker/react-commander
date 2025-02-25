// 🔮 might not want to rely on a modal
import Modal from 'react-modal';

import Wrapper from './Wrapper';
import Field, { Command, FieldProps } from './Field';

interface Props {
  commands: Command[],
  onSubmit: FieldProps['onFullyLoaded'],
  hideCommander: () => void,
  appElement: HTMLElement,
  isOpen: boolean,
  getItems: FieldProps['getItems'],
  field?: FieldProps['field']
}

export const Commander = ({
  commands,
  onSubmit,
  hideCommander,
  appElement,
  isOpen,
  getItems,
  field = undefined,
}: Props) => {
  return <Modal
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
        field={field}
        getItems={getItems}
        onFullyLoaded={onSubmit}
      />
    </Wrapper>
  </Modal>
}