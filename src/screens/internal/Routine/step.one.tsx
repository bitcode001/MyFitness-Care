import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Checkbox} from 'react-native-paper';
import {DaysInterface} from './routine.setup.screen';

interface RenderDaysSelectionInterface {
  days: DaysInterface[];
  updateDays: React.Dispatch<React.SetStateAction<DaysInterface[]>>;
}
const RenderDaysSelection = ({
  days,
  updateDays,
}: RenderDaysSelectionInterface) => {
  const handleCheckboxPress = (id: number, type: number) => {
    // console.log('Type', type);
    // console.log('Index', id);
    updateDays(dd => {
      const temp = [...dd];
      const sItem = temp.find(dy => dy.id === id);
      if (sItem) {
        sItem.stat = sItem.stat === type ? null : type;
      }
      return temp;
    });
  };
  return (
    <React.Fragment>
      {days.map(d => (
        <View
          key={d.id}
          className="flex flex-row justify-between items-center my-1.5">
          <Text className="text-sm font-normal capitalize">{d.day}</Text>
          <View className="flex flex-row gap-6 bg-pink">
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => handleCheckboxPress(d.id, 0)}>
              <React.Fragment>
                <Text>Rest</Text>
                <Checkbox.Android
                  status={d.stat === 0 ? 'checked' : 'unchecked'}
                />
              </React.Fragment>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => handleCheckboxPress(d.id, 1)}>
              <React.Fragment>
                <Text>Grind</Text>
                <Checkbox.Android
                  status={d.stat === 1 ? 'checked' : 'unchecked'}
                />
              </React.Fragment>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

interface StepOneInterface {
  days: DaysInterface[];
  setDays: React.Dispatch<React.SetStateAction<DaysInterface[]>>;
}

export default function StepOne({
  days,
  setDays,
}: StepOneInterface): JSX.Element {
  return (
    <React.Fragment>
      <View className="flex flex-row items-start relative">
        <View className="absolute left-4 top-0 h-full w-0.5 bg-slate-300" />
        <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Text className="text-base font-medium leading-5 text-center">1</Text>
        </View>
        <View className="flex flex-col flex-1 pl-4 pt-1 pb-12">
          <Text className="text-lg font-bold leading-5">Step 1</Text>
          <Text className="text-base font-medium">
            Lets discuss your exercise pattern
          </Text>

          <Text className="text-base font-normal mt-6">
            How many days a week you want rest ?
          </Text>
          <TextInput mode="outlined" keyboardType="numeric" />

          <View className="mt-6">
            <Text className="text-base font-normal mt-6 mb-2">
              Select your exercise pattern
            </Text>

            <RenderDaysSelection days={days} updateDays={setDays} />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}
