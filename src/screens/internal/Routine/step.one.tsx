import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {DaysInterface} from './routine.setup.screen';
import StepNavigator from './step.navigator';
// import DropDown from 'react-native-paper-dropdown';
// import {MThemeColors} from '@/constant/colors';

import Toast from 'react-native-toast-message';

interface RenderDaysSelectionInterface {
  days: DaysInterface[];
  updateDays: React.Dispatch<React.SetStateAction<DaysInterface[]>>;
}
const RenderDaysSelection = ({
  days,
  updateDays,
}: RenderDaysSelectionInterface) => {
  const toggleExerciseDay = (id: number) => {
    updateDays(dd => {
      const temp = [...dd];
      const sItem = temp.find(dy => dy.id === id);
      if (sItem) {
        sItem.stat = sItem.stat === 0 ? 1 : 0;
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
            {/* <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => handleCheckboxPress(d.id, 0)}>
              <React.Fragment>
                <Text>Rest</Text>
                <Checkbox.Android
                  status={d.stat === 0 ? 'checked' : 'unchecked'}
                />
              </React.Fragment>
            </TouchableOpacity> */}

            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => toggleExerciseDay(d.id)}>
              <React.Fragment>
                <Checkbox.Android
                  status={d.stat === 1 ? 'checked' : 'unchecked'}
                />
                <Text>Exercise</Text>
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
  treeShakeExerciseRoutine: () => void;
}

// For Dropdown Exercise Day
// const exerciseDayOption = [
//   {label: '1', value: 1},
//   {label: '2', value: 2},
//   {label: '3', value: 3},
//   {label: '4', value: 4},
//   {label: '5', value: 5},
//   {label: '6', value: 6},
// ];
// const findNumLabel = (num: string): number => {
//   if (num === '') {
//     return 1;
//   }
//   const found = exerciseDayOption.find(d => d.label === String(num));
//   if (found) {
//     return found.value;
//   }
//   return 1;
// };

export default function StepOne({
  days,
  setDays,
  step,
  setStep,
  treeShakeExerciseRoutine,
}: StepOneInterface): JSX.Element {
  // const [exerciseDay, setExerciseDay] = React.useState<string>('');
  // const [exerciseDayDropdownVis, setExerciseDayDropdownVis] =
  //   React.useState<boolean>(false);

  // const updateRestDayValue = (value: string) => {
  //   setExerciseDay(value);
  // };

  const handleNextStep = () => {
    // PRE CONDITION CHECK
    // if (exerciseDay === '') {
    //   Toast.show({
    //     type: 'warning',
    //     text1: 'Warning',
    //     text2:
    //       'Please select exercise day and corresponding exercise pattern first',
    //   });
    //   return;
    // } else {
    //   const exerciseDayNum = findNumLabel(exerciseDay);
    //   const grindDays = days.filter(d => d.stat === 1);
    //   const restDays = days.filter(d => d.stat === 0);
    //   if (grindDays.length < exerciseDayNum) {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Missing exercise pattern',
    //       text2: `Please select atleast ${exerciseDayNum} days for exercise pattern`,
    //     });
    //     return;
    //   } else if (restDays.length < 7 - exerciseDayNum) {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Mising exercise days',
    //       text2: `Please select atleast ${7 - exerciseDayNum} days for rest`,
    //     });
    //     return;
    //   } else {
    //     // PERFORM TREE SHAKING
    //     treeShakeExerciseRoutine();
    //     setStep(2);
    //   }
    // }

    if (days.some(el => el.stat === 1)) {
      // console.log('Here is your data: ', days);
      // PERFORM TREE SHAKING
      treeShakeExerciseRoutine();
      setStep(2);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Missing days !',
        text2: 'Please select atleast one exercise day for the week.',
      });
    }
  };
  const handleNavigateBack = () => {
    setStep(0);
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
                How many days a week you want to exercise ?
              </Text>
              <Text className="text-sm font-normal mt-2 mb-6">
                We usually recommend atleast 3 days a week for beginners or
                better results.
              </Text>
              {/* <DropDown
                label={'Select your exercise days'}
                mode={'outlined'}
                value={exerciseDay}
                list={exerciseDayOption}
                visible={exerciseDayDropdownVis}
                showDropDown={() => setExerciseDayDropdownVis(true)}
                onDismiss={() => setExerciseDayDropdownVis(false)}
                setValue={updateRestDayValue}
                inputProps={{
                  style: {
                    backgroundColor: MThemeColors.white,
                  },
                }}
              /> */}
              {/* <Text className="text-sm font-normal mt-2 text-gray-500">
                Choose number between 1-6
              </Text> */}

              <View className="mt-2">
                {/* <Text className="text-base font-normal mt-6 mb-2">
                  Select your exercise pattern
                </Text> */}

                <RenderDaysSelection days={days} updateDays={setDays} />
              </View>

              <StepNavigator
                step={step}
                navigateNext={handleNextStep}
                navigateBack={handleNavigateBack}
              />
            </React.Fragment>
          )}
        </View>
      </View>
    </React.Fragment>
  );
}
