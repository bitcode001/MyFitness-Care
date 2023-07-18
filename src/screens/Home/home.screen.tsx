import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';

import auth from '@react-native-firebase/auth';

import useFirebase from '@/hooks/firebase.auth.hook';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

// import SafeArea from '@components/SafeArea';
import SafeArea from '@/components/SafeArea';
import {MyToast} from '@/components/MyToast';
import {Button} from 'react-native-paper';
import {useGetAllExerciseDetails} from '@/apis/exercise.db';
import {useExtractQuery} from '@/hooks/useExtractFirebaseData';
import Toast from 'react-native-toast-message';
import GlobalLoadingView from '@/components/GlobalLoadingView';

export default function HomeScreen(): JSX.Element {
  const authState = useSelector((state: RootState) => state.auth);
  const {getCurrentUser, getTokens, signIn, isSignedIn, signOut} =
    useFirebase();

  const {handleAuthStateChanged} = useFirebase();

  const {data, isLoading, isError, error, refetch, fetchStatus} =
    useGetAllExerciseDetails();
  const {mappedData} = useExtractQuery(data);
  const {LoadingView, setIsLoading} = GlobalLoadingView();

  if (!isLoading && !isError) {
    console.log('Extracted Data: ', mappedData);
  }

  useEffect(() => {
    if (!isLoading && error) {
      Toast.show({
        type: 'error',
        text1: 'ERROR ',
        text2: `${error.message}`,
      });
    }
    if (isLoading && fetchStatus === 'fetching') {
      console.log('Should show spinner!');
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [error, isLoading, fetchStatus, setIsLoading]);

  const backgroundStyle = 'bg-transparent dark:bg-slate-900';

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingView />
      <SafeArea>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className={backgroundStyle}>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Press me
          </Button>
          {/* {initializing && <Text>Initializing Firebase...</Text>} */}
          {authState.isAuthenticated ? (
            <>
              <Button onPress={() => getTokens()}>Get Tokens</Button>
              <Button onPress={() => isSignedIn()}>Is Signed In?</Button>
              <Button onPress={() => getCurrentUser()}>Get Current User</Button>
              <Button onPress={() => refetch()}>Fetch Exercise Data</Button>
              <Button onPress={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button
                icon="google"
                mode="contained-tonal"
                onPress={() => signIn()}>
                Google SignIn
              </Button>
              <Button onPress={() => isSignedIn()}>Is Signed In?</Button>
              <Button onPress={() => getCurrentUser()}>Get Current User</Button>
              <Button onPress={() => refetch()}>Fetch Exercise Data</Button>
              <Button onPress={() => getTokens()}>Get Tokens</Button>
              <Text>Sign in Status: Not Signed In</Text>
            </>
          )}

          <Button
            onPress={() => {
              setIsLoading(true);
              Toast.hide();
              Toast.show({
                type: 'error',
                text1: 'Error',
                autoHide: true,
                text2:
                  'This is some something 👋 [Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.]',
              });
            }}>
            Test Error Toast
          </Button>

          <Button
            onPress={() =>
              Toast.show({
                type: 'info',
                text1: 'Info',
                text2:
                  'This is some something 👋 [Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.]',
              })
            }>
            Test Info Toast
          </Button>

          <Button
            onPress={() =>
              Toast.show({
                type: 'warning',
                text1: 'Warning',
                text2:
                  'This is some something 👋 [Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.]',
              })
            }>
            Test Warning Toast
          </Button>

          <Button
            onPress={() =>
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2:
                  'This is some something 👋 [Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.]',
              })
            }>
            Test Success Toast
          </Button>
          <Text>REDUX STATE: {JSON.stringify(authState)}</Text>

          {/* Global Toast */}
          <MyToast />
        </ScrollView>
      </SafeArea>
    </>
  );
}
