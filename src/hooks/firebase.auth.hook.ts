import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// import {setUser} from '@redux/slice/auth.slice';
import {setUser} from '@/redux/slice/auth.slice';

const useFirebase = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Configuring Google Sign In...');
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '124451793556-lm3njjpbqpdiskcjtc1m9h16s6kp5l7j.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const firebaseSignIn = async (idToken: string, accessToken: string) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    await firebase.auth().signInWithCredential(credential);
  };

  const firebaseSignOut = async () => {
    //   await GoogleSignin.revokeAccess();
    await firebase.auth().signOut();
    await GoogleSignin.signOut();
  };

  const signIn = async () => {
    console.log('Signing In...');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER: ', userInfo);
      // login with credential
      const {accessToken, idToken} = await GoogleSignin.getTokens();
      await firebaseSignIn(idToken, accessToken);
      dispatch(setUser(userInfo as User));
      return userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut();
      dispatch(setUser(null));
    } catch (error) {
      console.error(error);
    }
  };

  const isSignedIn = async () => {
    try {
      const status = await GoogleSignin.isSignedIn();
      console.log('Is Signed In: ', status);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const getTokens = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      console.log('Tokens: ', tokens);
      return tokens;
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Current User: ', currentUser);
      return currentUser;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    console.log('Auth State Changed');
    console.log(JSON.stringify(user));
    if (user) {
      console.log('Got the user! ');
      const currentUser = await getCurrentUser();

      if (currentUser) {
        console.log('Got the current user! ');
        dispatch(setUser(currentUser as User));
      } else {
        console.log('No current user found! ');
        // login with credential
        // const {accessToken, idToken} = await GoogleSignin.getTokens();
        // await firebaseSignIn(idToken, accessToken);
        // handleAuthStateChanged(user);
      }
    }
  };

  return {
    signIn,
    isSignedIn,
    getTokens,
    getCurrentUser,
    signOut,
    handleAuthStateChanged,
  };
};

export default useFirebase;
