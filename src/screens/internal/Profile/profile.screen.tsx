import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileMain from './profile.main';
import MyExerciseList from './my.exercise.list';
import EditExerciseList from './edit.exercise.list';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  MyExerciseList: undefined;
  EditExerciseList: {
    data: {
      start_date: string;
      start_time: {
        hours: string;
        minutes: string;
      };
    };
  };
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export default function ProfileScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileMain} />
      <ProfileStack.Screen name="MyExerciseList" component={MyExerciseList} />
      <ProfileStack.Screen
        name="EditExerciseList"
        component={EditExerciseList}
      />
    </ProfileStack.Navigator>
  );
}
