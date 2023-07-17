import React from 'react';

import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
export const queryClient = new QueryClient();

import MainScreen from '@/screens/main.screen';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <MainScreen />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
