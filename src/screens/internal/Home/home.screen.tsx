import React from 'react';
import {Image, ScrollView, View, Text} from 'react-native';

import {MThemeColors} from '@/constant/colors';
import UserIntro from '@/components/UserIntro';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
// Data fetching utilities
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  IUserExerciseDetails,
  useGetUserExerciseDetails,
} from '@/apis/exercise.db';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import {WEEKDAYS} from '../Routine/routine.setup.screen';

const CustomLabel = ({label, color}: {label: string; color: string}) => {
  const lineStyle = {
    backgroundColor: color,
    width: 3,
  };
  return (
    <View className="flex flex-row items-center">
      <View className="h-full" style={lineStyle} />
      <Text className="text-white font-semibold text-xs ml-2 capitalize">
        {label}
      </Text>
    </View>
  );
};

const DAYS: Array<WEEKDAYS> = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default function HomeScreen(): JSX.Element {
  // Data fetching logic
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {data, isLoading, isFetching} = useGetUserExerciseDetails(
    authState.frUser?.uid ?? '',
  );

  const {mappedData} = useExtractDocument<IUserExerciseDetails>(data);

  const haveExerciseToday = !!mappedData?.exercise[DAYS[new Date().getDay()]];
  const todaysExercise = mappedData?.exercise[DAYS[new Date().getDay()]];

  const totalSets = (() => {
    let total = 0;
    todaysExercise?.exercises.forEach(exercise => {
      total += exercise.sets;
    });
    return total;
  })();

  const totalReps = (() => {
    let total = 0;
    todaysExercise?.exercises.forEach(exercise => {
      total += exercise.reps;
    });
    return total;
  })();

  React.useEffect(() => {
    // console.log('mapped Data', mappedData);
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      dispatch(stopSpinner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  return (
    <SafeAreaScrollView>
      <UserIntro
        profileLabel={
          haveExerciseToday ? 'Todays Exercise' : 'Enjoy your rest day champ !'
        }
      />

      {/* Exercise Info Section */}
      <View
        className="flex flex-row justify-center mt-6"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{columnGap: 25}}>
        <View className="flex-1 flex-col flex-grow justify-center items-center p-3 py-4 bg-white rounded-xl">
          {mappedData ? (
            <>
              <Image
                className="w-20 h-20 rounded-full mb-3"
                source={require('@/assets/icons/running.png')}
              />
              <Text className="text-sm">Lets do this again!</Text>
              <Text className="font-bold">
                {Object.keys(mappedData.exercise).length * 10} exp to claim
              </Text>
            </>
          ) : (
            <Text className="text-sm">No exercise data found</Text>
          )}
        </View>

        <View
          className="flex-1 flex-col justify-between px-4 py-4 rounded-xl"
          style={{backgroundColor: MThemeColors.black}}>
          {mappedData && haveExerciseToday ? (
            <>
              <CustomLabel
                label={`Muscle Group: ${todaysExercise?.targetMusclegroup
                  .split(',')
                  .filter(Boolean)
                  .join(',')}`}
                color={MThemeColors.lightRed}
              />
              <CustomLabel
                label={`Exercise: ${todaysExercise?.exercises.length ?? 0}`}
                color={MThemeColors.lightGreen}
              />
              {/* <CustomLabel
                label={'Type: Drop Set'}
                color={MThemeColors.lightPurple}
              /> */}
              <CustomLabel
                label={`Total Sets: ${totalSets}`}
                color={MThemeColors.lightPink}
              />
              <CustomLabel
                label={`Total Reps: ${totalReps}`}
                color={MThemeColors.baseOrange}
              />
            </>
          ) : (
            <Text className="text-sm">No exercise data found</Text>
          )}
        </View>
      </View>

      {/* Recent Achievement Section */}
      <Text className="text-2xl font-normal mt-10 mb-5">
        Recent Achievements
      </Text>
      <ScrollView horizontal>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            className="flex flex-col justify-center items-center p-3 py-4 w-36 bg-white rounded-xl mr-4">
            <Image
              className="w-16 h-16 mb-3"
              source={require('@/assets/icons/success.png')}
            />
            <Text className="text-base leading-5 font-semibold">
              COMING SOON
            </Text>
            <Image
              className="w-8 h-8 rounded-full mt-2 self-end"
              source={require('@/assets/icons/star.png')}
            />
          </View>
        ))}
      </ScrollView>

      {/* Daily Tips Section */}
      {/* <Text className="text-2xl font-normal mt-10 mb-5">Daily Tips</Text> */}
      <View className="flex flex-col justify-center items-start p-6 bg-white rounded-xl mt-10">
        <View className="flex flex-row justify-start items-end">
          <Image
            className="w-8 h-8 mr-3"
            source={require('@/assets/icons/lightbulb.png')}
          />
          <Text className="text-base font-medium justify-end">
            Quote of the day!
          </Text>
        </View>
        <Text className="text-sm leading-5 text-justify font-normal text-gray-600 mt-4 pb-3">
          "Every step you take, every rep you do, and every healthy choice you
          make brings you closer to becoming the best version of yourself.
          Embrace the journey, stay committed, and remember that progress is not
          always linear. Stay consistent, and soon you'll be amazed by how far
          you've come. Your dedication today is your achievement tomorrow. Keep
          pushing, stay focused, and let your passion for fitness light up your
          path to success!" 💪🔥
        </Text>
      </View>
    </SafeAreaScrollView>
  );
}
