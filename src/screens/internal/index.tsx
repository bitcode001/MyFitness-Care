/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Suspense} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeScreen from '@/screens/internal/Home/home.screen';
import ProfileScreen from '@/screens/internal/Profile/profile.screen';
import PerformanceScreen from '@/screens/internal/Performance/performance.screen';
import ExerciseScreen from './Exercise/exercise.screen';

import {MThemeColors} from '@/constant/colors';
import {MSpacing} from '@/constant/measurements';

import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import RoutineSetupScreen from './Routine/routine.setup.screen';
import {
  IUserExerciseDetails,
  useGetUserExerciseDetails,
} from '@/apis/exercise.db';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import {
  useExtractDocument,
  useExtractQuery,
} from '@/hooks/useExtractFirebaseData';
import FallbackUI from '@/components/Fallback/fallback.ui';
import GymShop from './gym-shop/GymShop';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

const GenIcon = (focused: boolean, name: string) => (
  <View className="d-flex flex-col h-full flex-1 justify-center">
    {name === 'shop' ? (
      <EntypoIcon
        name={name}
        size={28}
        color={focused ? '#e32f45' : '#748c94'}
      />
    ) : (
      <MaterialIcon
        name={name}
        size={30}
        color={focused ? '#e32f45' : '#748c94'}
      />
    )}
  </View>
);

const getWidth = () => {
  let width = Dimensions.get('window').width;

  width = width - 40;

  return width / 5;
};

export default function InternalBottomStack(): JSX.Element {
  const tabOffsetValue = React.useRef(new Animated.Value(0)).current;

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {
    data: userData,
    isLoading,
    isFetching,
    isFetched,
    refetch: refetchUserExerciseDetails,
  } = useGetUserExerciseDetails(authState.frUser?.uid! ?? '');
  const {mappedData} = useExtractDocument<IUserExerciseDetails>(userData);

  const [exStat, setExStat] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(stopSpinner());
    } else {
      dispatch(startSpinner());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading]);

  React.useEffect(() => {
    // If child component "RoutineSetupScreen" is done with the update it will update the state to true
    if (exStat === true) {
      refetchUserExerciseDetails();
      setExStat(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exStat]);

  if (isLoading && isFetching) {
    return <FallbackUI />;
  }

  if (isFetched && mappedData && Object.keys(mappedData).length === 0) {
    return <RoutineSetupScreen handleUpdateComplete={setExStat} />;
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        sceneContainerStyle={{
          backgroundColor: MThemeColors.defaultScreenBG,
        }}
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: MSpacing.bottomTabBar.bottomOffset,
            left: MSpacing.bottomTabBar.sideSpacing,
            right: MSpacing.bottomTabBar.sideSpacing,
            height: MSpacing.bottomTabBar.height,
            borderRadius: MSpacing.bottomTabBar.borderRadius,
            ...styles.shadow,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'home'),
            tabBarItemStyle: {
              height: MSpacing.bottomTabBar.height,
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Performance"
          component={PerformanceScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'poll'),
            tabBarItemStyle: {
              height: MSpacing.bottomTabBar.height,
            },
            // tabBarStyle: {
            //   backgroundColor: 'purple',
            // },
            // tabBarIconStyle: {
            //   backgroundColor: 'pink',
            // },
            // tabBarBadgeStyle: {
            //   backgroundColor: 'green',
            // },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'dumbbell'),
            tabBarItemStyle: {
              height: MSpacing.bottomTabBar.height,
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Shop"
          component={GymShop}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'shop'),
            tabBarItemStyle: {
              height: MSpacing.bottomTabBar.height,
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'account'),
            tabBarItemStyle: {
              height: MSpacing.bottomTabBar.height,
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          height: 2,
          width: getWidth() - 40,
          backgroundColor: 'red',
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
        }}
      />
    </>
  );
}
