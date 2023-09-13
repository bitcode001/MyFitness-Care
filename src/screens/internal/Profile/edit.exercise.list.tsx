import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ProfileStackParamList} from './profile.screen';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {MThemeColors} from '@/constant/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import RoutineSetupScreen from '../Routine/routine.setup.screen';
import {MSpacing} from '@/constant/measurements';
import {RouteProp} from '@react-navigation/native';

type EditExerciseListScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'EditExerciseList'
>;
type EditExerciseListScreenRouteProps = RouteProp<
  ProfileStackParamList,
  'EditExerciseList'
>;

type EditExercisListScreenInterface = {
  navigation: EditExerciseListScreenNavigationProp;
  route: EditExerciseListScreenRouteProps;
};

export default function EditExerciseList({
  navigation,
  route,
}: EditExercisListScreenInterface) {
  const {start_date, start_time} = route.params.data;
  return (
    <SafeAreaScrollView noHorizontalPadding>
      <View
        className="flex flex-row items-center"
        style={{paddingHorizontal: MSpacing.screenPadding}}>
        <Button
          mode="text"
          style={{backgroundColor: MThemeColors.black}}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="arrow-left"
            size={22}
            color={MThemeColors.white}
          />
        </Button>

        <Text className="flex-1 ml-4 font-bold text-base">
          Update your personalized routine
        </Text>
      </View>

      {/* RE implementa all the register sceens  */}
      <RoutineSetupScreen
        isReupdatingEx={true}
        updateCb={() => navigation.navigate('ProfileMain')}
        defaultDateTime={{
          default_date: start_date,
          default_time: start_time,
        }}
      />
    </SafeAreaScrollView>
  );
}
