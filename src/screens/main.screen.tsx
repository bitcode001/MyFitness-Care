import React from 'react';

import InternalScreen from './internal';
import OnboardingStack from './onboarding';
import {MyToast} from '@/components/MyToast';
import GlobalSpinner from '@/components/GlobalSpinner';
import auth from '@react-native-firebase/auth';
import useFirebase from '@/hooks/firebase.auth.hook';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

export default function MainScreen() {
  const {handleAuthStateChanged} = useFirebase();
  const authState = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);

    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderApp = () => {
    if (authState.isAuthenticated) {
      return <InternalScreen />;
    }
    return <OnboardingStack />;
  };

  return (
    <>
      {renderApp()}
      <MyToast />
      <GlobalSpinner />
    </>
  );
}
