import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const useExtractDocument = <T>(
  dataExtract:
    | FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | undefined,
) => {
  if (!dataExtract) {
    return {};
  }
  const mappedData = {
    _id: dataExtract?.id,
    ...dataExtract?.data(),
  } as T;

  return {
    mappedData,
  };
};

const useExtractQuery = <T>(
  dataMap:
    | FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    | undefined,
) => {
  if (!dataMap) {
    return {};
  }
  const mappedData: T[] | undefined = dataMap.docs.map(
    (
      d: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    ) =>
      ({
        _id: d.id,
        ...d.data(),
      } as T),
  );

  return {
    mappedData,
  };
};
export {useExtractDocument, useExtractQuery};
