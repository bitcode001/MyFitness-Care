import React from 'react';
import {View, Text, Image} from 'react-native';

interface UserIntroInterface {
  profileLabel?: string;
  levelComponent?: JSX.Element;
}

export default function UserIntro({
  profileLabel = 'Todays summary !',
  levelComponent,
}: UserIntroInterface) {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="py-4">
        <View className="flex flex-row items-center">
          <Text className="text-3xl font-bold">John Doe</Text>
          {levelComponent && levelComponent}
        </View>
        <Text className="text-xl font-normal pt-1 text-gray-600">
          {profileLabel}
        </Text>
      </View>
      <Image
        className="w-20 h-20 rounded-full"
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        }}
      />
    </View>
  );
}
