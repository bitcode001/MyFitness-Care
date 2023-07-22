import React, {PropsWithChildren} from 'react';
import SafeArea from './SafeArea';
import {ScrollView} from 'react-native';
import {MSpacing} from '@/constant/measurements';

export default function SafeAreaScrollView({
  children,
}: PropsWithChildren): JSX.Element {
  const backgroundStyle = 'bg-transparent dark:bg-slate-900';
  return (
    <SafeArea>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: MSpacing.screenPadding,
          paddingTop: MSpacing.screenPadding / 2,
          paddingBottom:
            MSpacing.bottomTabBar.height + MSpacing.bottomTabBar.bottomOffset,
        }}
        className={backgroundStyle}>
        {children}
      </ScrollView>
    </SafeArea>
  );
}
