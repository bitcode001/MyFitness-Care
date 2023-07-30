import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {DaysInterface} from './routine.setup.screen';
import StepNavigator from './step.navigator';
import DropDown from 'react-native-paper-dropdown';
import {MThemeColors} from '@/constant/colors';

import Toast from 'react-native-toast-message';

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
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  resetExercisePattern: () => void;
}

const restDaysOption = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
];
const findNumLabel = (num: string): number => {
  if (num === '') {
    return 1;
  }
  const found = restDaysOption.find(d => d.label === String(num));
  if (found) {
    return found.value;
  }
  return 1;
};

export default function StepOne({
  days,
  setDays,
  step,
  setStep,
  resetExercisePattern,
}: StepOneInterface): JSX.Element {
  const [restDay, setRestDay] = React.useState<string>('');
  const [restDayDropdownVis, setRestDayDropdownVis] =
    React.useState<boolean>(false);

  const updateRestDayValue = (value: string) => {
    setRestDay(value);
    resetExercisePattern();
  };

  const handleNextStep = () => {
    // PRE CONDITION CHECK
    if (restDay === '') {
      Toast.show({
        type: 'warning',
        text1: 'Warning',
        text2:
          'Please select rest day and corresponding exercise pattern first',
      });
      return;
    } else {
      const restDayNum = findNumLabel(restDay);
      const grindDays = days.filter(d => d.stat === 1);
      const restDays = days.filter(d => d.stat === 0);
      if (grindDays.length < 7 - restDayNum) {
        Toast.show({
          type: 'warning',
          text1: 'Warning',
          text2: `Please select atleast ${
            7 - restDayNum
          } days for exercise pattern`,
        });
        return;
      } else if (restDays.length < restDayNum) {
        Toast.show({
          type: 'warning',
          text1: 'Warning',
          text2: `Please select atleast ${restDayNum} days for rest`,
        });
        return;
      } else {
        setStep(2);
      }
    }
  };

  return (
    <React.Fragment>
      <View className="flex flex-row items-start relative">
        <View className="absolute left-4 top-0 h-full w-0.5 bg-slate-300" />
        <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Text className="text-base font-medium leading-5 text-center">1</Text>
        </View>
        <View className="flex flex-col flex-1 pl-4 pt-1 pb-8">
          <Text className="text-lg font-bold leading-5">Step 1</Text>
          <Text className="text-base font-medium">
            Lets discuss your exercise pattern
          </Text>
          {step === 1 && (
            <React.Fragment>
              <Text className="text-base font-normal mt-6 mb-2">
                How many days a week you want rest ?
              </Text>
              <DropDown
                label={'Select your rest day'}
                mode={'outlined'}
                value={restDay}
                list={restDaysOption}
                visible={restDayDropdownVis}
                showDropDown={() => setRestDayDropdownVis(true)}
                onDismiss={() => setRestDayDropdownVis(false)}
                setValue={updateRestDayValue}
                inputProps={{
                  style: {
                    backgroundColor: MThemeColors.white,
                  },
                }}
              />
              <Text className="text-sm font-normal mt-2 text-gray-500">
                Choose number between 1-6
              </Text>

              <View className="mt-3">
                <Text className="text-base font-normal mt-6 mb-2">
                  Select your exercise pattern
                </Text>

                <RenderDaysSelection days={days} updateDays={setDays} />
              </View>

              <StepNavigator step={step} navigateNext={handleNextStep} />
            </React.Fragment>
          )}
        </View>
      </View>
    </React.Fragment>
  );
}
