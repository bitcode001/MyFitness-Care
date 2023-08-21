import {MThemeColors} from '@/constant/colors';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

interface StepNavigatorInterface {
  step: number;
  navigateNext?: () => void;
  navigateBack?: () => void;
}

export default function StepNavigator({
  step,
  navigateNext,
  navigateBack,
}: StepNavigatorInterface): JSX.Element {
  return (
    <View className="flex flex-row justify-between gap-4 my-10">
      {step > 0 && (
        <Button
          className="mt-5 rounded-none flex-1"
          mode="outlined"
          onPress={navigateBack}>
          Back
        </Button>
      )}
      {step < 3 && (
        <Button
          className="mt-5 rounded-none flex-1"
          style={{
            backgroundColor: MThemeColors.black,
          }}
          mode="contained"
          onPress={navigateNext}>
          Next
        </Button>
      )}
    </View>
  );
}
