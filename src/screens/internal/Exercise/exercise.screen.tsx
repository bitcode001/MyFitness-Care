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

export default function ExerciseScreen(): JSX.Element {
  // const insets = useSafeAreaInsets();
  // const statusBarHeight = insets.top;
  const isDarkMode = useColorScheme() === 'dark';
  const [startExercise, setStartExercise] = React.useState(false);

  const exerciseList = [1, 2, 3, 4, 5];
  const [completedExerciseIndex, setCompletedExerciseIndex] = React.useState<
    number | null
  >(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : MThemeColors.white,
  };

  const shouldDisable = (dependent: boolean) => {
    if (
      completedExerciseIndex === null ||
      completedExerciseIndex < exerciseList.length - 1
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
    return {
      opacity:
        completedExerciseIndex !== null && index <= completedExerciseIndex
          ? 0.5
          : 1,
    };
  };

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
          <Text className="text-2xl text-white font-semibold">
            Todays Exercise
          </Text>
          <Text className="text-lg text-white font-bold">Leg Day</Text>
        </View>
        <View
          className="bg-white shadow-md p-8 rounded-2xl h-72 flex flex-col justify-center items-center absolute -bottom-48"
          style={{
            width: MSpacing.screenWidth - 40 * 2,
          }}>
          <Text className="text-base leading-5 text-center font-medium">
            Start your timer and stop it after you complete your exercise
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
        </View>
      </View>

      {/* BOTTOM SCROLL SECTION */}
      <ScrollView
        className="mt-56"
        contentContainerStyle={{
          paddingHorizontal: MSpacing.screenPadding,
          paddingBottom:
            MSpacing.bottomTabBar.height + MSpacing.bottomTabBar.bottomOffset,
        }}>
        {exerciseList.map((item, index) => {
          return (
            <View
              key={index}
              className="bg-white rounded-2xl p-4 flex flex-row justify-between items-center my-4"
              style={customizeExerciseStat(index)}>
              <Image
                className="w-16 h-16 rounded-full"
                source={{uri: 'https://picsum.photos/200/200'}}
              />
              <View className="flex flex-1 flex-row justify-between items-center ml-4">
                <View className="flex flex-col">
                  <Text className="text-base font-bold">Chest Fly</Text>
                  <View className="flex flex-row">
                    <Text className="text-sm leading-5 text-center font-medium">
                      Sets: 5
                    </Text>
                    <Text className="mx-2">::</Text>
                    <Text className="text-xs leading-5 text-center font-medium">
                      Reps: 5
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col">
                  <View
                    className="rounded-full mb-2"
                    style={{
                      backgroundColor: MThemeColors.skyBlue,
                    }}>
                    <Text className="text-white text-xs px-2 py-1">+10exp</Text>
                  </View>
                  <View
                    className="rounded-full"
                    style={{
                      backgroundColor: MThemeColors.successGreen,
                    }}>
                    <Text className="text-white text-xs px-2 py-1">
                      +5 coin
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
