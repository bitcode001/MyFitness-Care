import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import UserIntro from '@/components/UserIntro';
import React from 'react';
import {Text} from 'react-native';

export default function PerformanceScreen(): JSX.Element {
  return (
    <SafeAreaScrollView>
      <UserIntro profileLabel="Progress Summary" />
      <Text>Performance Screen</Text>
    </SafeAreaScrollView>
  );
}
