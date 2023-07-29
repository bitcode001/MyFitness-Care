import React from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import UserIntro from '@/components/UserIntro';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import StepOne from './step.one';
import StepTwo from './step.two';
import StepThree from './step.three';
import {MThemeColors} from '@/constant/colors';
import {useGetAllExerciseDetails} from '@/apis/exercise.db';
import {useDispatch} from 'react-redux';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import {useExtractQuery} from '@/hooks/useExtractFirebaseData';

export type WEEKDAYS =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface DaysInterface {
  id: number;
  day: WEEKDAYS;
  stat: number | null;
}

export interface ExerciseInterface {
  id: number;
  name: string;
  gifUrl: string;
  sets: number;
  reps: number;
}

export type ExerciseRoutineInterface = {
  [key in WEEKDAYS]?: {
    id: number;
    accordionStat: false;
    dropdownStat: false;
    targetMusclegroup: string;
    exercises: ExerciseInterface[] | [];
  };
};

export interface FetchedExerciseData {
  _id: string;
  bodyParts: string[];
  targetMuscles: string[];
}

// const user_reg_steps = [
//   {
//     id: 1,
//     title: 'Select Days',
//   },
//   {
//     id: 2,
//     title: 'Select Exercises',
//   },
//   {
//     id: 3,
//     title: 'Select Time',
//   },
// ];

export default function RoutineSetupScreen(): JSX.Element {
  const {
    data: exerciseData,
    isLoading,
    isFetching,
  } = useGetAllExerciseDetails();
  const {mappedData} = useExtractQuery<FetchedExerciseData>(exerciseData);

  const dispatch = useDispatch();

  const [days, setDays] = React.useState<DaysInterface[]>([
    {id: 1, day: 'sunday', stat: null},
    {id: 2, day: 'monday', stat: null},
    {id: 3, day: 'tuesday', stat: null},
    {id: 4, day: 'wednesday', stat: null},
    {id: 5, day: 'thursday', stat: null},
    {id: 6, day: 'friday', stat: null},
    {id: 7, day: 'saturday', stat: null},
  ]);

  const [exerciseRoutine, setExerciseRoutine] =
    React.useState<ExerciseRoutineInterface>({});

  const [step, setStep] = React.useState<number>(1);

  // FOR STEP 3
  const [date, setDate] = React.useState<Date>(new Date());

  // FOR STEP 3 - TIME PICKER
  const [time, setTime] = React.useState<{hours: string; minutes: string}>({
    hours: '00',
    minutes: '00',
  });

  React.useEffect(() => {
    for (let i = 0; i < days.length; i++) {
      if (days[i].stat === 1 && !exerciseRoutine[days[i].day]) {
        setExerciseRoutine(prev => ({
          ...prev,
          [days[i].day]: {
            id: days[i].id,
            accordionStat: false,
            dropdownStat: false,
            exercises: [
              {
                id: Date.now(),
                name: '',
                gifUrl: '',
                sets: 0,
                reps: 0,
              },
            ],
          },
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  React.useEffect(() => {
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      dispatch(stopSpinner());
      // console.log('Ex Data: ', mappedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
        <StepOne days={days} setDays={setDays} step={step} setStep={setStep} />

        {/* Step two of the stepper */}
        <StepTwo
          days={days}
          exerciseRoutine={exerciseRoutine}
          setExerciseRoutine={setExerciseRoutine}
          fetchedExerciseData={mappedData ?? []}
          step={step}
          setStep={setStep}
        />

        {/* Step three of the stepper */}
        <StepThree
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          step={step}
          setStep={setStep}
        />
      </View>

      {step === 3 && (
        <Button
          mode="contained"
          style={{backgroundColor: MThemeColors.darkGreen}}
          className="rounded-none my-10 mt-16 ml-12">
          <Text className="text-white text-lg font-medium">Finish Setup</Text>
        </Button>
      )}
    </SafeAreaScrollView>
  );
}
