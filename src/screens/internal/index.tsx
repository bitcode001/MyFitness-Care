/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
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
import RoutineSetupScreen from './Routine/routine.setup.screen';

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
    <MaterialIcon
      name={name}
      size={30}
      color={focused ? '#e32f45' : '#748c94'}
    />
  </View>
);

const getWidth = () => {
  let width = Dimensions.get('window').width;

  width = width - 40;

  return width / 4;
};

export default function InternalBottomStack(): JSX.Element {
  const tabOffsetValue = React.useRef(new Animated.Value(0)).current;
  return <RoutineSetupScreen />;
  // return (
  //   <>
  //     <Tab.Navigator
  //       initialRouteName="Home"
  //       sceneContainerStyle={{
  //         backgroundColor: MThemeColors.defaultScreenBG,
  //       }}
  //       screenOptions={{
  //         tabBarShowLabel: false,
  //         headerShown: false,
  //         tabBarStyle: {
  //           position: 'absolute',
  //           bottom: MSpacing.bottomTabBar.bottomOffset,
  //           left: MSpacing.bottomTabBar.sideSpacing,
  //           right: MSpacing.bottomTabBar.sideSpacing,
  //           height: MSpacing.bottomTabBar.height,
  //           borderRadius: MSpacing.bottomTabBar.borderRadius,
  //           ...styles.shadow,
  //         },
  //       }}>
  //       <Tab.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{
  //           tabBarIcon: ({focused}) => GenIcon(focused, 'home'),
  //           tabBarItemStyle: {
  //             height: MSpacing.bottomTabBar.height,
  //           },
  //         }}
  //         listeners={({navigation, route}) => ({
  //           tabPress: e => {
  //             Animated.spring(tabOffsetValue, {
  //               toValue: 0,
  //               useNativeDriver: true,
  //             }).start();
  //           },
  //         })}
  //       />
  //       <Tab.Screen
  //         name="Performance"
  //         component={PerformanceScreen}
  //         options={{
  //           tabBarIcon: ({focused}) => GenIcon(focused, 'poll'),
  //           tabBarItemStyle: {
  //             height: MSpacing.bottomTabBar.height,
  //           },
  //           // tabBarStyle: {
  //           //   backgroundColor: 'purple',
  //           // },
  //           // tabBarIconStyle: {
  //           //   backgroundColor: 'pink',
  //           // },
  //           // tabBarBadgeStyle: {
  //           //   backgroundColor: 'green',
  //           // },
  //         }}
  //         listeners={({navigation, route}) => ({
  //           tabPress: e => {
  //             Animated.spring(tabOffsetValue, {
  //               toValue: getWidth(),
  //               useNativeDriver: true,
  //             }).start();
  //           },
  //         })}
  //       />
  //       <Tab.Screen
  //         name="Exercise"
  //         component={ExerciseScreen}
  //         options={{
  //           tabBarIcon: ({focused}) => GenIcon(focused, 'dumbbell'),
  //           tabBarItemStyle: {
  //             height: MSpacing.bottomTabBar.height,
  //           },
  //         }}
  //         listeners={({navigation, route}) => ({
  //           tabPress: e => {
  //             Animated.spring(tabOffsetValue, {
  //               toValue: getWidth() * 2,
  //               useNativeDriver: true,
  //             }).start();
  //           },
  //         })}
  //       />
  //       <Tab.Screen
  //         name="Profile"
  //         component={ProfileScreen}
  //         options={{
  //           tabBarIcon: ({focused}) => GenIcon(focused, 'account'),
  //           tabBarItemStyle: {
  //             height: MSpacing.bottomTabBar.height,
  //           },
  //         }}
  //         listeners={({navigation, route}) => ({
  //           tabPress: e => {
  //             Animated.spring(tabOffsetValue, {
  //               toValue: getWidth() * 3,
  //               useNativeDriver: true,
  //             }).start();
  //           },
  //         })}
  //       />
  //     </Tab.Navigator>
  //     <Animated.View
  //       // eslint-disable-next-line react-native/no-inline-styles
  //       style={{
  //         position: 'absolute',
  //         bottom: 40,
  //         left: 40,
  //         height: 2,
  //         width: getWidth() - 40,
  //         backgroundColor: 'red',
  //         transform: [
  //           {
  //             translateX: tabOffsetValue,
  //           },
  //         ],
  //       }}
  //     />
  //   </>
  // );
}
