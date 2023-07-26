import React from 'react';
import {View, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
// import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '.';
import {Button, TextInput} from 'react-native-paper';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorLabel from '@/components/Form/ErrorLabel';
import useFirebase, {
  getFirebaseAuthErrorMessage,
} from '@/hooks/firebase.auth.hook';
import {useDispatch} from 'react-redux';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';

type LoginScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Login'
>;
// type LoginScreenRouteProp = RouteProp<OnboardingStackParamList, 'Login'>;

type LoginInterface = {
  navigation: LoginScreenNavigationProp;
  // route: LoginScreenRouteProp;
};

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

interface InitialLoginFormInterface {
  email: string;
  password: string;
}

export default function LoginScreen({navigation}: LoginInterface): JSX.Element {
  const {signInWithCredential} = useFirebase();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const dispatch = useDispatch();

  const handleLogin = async (values: InitialLoginFormInterface) => {
    dispatch(startSpinner());
    const {email, password} = values;
    try {
      await signInWithCredential(email, password);
      dispatch(stopSpinner());
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have successfully logged in!',
      });
    } catch (error: any) {
      dispatch(stopSpinner());
      const msg = getFirebaseAuthErrorMessage(error?.code);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg,
      });
    }
  };

  return (
    <SafeAreaScrollView>
      <View className="flex flex-col justify-center items-center">
        <Image
          className="h-40 w-40"
          source={require('@/assets/icons/fitness.png')}
        />
        <Text className="text-lg font-medium">My Fitness Care</Text>
        <Text className="text-base font-semibold">
          Lets learn to love ourselves first!
        </Text>
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginValidation}
        onSubmit={(values: InitialLoginFormInterface) => handleLogin(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <React.Fragment>
            <View className="my-5">
              <TextInput
                className="mt-5"
                outlineColor="transparent"
                label={'Email'}
                mode="outlined"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <ErrorLabel fieldKey="email" />
              <TextInput
                className="mt-5"
                outlineColor="transparent"
                label={'Password'}
                secureTextEntry={!passwordVisible}
                mode="outlined"
                right={
                  <TextInput.Icon
                    onPress={() => togglePasswordVisibility()}
                    icon="eye"
                  />
                }
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <ErrorLabel fieldKey="password" />
            </View>

            <Button
              mode="contained"
              className="mt-10"
              onPress={() => handleSubmit()}>
              <Text>Sign In</Text>
            </Button>
          </React.Fragment>
        )}
      </Formik>
      <Button
        mode="outlined"
        className="mt-5"
        icon={require('@/assets/icons/google.png')}
        onPress={() => navigation.navigate('Register')}>
        <Text>Sign in with Google</Text>
      </Button>
      <Text className="text-center my-5">Or</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Register')}>
        <Text>Go to Register</Text>
      </Button>
    </SafeAreaScrollView>
  );
}
