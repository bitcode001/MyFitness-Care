import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import {MThemeColors} from '@/constant/colors';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '.';
import {RouteProp, useNavigationState} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type RegisterScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Register'
>;

type RegisterScreenRouteProp = RouteProp<OnboardingStackParamList, 'Register'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

export default function RegisterScreen({
  navigation,
  route,
}: RegisterScreenProps): JSX.Element {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const state = useNavigationState(state => state);
  const handleRegister = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully registered!',
    });
    // navigation.navigate('Login');
    navigation.popToTop();
  };
  const handleBackPress = () => {
    // console.log('This is navigate: ', navigation);
    // navigation.goBack();
    // navigation.navigate('Login');
    // console.log('Can go back: ', navigation.popToTop());
    console.log('Nav State: ', state);
  };

  React.useEffect(() => {
    console.log('This is route: ', route);
  }, [route]);

  return (
    <SafeAreaScrollView>
      <View>
        <Button
          mode="text"
          className="rounded-full w-10"
          style={{backgroundColor: MThemeColors.black}}
          onPress={() => handleBackPress()}>
          <MaterialIcon
            name="arrow-left"
            size={22}
            color={MThemeColors.white}
          />
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
        <View className="my-5">
          <TextInput
            className="mt-5"
            outlineColor="transparent"
            label={'Username'}
            mode="outlined"
          />
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

        <Button
          mode="contained"
          className="mt-10"
          onPress={() => handleRegister()}>
          <Text>Register</Text>
        </Button>
      </View>
    </SafeAreaScrollView>
  );
}
