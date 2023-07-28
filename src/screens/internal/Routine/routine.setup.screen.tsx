import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import UserIntro from '@/components/UserIntro';
// import {MThemeColors} from '@/constant/colors';
import React from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import StepOne from './step.one';
import StepTwo from './step.two';
import StepThree from './step.three';
import {MThemeColors} from '@/constant/colors';

export interface DaysInterface {
  id: number;
  day: string;
  stat: number | null;
}

export default function RoutineSetupScreen(): JSX.Element {
  const [days, setDays] = React.useState<DaysInterface[]>([
    {id: 1, day: 'sunday', stat: null},
    {id: 2, day: 'monday', stat: null},
    {id: 3, day: 'tuesday', stat: null},
    {id: 4, day: 'wednesday', stat: null},
    {id: 5, day: 'thursday', stat: null},
    {id: 6, day: 'friday', stat: null},
    {id: 7, day: 'saturday', stat: null},
  ]);

  return (
    <SafeAreaScrollView>
      <UserIntro profileLabel="Lets get started !" />

      <View className="flex flex-row justify-between items-center mt-10">
        <Image
          className="w-12 h-12"
          source={require('@/assets/icons/on-fire.png')}
        />
        <Text className="text-lg font-medium leading-5 px-6">
          Here we will design your workout routine!
        </Text>
      </View>

      {/* Stepper Section */}
      <View className="flex flex-col justify-between items-start mt-10">
        {/* <View className="absolute left-6 top-0 h-full w-0.5 bg-slate-300" /> */}
        {/* Step one of the stepper */}
        <StepOne days={days} setDays={setDays} />

        {/* Step two of the stepper */}
        <StepTwo days={days} />

        {/* Step three of the stepper */}
        <StepThree />
      </View>

      <Button
        mode="contained"
        style={{backgroundColor: MThemeColors.darkGreen}}
        className="rounded-none my-10 mt-16 ml-12">
        <Text className="text-white text-lg font-medium">Finish Setup</Text>
      </Button>
    </SafeAreaScrollView>
  );
}
