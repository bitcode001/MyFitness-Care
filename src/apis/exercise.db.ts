import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const useGetAllExerciseDetails = () => {
  const exerciseCollection = firestore().collection('exercise-details');

  return useQuery<
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
    ReactNativeFirebase.NativeFirebaseError
  >({
    queryKey: ['getPerformnace'],
    queryFn: () => exerciseCollection.get(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export {useGetAllExerciseDetails};

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
