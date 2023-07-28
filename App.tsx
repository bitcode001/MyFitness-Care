import 'react-native-gesture-handler';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
export const queryClient = new QueryClient();

import {NavigationContainer} from '@react-navigation/native';
import MainScreen from '@/screens/main.screen';

import {enGB, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: inputFormat => `Date format must be ${inputFormat}`,
  mustBeHigherThan: date => `Must be later then ${date}`,
  mustBeLowerThan: date => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
});

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistStore(store)}>
            <NavigationContainer>
              <MainScreen />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
