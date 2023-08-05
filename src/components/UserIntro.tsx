import {RootState} from '@/redux/store';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

interface UserIntroInterface {
  profileLabel?: string;
  levelComponent?: JSX.Element;
}

export default function UserIntro({
  profileLabel = 'Todays summary !',
  levelComponent,
}: UserIntroInterface) {
  const authstat = useSelector((state: RootState) => state.auth);
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="py-4 flex-1">
        <Text className="text-3xl font-bold">
          {authstat.frUser?.displayName ?? authstat.frUser?.email}
        </Text>

        <View className="flex flex-row items-center flex-wrap mt-2">
          <Text className="text-xl font-normal pt-1 text-gray-600">
            {profileLabel}
          </Text>

          {levelComponent && levelComponent}
        </View>
      </View>
      <Image
        className="w-20 h-20 rounded-full"
        source={{
          uri:
            authstat.frUser?.photoURL ?? 'https://picsum.photos/id/29/200/200',
        }}
      />
    </View>
  );
}
