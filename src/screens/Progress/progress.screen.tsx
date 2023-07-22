import React from 'react';
import {View, Text} from 'react-native';

import SafeAreaScrollView from '@/components/SafeAreaScrollView';

export default function Progress(): JSX.Element {
  return (
    <SafeAreaScrollView>
      <View>
        <Text>Progress</Text>
      </View>
    </SafeAreaScrollView>
  );
}
