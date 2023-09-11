import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  GAgeGroup,
  GGender,
  // GGoal,
  GLevelOfFitness,
  GeneralInfoType,
} from './routine.setup.screen';
import {Checkbox} from 'react-native-paper';
import StepNavigator from './step.navigator';

const g_gender: Array<GGender> = ['male', 'female', 'prefer not to say'];
const g_ageGroup: Array<GAgeGroup> = ['18-25', '26-35', '36-45', '46+'];
// const g_goal: Array<GGoal> = ['weight loss', 'muscle gain'];
const g_levelOfFitness: Array<GLevelOfFitness> = [
  'beginner',
  'intermediate',
  'advanced',
];

interface GeneralInfoSectionInterface {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  generalInfo: GeneralInfoType;
  setGeneralInfo: React.Dispatch<GeneralInfoType>;
}

const GenerateQuestionGroup = ({
  title,
  options,
  updateKey,
  generalInfo,
  setGeneralInfo,
}: {
  title: string;
  options: string[];
  updateKey: keyof GeneralInfoType;
  generalInfo: GeneralInfoType;
  setGeneralInfo: React.Dispatch<GeneralInfoType>;
}) => {
  const updateGeneralInfo = (key: string, value: any) => {
    setGeneralInfo({...generalInfo, [key]: value});
  };
  return (
    <View className="flex flex-col mt-4">
      <Text className="text-base font-medium mt-2 mb-2">{title}</Text>
      {options.map((el, idx) => (
        <TouchableOpacity
          key={idx}
          className="flex flex-row items-center"
          onPress={() => updateGeneralInfo(updateKey, el)}>
          <Checkbox.Android
            status={el === generalInfo[updateKey] ? 'checked' : 'unchecked'}
          />
          <Text className="capitalize">{el}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function GeneralInformation({
  step,
  setStep,
  generalInfo,
  setGeneralInfo,
}: GeneralInfoSectionInterface) {
  const handleNavigateNext = () => {
    setStep(1);
    // console.log('General Info', generalInfo);
  };

  return (
    <React.Fragment>
      <View className="flex flex-row items-start relative">
        <View className="absolute left-4 top-0 h-full w-0.5 bg-slate-300" />
        <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Text className="text-base font-medium leading-5 text-center">0</Text>
        </View>
        <View className="flex flex-col flex-1 pl-4 pt-1 pb-8">
          <Text className="text-lg font-bold leading-5">
            General Information
          </Text>
          <Text className="text-base font-medium mt-2">
            Please fill in the following information to get started
          </Text>

          {step === 0 && (
            <React.Fragment>
              <GenerateQuestionGroup
                title="Please specify your gender"
                options={g_gender}
                generalInfo={generalInfo}
                setGeneralInfo={setGeneralInfo}
                updateKey="gender"
              />

              <GenerateQuestionGroup
                title="Please specify your age group"
                options={g_ageGroup}
                generalInfo={generalInfo}
                setGeneralInfo={setGeneralInfo}
                updateKey="ageGroup"
              />

              {/* <GenerateQuestionGroup
                title="Please specify your goal"
                options={g_goal}
                generalInfo={generalInfo}
                setGeneralInfo={setGeneralInfo}
                updateKey="goal"
              /> */}

              <GenerateQuestionGroup
                title="Please specify your level of fitness"
                options={g_levelOfFitness}
                generalInfo={generalInfo}
                setGeneralInfo={setGeneralInfo}
                updateKey="levelOfFitness"
              />

              <StepNavigator step={step} navigateNext={handleNavigateNext} />
            </React.Fragment>
          )}
        </View>
      </View>
    </React.Fragment>
  );
}
