import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '.';
import {Button, TextInput} from 'react-native-paper';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import Toast from 'react-native-toast-message';

type LoginScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Login'
>;
type LoginScreenRouteProp = RouteProp<OnboardingStackParamList, 'Login'>;

type LoginInterface = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export default function LoginScreen({
  navigation,
  route,
}: LoginInterface): JSX.Element {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLogin = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  useEffect(() => {
    console.log('LoginScreen');
    // console.log('navigation', navigation);
    // console.log('route', route);
  }, [navigation, route]);
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
      <View className="my-5">
        <TextInput
          className="mt-5"
          outlineColor="transparent"
          label={'Email'}
          mode="outlined"
        />
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
        />
      </View>

      <Button mode="contained" className="mt-10" onPress={() => handleLogin()}>
        <Text>Sign In</Text>
      </Button>
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
