import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import {MThemeColors} from '@/constant/colors';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '.';
// import {RouteProp} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorLabel from '@/components/Form/ErrorLabel';

type RegisterScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Register'
>;

// type RegisterScreenRouteProp = RouteProp<OnboardingStackParamList, 'Register'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
  // route: RegisterScreenRouteProp;
};

const registerValidation = Yup.object().shape({
  username: Yup.string().required('Username is Required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

interface RegisterFieldsInitialInterface {
  username: string;
  email: string;
  password: string;
}

export default function RegisterScreen({
  navigation,
}: RegisterScreenProps): JSX.Element {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleRegister = (values: RegisterFieldsInitialInterface) => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully registered!',
    });
    console.log('Registering values: ', values);
  };
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaScrollView>
      <Button
        mode="text"
        className="rounded-full w-10"
        style={{backgroundColor: MThemeColors.black}}
        onPress={() => handleBackPress()}>
        <MaterialIcon name="arrow-left" size={22} color={MThemeColors.white} />
      </Button>
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
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={registerValidation}
        onSubmit={(values: RegisterFieldsInitialInterface) =>
          handleRegister(values)
        }>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <React.Fragment>
            <View className="my-5">
              <TextInput
                className="mt-5"
                outlineColor="transparent"
                label={'Username'}
                mode="outlined"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              <ErrorLabel fieldKey="username" />

              <TextInput
                className="mt-5"
                outlineColor="transparent"
                label={'Email'}
                mode="outlined"
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
              <Text>Register</Text>
            </Button>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaScrollView>
  );
}
