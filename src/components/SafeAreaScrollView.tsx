import React, {PropsWithChildren} from 'react';
import SafeArea from './SafeArea';
import {ScrollView} from 'react-native';
import {MSpacing} from '@/constant/measurements';

interface SaeAreaScrollViewInterface extends PropsWithChildren {
  noHorizontalPadding?: boolean;
}

export default function SafeAreaScrollView({
  children,
  noHorizontalPadding = false,
}: SaeAreaScrollViewInterface): JSX.Element {
  const backgroundStyle = 'bg-transparent dark:bg-slate-900';
  return (
    <SafeArea>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingHorizontal: noHorizontalPadding ? 0 : MSpacing.screenPadding,
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
