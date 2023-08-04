import ChartOne from '@/components/ChartOne';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import UserIntro from '@/components/UserIntro';
import {MThemeColors} from '@/constant/colors';
import {MSpacing} from '@/constant/measurements';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useGetUserExerciseRecords} from '@/apis/exercise.db';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';

const perks = [
  {
    title: 'Trophies',
    count: 20,
    color: '#FFDA2D',
    icon: require('@/assets/icons/award.png'),
  },
  {
    title: 'Streak',
    count: 5,
    color: '#FF641A',
    icon: require('@/assets/icons/fire.png'),
  },
  {
    title: 'Level',
    count: 20,
    color: '#B7E445',
    icon: require('@/assets/icons/level-up.png'),
  },
  {
    title: 'Exercises',
    count: 328,
    color: '#000000',
    icon: require('@/assets/icons/athlete.png'),
  },
];

const adjustedGap = 20;

const SummaryGrid = () => {
  return (
    <View
      className="flex flex-wrap flex-row justify-between mt-10"
      style={{gap: adjustedGap}}>
      {perks.map((perk, index) => (
        <View
          key={index}
          style={{
            width:
              (MSpacing.screenWidth -
                MSpacing.screenPadding * 2 -
                adjustedGap) /
              2,
            backgroundColor: perk.color,
          }}
          className="rounded-xl">
          <View className="flex flex-row justify-between items-center bg-white rounded-xl mr-1 p-4 flex-grow">
            {perk.icon && <Image className="h-8 w-8" source={perk.icon} />}
            <View className="flex flex-col justify-between flex-1 ml-6">
              <Text className="text-xs font-medium  text-black">
                {perk.title}
              </Text>
              <Text className="text-2xl font-semibold text-black">
                {perk.count}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function PerformanceScreen(): JSX.Element {
  const [selected, setSelected] = useState('week');
  const options = ['week', 'month', 'year'];
  const renderOptions = () => {
    return options.map(option => (
      <TouchableOpacity
        key={option}
        className="flex-1 rounded-lg"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor:
            selected === option ? MThemeColors.white : 'transparent',
        }}
        onPress={() => {
          setSelected(option);
          console.log('selected', option);
        }}>
        <Text className="text-center capitalize p-2">{option}</Text>
      </TouchableOpacity>
    ));
  };
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {data, isLoading, isFetching} = useGetUserExerciseRecords(
    authState.frUser?.uid ?? '',
  );

  const {mappedData} = useExtractDocument(data);

  React.useEffect(() => {
    console.log('mapped Data', mappedData);
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      dispatch(stopSpinner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  return (
    <SafeAreaScrollView>
      <UserIntro profileLabel="Progress Summary" />

      {/* MENU SELECTION SECTION */}
      <View
        className="p-2 flex flex-row justify-between items-center mt-10 rounded-lg"
        style={{backgroundColor: MThemeColors.tabBg}}>
        {renderOptions()}
      </View>

      {/* CHART SECTION */}
      <ChartOne />

      {/* Experience display section */}
      <Text className="text-2xl font-normal mt-16 mb-5">Experience Points</Text>
      <ProgressBar
        progress={0.5}
        color={MThemeColors.black}
        className="h-3 rounded-lg"
      />
      <Text className="text-xs text-black mt-2">1300/1500 exp</Text>

      {/* Summary Grid Section */}
      <SummaryGrid />
    </SafeAreaScrollView>
  );
}
