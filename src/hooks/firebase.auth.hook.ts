import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// import {setUser} from '@redux/slice/auth.slice';
import {setUser} from '@/redux/slice/auth.slice';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
// import Toast from 'react-native-toast-message';

// Function to abstract error message from Firebase Auth error code
export const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-not-found':
      return 'User not found. Please check your email and try again.';
    case 'auth/wrong-password':
      return 'The password is invalid or the user does not have a password.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
    // Add more cases as needed for other error codes
    default:
      return 'An error occurred. Please try again later.';
  }
};

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
    const user = await firebase.auth().signInWithCredential(credential);
    return user;
  };

  const firebaseSignOut = async () => {
    //   await GoogleSignin.revokeAccess();
    await firebase.auth().signOut();
    await GoogleSignin.signOut();
  };

  const signInWithGoogle = async () => {
    console.log('Signing In...');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log('USER: ', userInfo);
      // login with credential
      const {accessToken, idToken} = await GoogleSignin.getTokens();
      await firebaseSignIn(idToken, accessToken);
      // dispatch(setUser(s_user));
      return userInfo;
    } catch (error: any) {
      let msg = '';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        msg = 'Sign in cancelled';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        msg = 'Sign in in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        msg = 'Play services not available';
      } else {
        // some other error happened
        msg = `Msg: ${error.message}`;
      }

      throw Error(msg); // Throw error so that the caller can handle appropriately
    }
  };

  const signInWithCredential = async (email: string, password: string) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signOut = async () => {
    dispatch(startSpinner());
    try {
      await firebaseSignOut();
      dispatch(setUser(null));
      dispatch(stopSpinner());
    } catch (error) {
      console.error(error);
      dispatch(stopSpinner());
    }
  };

  const registerWithCredential = async (email: string, password: string) => {
    dispatch(startSpinner());
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      dispatch(stopSpinner());
      return user;
    } catch (error: any) {
      console.log(error);
      let msg = '';
      // Handle the registration error
      if (error.code === 'auth/email-already-in-use') {
        // Email already exists, display appropriate message or take necessary action
        msg = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        // Weak password, display appropriate message or take necessary action
        msg = 'Weak password';
      } else {
        // Other registration errors, display a generic error message or handle as needed
        msg = `Msg: ${error.message}`;
      }

      dispatch(stopSpinner());
      throw Error(msg); // Throw error so that the caller can handle appropriately
    }
  };

  const isSignedIn = async () => {
    try {
      // const status = await GoogleSignin.isSignedIn();
      const cUser = firebase.auth().currentUser;
      // console.log('Signed In User: ', cUser);
      // console.log('Is signed in: ', !!cUser);
      return !!cUser;
    } catch (error) {
      console.log(error);
    }
  };

  const getTokens = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      // console.log('Tokens: ', tokens);
      return tokens;
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      // const currentUser = await GoogleSignin.getCurrentUser();
      const cUser = firebase.auth().currentUser;
      // console.log('Current User: ', cUser);
      return cUser;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    console.log('Auth State Changed');
    // console.log(JSON.stringify(user));
    if (user) {
      // console.log('Got the user! ');
      const currentUser = await getCurrentUser();

      if (currentUser) {
        // console.log('Got the current user! ');
        dispatch(setUser(currentUser));
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
    signInWithGoogle,
    signInWithCredential,
    registerWithCredential,
    isSignedIn,
    getTokens,
    getCurrentUser,
    signOut,
    handleAuthStateChanged,
  };
};

export default useFirebase;
