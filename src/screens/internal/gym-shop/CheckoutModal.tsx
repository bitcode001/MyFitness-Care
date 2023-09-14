import {MThemeColors} from '@/constant/colors';
import {MSpacing} from '@/constant/measurements';
import * as React from 'react';
import {View} from 'react-native';
// import {View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type CheckoutInfoModalType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const CheckoutInfoModal = ({visible, setVisible}: CheckoutInfoModalType) => {
  //   const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={{
          marginHorizontal: MSpacing.screenPadding / 2,
        }}>
        <View className="flex flex-col items-center py-2">
          <MaterialIcon
            name="cash-multiple"
            size={42}
            color={MThemeColors.darkGreen}
          />
          <Text className="text-base font-bold text-center text-emerald-700 mt-4">
            Thank you for purchasing with MyFiness App
          </Text>
          <Text className="text-center my-2">
            This is the experimental shop. In future, this shop will hold the
            actual data from the Gym who wish to implement this system.
          </Text>

          <Button mode="contained" className="mt-4" onPress={hideModal}>
            <Text className="text-white">Great !</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CheckoutInfoModal;
