import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Image} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ProfileStackParamList} from './profile.screen';
import {ActivityIndicator, Button} from 'react-native-paper';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import {MThemeColors} from '@/constant/colors';
import {
  IUserExerciseDetails,
  useGetUserExerciseDetails,
} from '@/apis/exercise.db';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {WEEKDAYS} from '../Routine/routine.setup.screen';

type MyExerciseListScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'MyExerciseList'
>;

type MyExercisListScreenInterface = {
  navigation: MyExerciseListScreenNavigationProp;
  // route: LoginScreenRouteProp;
};

export default function MyExerciseList({
  navigation,
}: MyExercisListScreenInterface) {
  const authState = useSelector((state: RootState) => state.auth);
  const {
    data: userData,
    isLoading,
    isFetching,
    // isFetched,
  } = useGetUserExerciseDetails(authState.frUser?.uid! ?? '');
  const {mappedData} = useExtractDocument<IUserExerciseDetails>(userData);

  //   React.useEffect(() => {
  // console.log('VAL: ', JSON.stringify(mappedData));
  //   }, [isFetched]);

  return (
    <SafeAreaScrollView>
      <View className="flex flex-row items-center">
        <Button
          mode="text"
          style={{backgroundColor: MThemeColors.black}}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="arrow-left"
            size={22}
            color={MThemeColors.white}
          />
        </Button>

        <Text className="flex-1 ml-4 font-bold text-base">
          These are your exercise routines
        </Text>
      </View>

      <Button
        className="mt-5 rounded-none flex-1"
        style={{
          backgroundColor: MThemeColors.darkGreen,
        }}
        mode="contained"
        onPress={() =>
          navigation.navigate('EditExerciseList', {
            data: {
              start_date: mappedData?.start_date ?? '',
              start_time: mappedData?.start_time ?? {
                hours: '00',
                minutes: '00',
              },
            },
          })
        }>
        Edit
      </Button>
      {isLoading && isFetching && (
        <ActivityIndicator animating={true} size={'large'} />
      )}
      {mappedData && (
        <View className="mt-4">
          {Object.keys(mappedData.exercise).map(el => (
            <View key={el}>
              <View className="p-4 mb-6 mt-4 bg-white">
                <Text className="capitalize text-base font-bold">{el}</Text>
              </View>
              <View className="mb-16">
                {mappedData.exercise[el as WEEKDAYS]?.exercises.map(
                  (item, index) => (
                    <View
                      key={index}
                      className="bg-white rounded-2xl p-4 flex flex-row justify-between items-center my-4">
                      <Image
                        className="w-16 h-16 rounded-full"
                        source={{uri: item.gifUrl}}
                      />
                      <View className="flex flex-1 flex-col ml-4">
                        <Text className="text-base font-bold capitalize">
                          {item.name}
                        </Text>
                        <View className="flex flex-col items-start my-2 mb-4">
                          <Text className="text-sm leading-5 text-center font-medium">
                            Target: {item.target}
                          </Text>
                          <Text className="text-xs leading-5 text-center font-medium">
                            Equipment: {item.equipment}
                          </Text>
                        </View>
                        <View className="flex flex-row flex-wrap gap-2">
                          <View
                            className="rounded-full"
                            style={{
                              backgroundColor: MThemeColors.skyBlue,
                            }}>
                            <Text className="text-white text-xs px-2 py-1">
                              +10exp
                            </Text>
                          </View>
                          <View
                            className="rounded-full"
                            style={{
                              backgroundColor: MThemeColors.baseOrange,
                            }}>
                            <Text className="text-white text-xs px-2 py-1">
                              +5 trophies
                            </Text>
                          </View>
                          <View
                            className="rounded-full"
                            style={{
                              backgroundColor: MThemeColors.successGreen,
                            }}>
                            <Text className="text-white text-xs px-2 py-1">
                              +2 MCoins
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </SafeAreaScrollView>
  );
}
