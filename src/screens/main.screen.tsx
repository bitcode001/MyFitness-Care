import React from 'react';

import InternalScreen from './internal';
import OnboardingStack from './onboarding';
import {MyToast} from '@/components/MyToast';
import GlobalLoadingView from '@/components/GlobalLoadingView';
import useFirebase from '@/hooks/firebase.auth.hook';

export default function MainScreen() {
  const {isSignedIn} = useFirebase();
  const [signInStat, setSignInStat] = React.useState<boolean | null>(null);
  const {LoadingView, setIsLoading} = GlobalLoadingView();

  React.useEffect(() => {
    setIsLoading(true);
    isSignedIn()
      .then(res => {
        console.log('res', res);
        if (typeof res === 'boolean') {
          setSignInStat(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [isSignedIn, setIsLoading]);

  const renderApp = () => {
    if (signInStat === null) {
      return <LoadingView />;
    }
    if (signInStat) {
      return <InternalScreen />;
    }
    return <OnboardingStack />;
  };

  return (
    <>
      {renderApp()}
      <MyToast />
    </>
  );
}
