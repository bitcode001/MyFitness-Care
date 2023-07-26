import React from 'react';
import {Image, ScrollView, View, Text} from 'react-native';

import {MThemeColors} from '@/constant/colors';
import UserIntro from '@/components/UserIntro';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';

const CustomLabel = ({label, color}: {label: string; color: string}) => {
  const lineStyle = {
    backgroundColor: color,
    width: 3,
  };
  return (
    <View className="flex flex-row items-center">
      <View className="h-full" style={lineStyle} />
      <Text className="text-white font-semibold text-xs ml-2">{label}</Text>
    </View>
  );
};

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaScrollView>
      <UserIntro profileLabel="Todays Exercise" />

      {/* Exercise Info Section */}
      <View
        className="flex flex-row justify-center mt-6"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{columnGap: 25}}>
        <View className="flex-1 flex-col flex-grow justify-center items-center p-3 py-4 bg-white rounded-xl">
          <Image
            className="w-20 h-20 rounded-full mb-3"
            source={require('@/assets/icons/running.png')}
          />
          <Text className="text-sm">Lets do this again!</Text>
          <Text className="font-bold">1300 exp to claim</Text>
        </View>

        <View
          className="flex-1 flex-col justify-between px-4 py-4 rounded-xl"
          style={{backgroundColor: MThemeColors.black}}>
          <CustomLabel
            label={'Muscle Group: Chest'}
            color={MThemeColors.lightRed}
          />
          <CustomLabel label={'Exercise: 10'} color={MThemeColors.lightGreen} />
          <CustomLabel
            label={'Type: Drop Set'}
            color={MThemeColors.lightPurple}
          />
          <CustomLabel label={'Sets: 5'} color={MThemeColors.lightPink} />
          <CustomLabel label={'Reps: 10'} color={MThemeColors.baseOrange} />
        </View>
      </View>

      {/* Recent Achievement Section */}
      <Text className="text-2xl font-normal mt-10 mb-5">
        Recent Achievements
      </Text>
      <ScrollView horizontal>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            className="flex flex-col justify-center items-center p-3 py-4 w-36 bg-white rounded-xl mr-4">
            <Image
              className="w-16 h-16 mb-3"
              source={require('@/assets/icons/success.png')}
            />
            <Text className="text-base leading-5 font-semibold">
              New Born Challenger!
            </Text>
            <Image
              className="w-8 h-8 rounded-full mt-2 self-end"
              source={require('@/assets/icons/star.png')}
            />
          </View>
        ))}
      </ScrollView>

      {/* Daily Tips Section */}
      {/* <Text className="text-2xl font-normal mt-10 mb-5">Daily Tips</Text> */}
      <View className="flex flex-col justify-center items-start p-6 bg-white rounded-xl mt-10">
        <View className="flex flex-row justify-start items-end">
          <Image
            className="w-8 h-8 mr-3"
            source={require('@/assets/icons/lightbulb.png')}
          />
          <Text className="text-base font-medium justify-end">
            Tip of the day!
          </Text>
        </View>
        <Text className="text-sm leading-5 text-justify font-normal text-gray-600 mt-4 pb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
          nisi sed dolor rutrum sodales. Donec euismod, nisl eget.
        </Text>
      </View>
    </SafeAreaScrollView>
  );
}
