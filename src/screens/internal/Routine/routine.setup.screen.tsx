import React, {useReducer} from 'react';
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
  // useGetAllExerciseDetails,
  useSetUserExerciseDetails,
  useSetUserExerciseRecords,
} from '@/apis/exercise.db';
import {useDispatch, useSelector} from 'react-redux';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
// import {useExtractQuery} from '@/hooks/useExtractFirebaseData';
import {RootState} from '@/redux/store';
import Toast from 'react-native-toast-message';
import {invalidateExerciseSlice} from '@/redux/slice/exercise.slice';
import GeneralInformation from './general.info';

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
  stat: number;
}

export interface ExerciseInterface {
  // id: number;
  // name: string;
  // gifUrl?: string;
  // timer?: number;
  // sets: number;
  // reps: number;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

export type ExerciseRoutineInterface = {
  [key in WEEKDAYS]?: {
    id: number;
    accordionStat?: false;
    dropdownStat?: false;
    targetMusclegroup: string;
    exercises: ExerciseInterface[] | [];
    timeLimit: number;
  };
};

export type IExerciseRoutineInterface = {
  [key in WEEKDAYS]?: {
    id: number;
    targetMusclegroup: string;
    exercises: ExerciseInterface[] | [];
    timeLimit: number;
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
  {id: 1, day: 'sunday', stat: 0},
  {id: 2, day: 'monday', stat: 0},
  {id: 3, day: 'tuesday', stat: 0},
  {id: 4, day: 'wednesday', stat: 0},
  {id: 5, day: 'thursday', stat: 0},
  {id: 6, day: 'friday', stat: 0},
  {id: 7, day: 'saturday', stat: 0},
];

export type ExData = {
  _id: string;
  bodyPart: string;
  imgUrl: string | string[];
};

export type IExerciseData = Array<ExData>;
const internalExerciseData: IExerciseData = [
  {
    _id: '0',
    bodyPart: 'back',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fback.png?alt=media&token=d833e343-3308-4ac2-a027-94d372050291',
  },
  {
    _id: '1',
    bodyPart: 'cardio',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fcardio.png?alt=media&token=0fa20aa8-9348-4528-b57f-b0fe1c689f2a',
  },
  {
    _id: '2',
    bodyPart: 'chest',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fchest.png?alt=media&token=652147b6-b99c-4457-936b-ae8f92bb21aa',
  },
  {
    _id: '3',
    bodyPart: 'lower arms',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Flower-arms.png?alt=media&token=8c54e178-f34b-4d06-ac1d-e68fb1f6e18b',
  },
  {
    _id: '4',
    bodyPart: 'lower legs',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Flower-legs.png?alt=media&token=831c41e5-99af-4152-ae0c-6c542e8063e4',
  },
  {
    _id: '5',
    bodyPart: 'neck and shoulders',
    imgUrl: [
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fneck.png?alt=media&token=8bafc449-7543-425a-917d-2d6527ebc8f8',
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fshoulders.png?alt=media&token=8b3e98d5-96e7-4c9b-8b41-7c3b82812c83',
    ],
  },
  {
    _id: '6',
    bodyPart: 'upper arms',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fupper-arms.png?alt=media&token=e5dfecaa-f2d1-4405-b2da-2e9d9dd31d50',
  },
  {
    _id: '7',
    bodyPart: 'upper legs',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fupper-legs.png?alt=media&token=9310e2f0-1792-47c3-97ad-b58b3dd084f4',
  },
  {
    _id: '8',
    bodyPart: 'waist',
    imgUrl: [
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fwaist-m.png?alt=media&token=0eef2709-5338-4175-965f-d7b9bb542495',
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/exercise-assets%2Fwaist-f.png?alt=media&token=28295ac2-64ba-4576-aed0-091053d3aa4c',
    ],
  },
];

// General Info intefaces and data
export type GGender = 'male' | 'female' | 'prefer not to say';
export type GAgeGroup = '18-25' | '26-35' | '36-45' | '46+';
// export type GGoal = 'weight loss' | 'muscle gain';
export type GLevelOfFitness = 'beginner' | 'intermediate' | 'advanced';
export interface GeneralInfoType {
  gender: GGender;
  ageGroup: GAgeGroup;
  // goal: GGoal;
  levelOfFitness: GLevelOfFitness;
}

interface RoutineSetupScreenInterface {
  handleUpdateComplete?: React.Dispatch<React.SetStateAction<boolean | null>>;
  isReupdatingEx?: boolean;
  updateCb?: () => void;
  defaultDateTime?: {
    default_date: string;
    default_time: {
      hours: string;
      minutes: string;
    };
  };
}

export default function RoutineSetupScreen({
  handleUpdateComplete,
  isReupdatingEx,
  updateCb,
  defaultDateTime,
}: RoutineSetupScreenInterface): JSX.Element {
  // const {
  //   data: exerciseData,
  //   isLoading,
  //   isFetching,
  // } = useGetAllExerciseDetails();
  // const {mappedData} = useExtractQuery<FetchedExerciseData>(exerciseData);

  const authState = useSelector((state: RootState) => state.auth);

  const {
    mutate: mutateFinalUserData,
    // isIdle: mutationIdle,
    isLoading: mutationOngoing,
    isError: mutationError,
    isSuccess: mutationSuccess,
    status: mutationStatus,
  } = useSetUserExerciseDetails(authState.frUser?.uid! ?? '');

  const {
    mutate: mutateUserExerciseRecords,
    // isIdle: mutationIdle2,
    isLoading: mutationOngoing2,
    isError: mutationError2,
    isSuccess: mutationSuccess2,
    status: mutationStatus2,
  } = useSetUserExerciseRecords(authState.frUser?.uid! ?? '');

  const dispatch = useDispatch();

  const [step, setStep] = React.useState<number>(0);
  // User General Information - Unit 0
  const [generalInfo, setGeneralInfo] = useReducer<
    (prev: GeneralInfoType, next: GeneralInfoType) => GeneralInfoType
  >(
    (prev, next) => {
      return {
        ...prev,
        ...next,
      };
    },
    {
      gender: 'male',
      ageGroup: '18-25',
      // goal: 'weight loss',
      levelOfFitness: 'beginner',
    } as GeneralInfoType,
  );

  // For step 2
  const [untrackedChanges, setUntractedChanges] = React.useState(true);
  const [days, setDays] = React.useState<DaysInterface[]>(
    DAYS_SELECTION_AND_STAT,
  );

  const [exerciseRoutine, setExerciseRoutine] =
    React.useState<ExerciseRoutineInterface>({});

  const resetExerciseDays = () => {
    const days_ref = DAYS_SELECTION_AND_STAT.map(el => ({
      ...el,
      stat: 0,
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

    let finalData: IUserExerciseDetails = {
      exercise: refinedRoutine,
      m_badges: [],
      m_challenges: [],
      m_id: String(Date.now()),
      start_date: isReupdatingEx ? defaultDateTime?.default_date : String(date),
      start_time: isReupdatingEx ? defaultDateTime?.default_time : time,
      rest_days: r_days,
      workout_days: g_days,
    };
    // Only and only if user is registering for the first time and is not updating it again we record the date andtime
    // console.log('Final Data: ', JSON.stringify(finalData, null, 2));
    // MUTATE USER DATA NOW
    mutateFinalUserData(finalData);
    // MUTATE and INITIALIZE EMPTY USER EXERCISE RECORD
    // Only if user is setting up for the first time
    if (!isReupdatingEx) {
      mutateUserExerciseRecords(initialUserExerciseRecords);
    }
  };

  React.useEffect(() => {
    if (mutationOngoing || mutationOngoing2) {
      dispatch(startSpinner());
    } else {
      // if (mutationIdle && mutationIdle2) {
      // }

      if (
        (isReupdatingEx && mutationSuccess) ||
        (mutationSuccess && mutationSuccess2)
      ) {
        dispatch(stopSpinner());
        Toast.show({
          type: 'success',
          text1: 'Routine Setup',
          text2: 'Routine setup completed successfully!',
        });
        resetExerciseDays();
        if (!isReupdatingEx) {
          dispatch(invalidateExerciseSlice());
        } else {
          handleUpdateComplete && handleUpdateComplete(true);
          updateCb && updateCb();
        }
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
            exercises: [],
          },
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <SafeAreaScrollView>
      <UserIntro
        profileLabel={
          isReupdatingEx ? 'Lets plan again !' : 'Lets get started !'
        }
      />

      <View className="flex flex-row justify-between items-center mt-10">
        <Image
          className="w-12 h-12"
          source={require('@/assets/icons/on-fire.png')}
        />
        <Text className="text-lg font-medium px-6">
          {isReupdatingEx
            ? 'Great to have you here again ! Your can reset your plan again from here'
            : 'Here we will design your workout routine!'}
        </Text>
      </View>

      {/* Stepper Section */}
      <View className="flex flex-col justify-between items-start mt-10">
        {/* <View className="absolute left-6 top-0 h-full w-0.5 bg-slate-300" /> */}
        <GeneralInformation
          step={step}
          setStep={setStep}
          generalInfo={generalInfo}
          setGeneralInfo={setGeneralInfo}
        />

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
          fetchedExerciseData={internalExerciseData ?? []}
          step={step}
          setStep={setStep}
          generalInfo={generalInfo}
          untrackedChanges={untrackedChanges}
          setUntrackedChanges={setUntractedChanges}
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
          className="rounded-none mb-10 ml-12"
          onPress={initiateFinalSetup}>
          <Text className="text-white text-lg font-medium">Finish Setup</Text>
        </Button>
      )}
    </SafeAreaScrollView>
  );
}
