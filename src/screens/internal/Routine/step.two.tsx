import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {DaysInterface} from './routine.setup.screen';
import {MThemeColors} from '@/constant/colors';

const RegenExercises = ({days}: {days: DaysInterface[]}) => {
  const memoizedFilteredList = useMemo(() => {
    return days.filter(d => d.stat === 1);
  }, [days]);
  return (
    <React.Fragment>
      {memoizedFilteredList.length > 0 ? (
        memoizedFilteredList.map(d => (
          <TouchableOpacity
            key={d.id}
            style={{backgroundColor: MThemeColors.gray}}
            className="p-4 my-5">
            <Text className="text-lg font-semibold capitalize">{d.day}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex flex-col justify-center items-start pt-6">
          <Text className="text-lg font-semibold capitalize">
            No workout days selected
          </Text>
          <Text className="text-base font-normal capitalize">
            Select atleast one day from step 1
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};
export interface StepTwoInterface {
  days: DaysInterface[];
}

export default function StepTwo({days}: StepTwoInterface): JSX.Element {
  return (
    <React.Fragment>
      <View className="flex flex-row items-start relative">
        <View className="absolute left-4 top-0 h-full w-0.5 bg-slate-300" />
        <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Text className="text-base font-medium leading-5 text-center">2</Text>
        </View>

        <View className="flex flex-col flex-1 pl-4 pt-1 pb-12">
          <Text className="text-lg font-bold leading-5">Step 2</Text>
          <Text className="text-base font-medium">
            Lets setup your exercise routine
          </Text>

          <RegenExercises days={days} />
        </View>
      </View>
    </React.Fragment>
  );
}
