import AnimatedProgressPie from '@/components/AnimatedProgressPie';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import UserIntro from '@/components/UserIntro';
import React from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import useFirebase from '@/hooks/firebase.auth.hook';

// Data fetching utilities
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  IUserExerciseRecords,
  useGetUserExerciseRecords,
} from '@/apis/exercise.db';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import FallbackUI from '@/components/Fallback/fallback.ui';
import {EXP_BAR} from '@/constant/utils';
import {ProfileStackParamList} from './profile.screen';
import {StackNavigationProp} from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'ProfileMain'
>;

type ProfileInterface = {
  navigation: ProfileScreenNavigationProp;
  // route: LoginScreenRouteProp;
};

const LevelComponent = ({currentLevel}: {currentLevel: number}) => {
  return (
    <View className="bg-green-500 px-3 py-1 ml-4 rounded-full">
      <Text className="text-white font-semibold text-sm">
        Level {currentLevel}
      </Text>
    </View>
  );
};

const infoSectionStyle = {
  rowGap: {
    rowGap: 15,
  },
};

export default function ProfileMain({
  navigation,
}: ProfileInterface): JSX.Element {
  const {signOut} = useFirebase();

  const handleLogOut = async () => {
    console.log('Log out');
    await signOut();
  };

  // AUTH STATE
  // Data fetching logic
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {data, isLoading, isFetching} = useGetUserExerciseRecords(
    authState.frUser?.uid ?? '',
  );

  const {mappedData} = useExtractDocument<IUserExerciseRecords>(data);

  const myExp = mappedData?.economy.m_exp ?? 0;
  const totalExp = (() => {
    let total = 0;
    if (mappedData?.economy) {
      total = mappedData.economy.m_level * EXP_BAR;
    }
    return total;
  })();
  const progressBar = Number((myExp / totalExp).toFixed(2));

  React.useEffect(() => {
    // console.log('mapped Data', mappedData);
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      dispatch(stopSpinner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  if (!mappedData) {
    return <FallbackUI />;
  }

  return (
    <SafeAreaScrollView>
      <UserIntro
        profileLabel={'Hey there,'}
        levelComponent={
          <LevelComponent currentLevel={mappedData.economy.m_level} />
        }
      />

      {/* USER INFO SECTION */}
      <View className="flex flex-col mt-10" style={infoSectionStyle.rowGap}>
        <TouchableOpacity className="bg-white px-4 py-3 rounded-2xl flex flex-row items-center">
          <Image
            className="h-6 w-6"
            source={require('@/assets/icons/user.png')}
          />
          <Text className="ml-6 text-lg font-light">Profile Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-4 py-3 rounded-2xl flex flex-row items-center">
          <Image
            className="h-6 w-6"
            source={require('@/assets/icons/achievement.png')}
          />
          <Text className="ml-6 text-lg font-light">Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyExerciseList')}
          className="bg-white px-4 py-3 rounded-2xl flex flex-row items-center">
          <Image
            className="h-6 w-6"
            source={require('@/assets/icons/exercise.png')}
          />
          <Text className="ml-6 text-lg font-light">My Routine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white px-4 py-3 rounded-2xl flex flex-row items-center"
          onPress={handleLogOut}>
          <Image
            className="h-6 w-6"
            source={require('@/assets/icons/shutdown.png')}
          />
          <Text className="ml-6 text-lg font-light">Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Challenges Section */}
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-normal mt-10 mb-5">Challenges</Text>
        <Text className="text-base font-normal text-green-500 mt-10 mb-5 ml-5">
          Coming soon
        </Text>
      </View>
      <ScrollView horizontal>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            className="flex flex-row justify-center items-center p-3 py-4 bg-white rounded-xl mr-4">
            <Image
              className="w-28 h-24 rounded-lg"
              source={{
                uri: 'https://picsum.photos/300/300',
              }}
            />
            <View className="px-6 py-2">
              <Text className="text-base leading-5 mb-2 font-semibold">
                Legs Workout
              </Text>
              <Text>Complete 2 of these</Text>
              <View className="flex flex-row gap-2 mb-2 mt-1">
                <View className="bg-green-500 px-3 py-1 rounded-full">
                  <Text className="text-xs text-white">Fitcoins: 30</Text>
                </View>
                <View className="bg-sky-500 px-3 py-1 rounded-full">
                  <Text className="text-xs text-white">Exp: 30</Text>
                </View>
              </View>
            </View>
            <Image
              className="w-8 h-8 rounded-full absolute right-4 bottom-2"
              source={require('@/assets/icons/star.png')}
            />
          </View>
        ))}
      </ScrollView>

      {/* Economy Section */}
      <Text className="text-2xl font-normal mt-10 mb-5">Economy</Text>
      <View className="flex flex-row gap-4">
        <TouchableOpacity className="bg-white flex-1 flex-col justify-center items-center px-2 py-6 rounded-xl">
          <AnimatedProgressPie
            percentage={progressBar}
            strokeWidth={10}
            label={myExp}
          />
          <Text className="text-base font-medium mt-2">For Next Level</Text>
          <Text className="text-2xl font-normal">
            {totalExp - mappedData.economy.m_exp} exp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white flex-1 flex-col justify-center items-center px-2 py-6 rounded-xl">
          <Image
            className="w-20 h-20"
            source={require('@/assets/icons/money.png')}
          />
          <Text className="text-base font-medium mt-2">
            Your fitcoin balance
          </Text>
          <Text className="text-2xl font-normal">
            {mappedData.economy.m_coin ?? 0}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaScrollView>
  );
}
