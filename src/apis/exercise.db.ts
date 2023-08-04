import {useMutation, useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {IExerciseRoutineInterface} from '@/screens/internal/Routine/routine.setup.screen';

const useGetAllExerciseDetails = () => {
  const exerciseCollection = firestore().collection('exercise-details');

  return useQuery<
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
    ReactNativeFirebase.NativeFirebaseError
  >({
    queryKey: ['getExerciseDetails'],
    queryFn: () => exerciseCollection.get(),
    refetchOnWindowFocus: false,
    // enabled: false,
  });
};

export interface IUserExerciseDetails {
  exercise: IExerciseRoutineInterface;
  m_badges: string[];
  m_challenges: string[];
  m_id: string;
  start_date: Date;
  start_time: {
    hours: string;
    minutes: string;
  };
  rest_days: string[];
  workout_days: string[];
}

const useGetUserExerciseDetails = (userId: string) => {
  const userDetailsCollection = firestore().collection('user-details');

  return useQuery<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    ReactNativeFirebase.NativeFirebaseError
  >({
    queryKey: ['getUserExerciseDetails', userId],
    queryFn: () => userDetailsCollection.doc(userId).get(),
    refetchOnWindowFocus: false,
    cacheTime: 0,
    // enabled: false,
    // suspense: true,
  });
};

const useSetUserExerciseDetails = (userId: string) => {
  const userDetailsCollection = firestore().collection('user-details');

  return useMutation<
    void,
    ReactNativeFirebase.NativeFirebaseError,
    IUserExerciseDetails
  >({
    mutationKey: ['setUserExerciseDetails', userId],
    mutationFn: (data: IUserExerciseDetails) =>
      userDetailsCollection.doc(userId).set(data),
  });
};

// Get Exercise Records
const useGetUserExerciseRecords = (userId: string) => {
  const exerciseRecordsCollection = firestore().collection('exercise-record');

  return useQuery<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    ReactNativeFirebase.NativeFirebaseError
  >({
    queryKey: ['getUserExerciseRecords', userId],
    queryFn: () => exerciseRecordsCollection.doc(userId).get(),
    refetchOnWindowFocus: false,
    cacheTime: 0,
    // enabled: false,
    // suspense: true,
  });
};

export interface IUserExerciseRecords {
  economy: {
    m_coin: number;
    m_level: number;
    m_streak: number;
    m_trophies: number;
    m_exp: number;
  };
  exercise: {
    date: Date;
    day: string;
    exerciseCount: number;
  }[];
}
export const initialUserExerciseRecords: IUserExerciseRecords = {
  economy: {
    m_coin: 0,
    m_level: 0,
    m_streak: 0,
    m_trophies: 0,
    m_exp: 5,
  },
  exercise: [],
};
// Mutate user exercise records
const useSetUserExerciseRecords = (userId: string) => {
  const exerciseRecordsCollection = firestore().collection('exercise-record');

  return useMutation<
    void,
    ReactNativeFirebase.NativeFirebaseError,
    IUserExerciseRecords
  >({
    mutationKey: ['setUserExerciseRecords', userId],
    mutationFn: (data: IUserExerciseRecords) =>
      exerciseRecordsCollection.doc(userId).set(data),
  });
};

type DynamicUserExerciseRecordsUpdateObj = Record<string, number | {}>;
const useUpdateUserExerciseRecords = (userId: string) => {
  const exerciseRecordsCollection = firestore().collection('exercise-record');

  return useMutation<
    void,
    ReactNativeFirebase.NativeFirebaseError,
    DynamicUserExerciseRecordsUpdateObj
  >({
    mutationKey: ['setUserExerciseRecords', userId],
    mutationFn: (data: DynamicUserExerciseRecordsUpdateObj) =>
      exerciseRecordsCollection.doc(userId).update(data),
  });
};

export {
  useGetAllExerciseDetails,
  useGetUserExerciseDetails,
  useSetUserExerciseDetails,
  useGetUserExerciseRecords,
  useSetUserExerciseRecords,
  useUpdateUserExerciseRecords,
};

// const options = {
//   method: 'GET',
//   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
//   headers: {
//     'X-RapidAPI-Key': '11c97b4cc0mshdbed04ac594ac18p13cecajsn05a66dc42923',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
//   },
// };

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.error(error);
// }
