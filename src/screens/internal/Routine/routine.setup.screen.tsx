import React from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import UserIntro from '@/components/UserIntro';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import StepOne from './step.one';
import StepTwo from './step.two';
import StepThree from './step.three';
import {MThemeColors} from '@/constant/colors';
import {
  IUserExerciseDetails,
  initialUserExerciseRecords,
  useGetAllExerciseDetails,
  useSetUserExerciseDetails,
  useSetUserExerciseRecords,
} from '@/apis/exercise.db';
import {useDispatch, useSelector} from 'react-redux';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import {useExtractQuery} from '@/hooks/useExtractFirebaseData';
import {RootState} from '@/redux/store';
import Toast from 'react-native-toast-message';

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
  gifUrl?: string;
  sets: number;
  reps: number;
}

export type ExerciseRoutineInterface = {
  [key in WEEKDAYS]?: {
    id: number;
    accordionStat?: false;
    dropdownStat?: false;
    targetMusclegroup: string;
    exercises: ExerciseInterface[] | [];
  };
};

export type IExerciseRoutineInterface = {
  [key in WEEKDAYS]?: {
    id: number;
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
const DAYS_SELECTION_AND_STAT: DaysInterface[] = [
  {id: 1, day: 'sunday', stat: null},
  {id: 2, day: 'monday', stat: null},
  {id: 3, day: 'tuesday', stat: null},
  {id: 4, day: 'wednesday', stat: null},
  {id: 5, day: 'thursday', stat: null},
  {id: 6, day: 'friday', stat: null},
  {id: 7, day: 'saturday', stat: null},
];

export default function RoutineSetupScreen({
  handleUpdateComplete,
}: {
  handleUpdateComplete: React.Dispatch<React.SetStateAction<boolean | null>>;
}): JSX.Element {
  const {
    data: exerciseData,
    isLoading,
    isFetching,
  } = useGetAllExerciseDetails();
  const {mappedData} = useExtractQuery<FetchedExerciseData>(exerciseData);

  const authState = useSelector((state: RootState) => state.auth);

  const {
    mutate: mutateFinalUserData,
    isIdle: mutationIdle,
    isLoading: mutationOngoing,
    isError: mutationError,
    isSuccess: mutationSuccess,
    status: mutationStatus,
  } = useSetUserExerciseDetails(authState.frUser?.uid! ?? '');

  const {
    mutate: mutateUserExerciseRecords,
    isIdle: mutationIdle2,
    isLoading: mutationOngoing2,
    isError: mutationError2,
    isSuccess: mutationSuccess2,
    status: mutationStatus2,
  } = useSetUserExerciseRecords(authState.frUser?.uid! ?? '');

  const dispatch = useDispatch();

  const [days, setDays] = React.useState<DaysInterface[]>(
    DAYS_SELECTION_AND_STAT,
  );

  const [exerciseRoutine, setExerciseRoutine] =
    React.useState<ExerciseRoutineInterface>({});

  const resetExerciseDays = () => {
    const days_ref = DAYS_SELECTION_AND_STAT.map(el => ({
      ...el,
      stat: null,
    }));
    setDays(days_ref);
    setExerciseRoutine({});
  };

  const treeShakeExerciseRoutine = () => {
    const r_days = days.filter(el => el.stat === 0);
    const cp = {...exerciseRoutine};
    r_days.forEach(el => {
      if (cp[el.day]) {
        delete cp[el.day];
      }
    });

    setExerciseRoutine(cp);
  };

  const [step, setStep] = React.useState<number>(1);

  // FOR STEP 3
  const [date, setDate] = React.useState<Date>(new Date());

  // FOR STEP 3 - TIME PICKER
  const [time, setTime] = React.useState<{hours: string; minutes: string}>({
    hours: '00',
    minutes: '00',
  });

  const initiateFinalSetup = () => {
    // PRE DATA
    const r_days = days.filter(el => el.stat === 0).map(el => el.day);
    const g_days = days.filter(el => el.stat === 1).map(el => el.day);
    const refinedRoutine: IExerciseRoutineInterface = Object.keys(
      exerciseRoutine,
    ).reduce((prev, curr_item) => {
      const c_ref = exerciseRoutine[curr_item as WEEKDAYS];
      if (c_ref) {
        delete c_ref.accordionStat;
        delete c_ref.dropdownStat;
      }

      return {
        ...prev,
        [curr_item]: c_ref,
      };
    }, {});

    const finalData: IUserExerciseDetails = {
      exercise: refinedRoutine,
      m_badges: [],
      m_challenges: [],
      m_id: String(Date.now()),
      start_date: date,
      start_time: time,
      rest_days: r_days,
      workout_days: g_days,
    };
    // console.log('Final Data: ', JSON.stringify(finalData, null, 2));
    // MUTATE USER DATA NOW
    mutateFinalUserData(finalData);
    // MUTATE and INITIALIZE EMPTY USER EXERCISE RECORD
    mutateUserExerciseRecords(initialUserExerciseRecords);
  };

  React.useEffect(() => {
    if (mutationOngoing || mutationOngoing2) {
      dispatch(startSpinner());
    } else {
      if (mutationIdle && mutationIdle2) {
        dispatch(stopSpinner());
      }

      if (mutationSuccess && mutationSuccess2) {
        Toast.show({
          type: 'success',
          text1: 'Routine Setup',
          text2: 'Routine setup completed successfully!',
        });
        handleUpdateComplete(true);
        resetExerciseDays();
      }
      if (mutationError || mutationError2) {
        Toast.show({
          type: 'error',
          text1: 'Routine Setup',
          text2: 'Routine setup failed!',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationStatus, mutationStatus2]);

  React.useEffect(() => {
    for (let i = 0; i < days.length; i++) {
      if (days[i].stat === 1 && !exerciseRoutine[days[i].day]) {
        setExerciseRoutine(prev => ({
          ...prev,
          [days[i].day]: {
            id: days[i].id,
            accordionStat: false,
            dropdownStat: false,
            targetMusclegroup: '',
            exercises: [
              {
                id: Date.now(),
                name: '',
                // gifUrl: '',
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
        <StepOne
          days={days}
          setDays={setDays}
          step={step}
          setStep={setStep}
          treeShakeExerciseRoutine={treeShakeExerciseRoutine}
        />

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
          className="rounded-none my-10 mt-16 ml-12"
          onPress={initiateFinalSetup}>
          <Text className="text-white text-lg font-medium">Finish Setup</Text>
        </Button>
      )}
    </SafeAreaScrollView>
  );
}
