/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      {/* <View className='mt-8 px-6'> */}
      <Text
        className="text-2xl text-black dark:text-white font-bold"
        // style={[
        //   styles.sectionTitle,
        //   {
        //     color: isDarkMode ? Colors.white : Colors.black,
        //   },
        // ]}
      >
        {title}
      </Text>
      <Text
        className="mt-2 text-lg text-gray-700 dark:text-white"
        // style={[
        //   styles.sectionDescription,
        //   {
        //     color: isDarkMode ? Colors.light : Colors.dark,
        //   },
        // ]}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // const backgroundStyle = "bg-neutral-300 dark:bg-slate-900"

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
