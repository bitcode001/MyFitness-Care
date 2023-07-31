import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './login.screen';
import RegisterScreen from './register.screen';
import {MThemeColors} from '@/constant/colors';

export type OnboardingStackParamList = {
  Login: undefined;
  Register: undefined;
};

const NativeStack = createStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <NativeStack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: MThemeColors.defaultScreenBG,
        },
      }}>
      <NativeStack.Screen name="Login" component={LoginScreen} />
      <NativeStack.Screen name="Register" component={RegisterScreen} />
    </NativeStack.Navigator>
  );
}
