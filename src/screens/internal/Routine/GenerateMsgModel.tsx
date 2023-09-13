import * as React from 'react';
import {Modal, Portal, Text} from 'react-native-paper';

const GenerateMsgModel = ({
  visible,
  setVisible,
  msg,
  cb,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  msg: String;
  cb: () => void;
}) => {
  const hideModal = () => {
    setVisible(prev => !prev);
    cb();
  };
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <React.Fragment>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>{msg}</Text>
        </Modal>
      </Portal>
    </React.Fragment>
  );
};

export default GenerateMsgModel;
