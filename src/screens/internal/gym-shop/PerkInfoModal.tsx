import {MThemeColors} from '@/constant/colors';
import {MSpacing} from '@/constant/measurements';
import * as React from 'react';
import {View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type PerkInfoModalType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const PerkInfoModal = ({visible, setVisible}: PerkInfoModalType) => {
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
        <View className="flex fex-col items-center">
          <MaterialIcon
            name="information"
            size={34}
            color={MThemeColors.darkGreen}
          />
          <Text className="text-base font-bold text-center text-emerald-700 mt-2">
            Perks and Discounts Information
          </Text>
          <Text className="text-center my-2">
            This is our elligibility breakdown
          </Text>

          <View className="flex flex-row w-full justify-between mt-2">
            <Text className="font-bold text-base">Experience points</Text>
            <Text className="font-bold text-base">Discount</Text>
          </View>
          {Array.from({length: 10}, (_, idx) => idx).map(el => (
            <View
              className="flex flex-row justify-between py-1 w-full"
              key={el}>
              <Text className="font-medium">
                {el * 500} - {(el + 1) * 500}
              </Text>
              <Text className="font-medium">{(el + 1) * 5} %</Text>
            </View>
          ))}
          <View className="flex flex-row justify-between py-1 w-full">
            <Text className="font-medium">{'> 5000'}</Text>
            <Text className="font-bold">50 % + Redeemed Fit Coins</Text>
          </View>
          <View className="flex flex-col justify-between mt-6">
            <Text className="font-medium">
              For every fit coins you earned it will be redeemed to equivalent
              currency and will be deducted from the gross price
            </Text>
            <Text className="font-bold mt-4">
              Note: Deducting from fitcoin is only ellligible once you cross 50%
              discount rate i.e 5000exp
            </Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default PerkInfoModal;
