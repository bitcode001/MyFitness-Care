import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  IExerciseRoutineInterface,
  WEEKDAYS,
} from '@/screens/internal/Routine/routine.setup.screen';
import calculateUserLevel from '@/constant/utils';

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
  start_date: string;
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
    m_level: 1,
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

type DynamicUserExerciseRecordsUpdateObj = {
  m_coin: number;
  m_level?: number;
  m_streak: number;
  m_trophies: number;
  m_exp: number;
  date: string;
  day: WEEKDAYS;
  exerciseCount: number;
};

const useUpdateUserExerciseRecords = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ReactNativeFirebase.NativeFirebaseError,
    DynamicUserExerciseRecordsUpdateObj
  >(
    (data: DynamicUserExerciseRecordsUpdateObj) => {
      return firestore().runTransaction(async transaction => {
        const exerciseRecordsCollection =
          firestore().collection('exercise-record');

        const recordDataRef = firestore()
          .collection('exercise-record')
          .doc(userId);

        const doc = await transaction.get(
          exerciseRecordsCollection.doc(userId),
        );

        if (!doc.exists) {
          throw new Error('Document does not exist!');
        }

        const economyData = doc.data() ?? {};

        // Calculate new economy values based on the previous values (Example: Increment by 1)
        const newEconomy = {
          ...economyData.economy,
          m_coin: economyData.economy.m_coin + data.m_coin,
          // m_level: economyData.economy.m_level + data.m_level,
          m_level:
            calculateUserLevel(economyData.economy.m_exp + data.m_exp) + 1, // Calculate new level based on the new exp (Example: Increment by 5
          m_streak: economyData.economy.m_streak + data.m_streak,
          m_trophies: economyData.economy.m_trophies + data.m_trophies,
          m_exp: economyData.economy.m_exp + data.m_exp,
        };

        // Push a new object to the exercise array with the current date and exercise count
        const newRecord = {
          date: data.date,
          day: data.day,
          exerciseCount: data.exerciseCount,
        };

        // Update the entire document with the new economy and exercise values
        transaction.update(recordDataRef, {
          economy: newEconomy,
          record: firestore.FieldValue.arrayUnion(newRecord),
        });
      });
    },
    {
      // Mutation key to uniquely identify the mutation and its result in the query cache
      mutationKey: ['updateUserExerciseRecords', userId],
      onSuccess: () => {
        // If the mutation is successful, invalidate the corresponding query to refetch data
        queryClient.invalidateQueries(['getUserExerciseRecords', userId]);
      },
      onError: error => {
        // Handle the error
        console.error(error);
      },
    },
  );
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
