import React from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {MThemeColors} from '@/constant/colors';
import {MSpacing} from '@/constant/measurements';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, IconButton} from 'react-native-paper';

// Data fetching utilities
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  IUserExerciseDetails,
  useGetUserExerciseDetails,
  useUpdateUserExerciseRecords,
} from '@/apis/exercise.db';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import FallbackUI from '@/components/Fallback/fallback.ui';
import {W_DAYS} from '../Home/home.screen';
import {
  // invalidateExerciseSlice,
  setDidCompleteTodaysExercise,
} from '@/redux/slice/exercise.slice';
// import {WEEKDAYS} from '../Routine/routine.setup.screen';
import Toast from 'react-native-toast-message';

export default function ExerciseScreen(): JSX.Element {
  // const insets = useSafeAreaInsets();
  // const statusBarHeight = insets.top;
  const isDarkMode = useColorScheme() === 'dark';
  const [startExercise, setStartExercise] = React.useState(false);

  // Data fetching logic
  const authState = useSelector((state: RootState) => state.auth);
  const exerciseState = useSelector((state: RootState) => state.exercise);
  const dispatch = useDispatch();
  const {data, isLoading, isFetching} = useGetUserExerciseDetails(
    authState.frUser?.uid ?? '',
  );

  const {
    mutate: mutateUserExerciseRecords,
    isIdle: mutationIdle,
    isLoading: mutationOngoing,
    isError: mutationError,
    isSuccess: mutationSuccess,
    status: mutationStatus,
  } = useUpdateUserExerciseRecords(authState.frUser?.uid ?? '');

  const {mappedData} = useExtractDocument<IUserExerciseDetails>(data);

  const haveExerciseToday = !!mappedData?.exercise[W_DAYS[new Date().getDay()]];
  const todaysExercise = mappedData?.exercise[W_DAYS[new Date().getDay()]];

  const exerciseList = todaysExercise?.exercises.length
    ? todaysExercise?.exercises.length
    : 0;
  const [completedExerciseIndex, setCompletedExerciseIndex] = React.useState<
    number | null
  >(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : MThemeColors.white,
  };

  const tallyLastCompletedExerciseDay: () => boolean = () => {
    if (exerciseState.todaysDay === W_DAYS[new Date().getDay()]) {
      return true;
    }
    return false;
  };

  const shouldDisable = (dependent: boolean) => {
    if (tallyLastCompletedExerciseDay()) {
      return true;
    }
    if (
      completedExerciseIndex === null ||
      completedExerciseIndex < exerciseList - 1
    ) {
      return dependent;
    } else {
      return true;
    }
  };

  const handleExerciseStart = () => {
    setStartExercise(!startExercise);
  };

  const handleExerciseStop = () => {
    setStartExercise(!startExercise);
    setCompletedExerciseIndex(val => (val !== null ? val + 1 : 0));
  };

  const customizeExerciseStat = (index: number) => {
    if (tallyLastCompletedExerciseDay()) {
      return {
        opacity: 0.5,
      };
    }
    return {
      opacity:
        completedExerciseIndex !== null && index <= completedExerciseIndex
          ? 0.5
          : 1,
    };
  };

  React.useEffect(() => {
    // console.log('mapped Data', mappedData);
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      dispatch(stopSpinner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  React.useEffect(() => {
    if (completedExerciseIndex === exerciseList - 1) {
      mutateUserExerciseRecords({
        date: String(new Date().toISOString()),
        day: W_DAYS[new Date().getDay()],
        exerciseCount: exerciseList,
        m_coin: exerciseList * 2,
        m_exp: exerciseList * 10,
        m_trophies: exerciseList * 5,
        m_streak: 1,
        // m_level: calculateUserLevel(exerciseList * 10),
      });
      console.log('final data: ', {
        date: String(new Date().toISOString()),
        day: W_DAYS[new Date().getDay()],
        exerciseCount: exerciseList,
        m_coin: exerciseList * 2,
        m_exp: exerciseList * 10,
        m_trophies: exerciseList * 5,
        m_streak: 1,
        // m_level: calculateUserLevel(exerciseList * 10),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedExerciseIndex]);

  React.useEffect(() => {
    if (mutationOngoing) {
      dispatch(startSpinner());
    } else {
      if (mutationIdle) {
        dispatch(stopSpinner());
      }

      if (mutationSuccess) {
        Toast.show({
          type: 'success',
          text1: 'Hooray !',
          text2: "You've completed your exercise today !",
        });
        // HANDLE UPDATE COMPLETE
        dispatch(
          setDidCompleteTodaysExercise({
            didCompleteTodaysExercise: true,
            todaysDay: W_DAYS[new Date().getDay()],
          }),
        );
        dispatch(stopSpinner());
      }
      if (mutationError) {
        Toast.show({
          type: 'error',
          text1: 'Ooops !',
          text2: 'Something went wrong !',
        });

        dispatch(stopSpinner());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationStatus]);

  // FOR TESTING PURPOSES
  // React.useEffect(() => {
  //   dispatch(invalidateExerciseSlice());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!mappedData) {
    return <FallbackUI />;
  }

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: MThemeColors.defaultScreenBG,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* TOP OVERFLOWING SECTION */}
      <View
        className="flex flex-col justify-center items-center h-80"
        style={{
          backgroundColor: MThemeColors.black,
          // paddingTop: statusBarHeight,
        }}>
        <View className="pb-6 justify-center items-center">
          {haveExerciseToday ? (
            <>
              <Text className="text-2xl text-white font-semibold">
                Todays Exercise
              </Text>
              <Text className="text-lg text-white font-bold capitalize">
                {todaysExercise?.targetMusclegroup
                  .split(',')
                  .filter(Boolean)
                  .join(' ')}
              </Text>
            </>
          ) : (
            <Text className="text-2xl text-white font-semibold text-center px-10">
              Rest is essential for a body growth as well
            </Text>
          )}
        </View>
        <View
          className="bg-white shadow-md p-8 rounded-2xl h-72 flex flex-col justify-center items-center absolute -bottom-48"
          style={{
            width: MSpacing.screenWidth - 40 * 2,
          }}>
          {haveExerciseToday ? (
            <>
              <Text className="text-base leading-5 text-center font-medium">
                {tallyLastCompletedExerciseDay()
                  ? 'You have completed todays exercise'
                  : 'Start your timer and stop it after you complete your exercise'}
              </Text>
              <Image
                className="w-24 h-24 my-6"
                source={require('@/assets/icons/start-exercise.png')}
              />

              <View className="flex flex-row mt-5">
                <Button
                  mode="contained"
                  className="self-center"
                  loading={startExercise}
                  disabled={shouldDisable(startExercise)}
                  onPress={handleExerciseStart}>
                  <Text>Start Timer</Text>
                </Button>

                <IconButton
                  icon="pause"
                  disabled={shouldDisable(!startExercise)}
                  animated
                  onPress={handleExerciseStop}
                  iconColor={MThemeColors.black}
                  // style={{
                  //   backgroundColor: MThemeColors.white,
                  // }}
                />
              </View>
            </>
          ) : (
            <View className="flex flex-col justify-center items-center">
              <Text className="text-lg text-center font-bold">
                You have no exercise today.
              </Text>
              <Text className="text-sm text-center font-normal">
                Enjoy your rest day champ !
              </Text>
              <Image
                className="w-24 h-24 my-6"
                source={require('@/assets/icons/tired.png')}
              />
            </View>
          )}
        </View>
      </View>

      {/* BOTTOM SCROLL SECTION */}
      {haveExerciseToday && (
        <ScrollView
          className="mt-56"
          contentContainerStyle={{
            paddingHorizontal: MSpacing.screenPadding,
            paddingBottom:
              MSpacing.bottomTabBar.height + MSpacing.bottomTabBar.bottomOffset,
          }}>
          {todaysExercise?.exercises.map((item, index) => {
            return (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 flex flex-row justify-between items-center my-4"
                style={customizeExerciseStat(index)}>
                <Image
                  className="w-16 h-16 rounded-full"
                  source={{uri: 'https://picsum.photos/200/200'}}
                />
                <View className="flex flex-col">
                  <Text className="text-base font-bold">{item.name}</Text>
                  <View className="flex flex-row mb-2">
                    <Text className="text-sm leading-5 text-center font-medium">
                      Sets: {item.sets}
                    </Text>
                    <Text className="mx-2">::</Text>
                    <Text className="text-xs leading-5 text-center font-medium">
                      Reps: {item.reps}
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
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
