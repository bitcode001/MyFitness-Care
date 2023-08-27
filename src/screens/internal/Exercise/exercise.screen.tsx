import React, {useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'react-native-paper';

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
import AnimatedProgressPie from '@/components/AnimatedProgressPie';

export default function ExerciseScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
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

  // Animated timer
  const [animatedSeconds, setAnimatedSeconds] = useState(
    () => todaysExercise?.timeLimit ?? 0,
    // () => 3 ?? 0,
  );
  React.useEffect(() => {
    if (!startExercise) {
      return;
    }

    if (animatedSeconds <= 0) {
      setAnimatedSeconds(_ => todaysExercise?.timeLimit ?? 0);
      // setAnimatedSeconds(_ => 3 ?? 0);
      handleExerciseStop();
    }
    const timeout = setTimeout(() => {
      // console.log('SEC: ', animatedSeconds);
      setAnimatedSeconds(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startExercise, animatedSeconds]);

  // Render Exercise Banner
  const renderExerciseBanner = () => {
    if (
      Number(completedExerciseIndex) <
      (todaysExercise?.exercises.length
        ? todaysExercise.exercises.length - 1
        : 0)
    ) {
      return (
        <>
          <Text className="text-base font-semibold capitalize text-center mb-4">
            Your next exercise
          </Text>
          <View className="flex flex-col justify-center items-center">
            <Image
              className="w-40 h-40 rounded-full"
              source={{
                uri:
                  todaysExercise?.exercises[
                    completedExerciseIndex !== null
                      ? completedExerciseIndex + 1
                      : 0
                  ].gifUrl ?? '',
              }}
            />
            <View className="flex flex-col items-center mt-4">
              <Text className="text-base font-bold capitalize">
                {
                  todaysExercise?.exercises[
                    completedExerciseIndex !== null
                      ? completedExerciseIndex + 1
                      : 0
                  ].name
                }
              </Text>
              <View className="flex flex-row my-2">
                <Text className="text-sm leading-5 text-center font-medium mr-4">
                  Target:{' '}
                  {
                    todaysExercise?.exercises[
                      completedExerciseIndex !== null
                        ? completedExerciseIndex + 1
                        : 0
                    ].target
                  }
                </Text>
                <Text className="text-xs leading-5 text-center font-medium">
                  Equipment:{' '}
                  {
                    todaysExercise?.exercises[
                      completedExerciseIndex !== null
                        ? completedExerciseIndex + 1
                        : 0
                    ].equipment
                  }
                </Text>
              </View>
            </View>
          </View>
        </>
      );
    }
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
        className="flex flex-col justify-center items-center"
        style={{
          backgroundColor: MThemeColors.black,
          paddingTop: statusBarHeight,
        }}>
        <View
          className="bg-white shadow-md p-4 my-8 rounded-2xl flex flex-col justify-center items-center"
          style={{
            width: MSpacing.screenWidth - 40 * 2,
          }}>
          {haveExerciseToday ? (
            <>
              <View className="flex w-full flex-col bg-blue-50 py-4 rounded-xl">
                {tallyLastCompletedExerciseDay() ? (
                  <>
                    <Text className="text-base leading-5 text-center font-medium">
                      {tallyLastCompletedExerciseDay()
                        ? 'You have completed todays exercise'
                        : 'Start your timer and stop it after you complete your exercise'}
                    </Text>

                    <Text className="text-center mt-1">Take some rest</Text>
                    <Image
                      className="w-24 h-24 mt-6 self-center"
                      source={require('@/assets/icons/athlete.png')}
                    />
                  </>
                ) : (
                  renderExerciseBanner()
                )}
              </View>

              {!tallyLastCompletedExerciseDay() && (
                <View className="flex flex-row justify-center items-center mt-4">
                  <AnimatedProgressPie
                    percentage={
                      todaysExercise?.timeLimit
                        ? Number(
                            (
                              animatedSeconds / todaysExercise.timeLimit
                            ).toFixed(2),
                          )
                        : 0
                    }
                    circleLength={300}
                    strokeWidth={15}
                    label={animatedSeconds ?? 0}
                    customColorCode="rgb(0,168,229)"
                  />
                  <Button
                    mode="contained"
                    className="self-center ml-4"
                    // loading={startExercise}
                    disabled={shouldDisable(startExercise)}
                    onPress={handleExerciseStart}>
                    <Text>Start Timer</Text>
                  </Button>

                  {/* <IconButton
                  icon="pause"
                  disabled={shouldDisable(!startExercise)}
                  animated
                  onPress={handleExerciseStop}
                  iconColor={MThemeColors.black}
                  // style={{
                  //   backgroundColor: MThemeColors.white,
                  // }}
                /> */}
                </View>
              )}
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
                source={require('@/assets/icons/achievement.png')}
              />

              <Text className="text-sm font-semibold text-center px-10">
                Rest is essential for a body growth as well
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* BOTTOM SCROLL SECTION */}
      {haveExerciseToday && (
        <ScrollView
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
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
