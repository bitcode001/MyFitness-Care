/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {
  DaysInterface,
  // ExerciseInterface,
  ExerciseRoutineInterface,
  ExData,
  IExerciseData,
  WEEKDAYS,
  GeneralInfoType,
} from './routine.setup.screen';
import {MThemeColors} from '@/constant/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import DropDown from 'react-native-paper-dropdown';
import StepNavigator from './step.navigator';
import Toast from 'react-native-toast-message';
// import {useDispatch} from 'react-redux';
// import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import DropDown from 'react-native-paper-dropdown';
import {generateUserExercisePlan} from '@/constant/utils';
import CheckMark from '@/assets/svg/check';
import WarningSvg from '@/assets/svg/warning';
import GenerateMsgModel from './GenerateMsgModel';

export interface StepTwoInterface {
  days: DaysInterface[];
  exerciseRoutine: ExerciseRoutineInterface;
  setExerciseRoutine: React.Dispatch<
    React.SetStateAction<ExerciseRoutineInterface>
  >;
  fetchedExerciseData: IExerciseData | [];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  generalInfo: GeneralInfoType;
  untrackedChanges: boolean;
  setUntrackedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}
// interface ExerciseOperationInterface {
//   day: WEEKDAYS;
//   exerciseRoutine: ExerciseRoutineInterface;
//   setExerciseRoutine: React.Dispatch<
//     React.SetStateAction<ExerciseRoutineInterface>
//   >;
//   removeExercise: (day: WEEKDAYS, exId: number) => void;
// }

// const ExerciseOpearation = ({
//   day,
//   exerciseRoutine,
//   setExerciseRoutine,
//   removeExercise,
// }: ExerciseOperationInterface) => {
//   if (exerciseRoutine[day]?.exercises.length === 0) {
//     return (
//       <View className="flex flex-col justify-center items-start pt-2">
//         <Text className="text-base font-semibold capitalize">
//           No exercises added
//         </Text>
//         <Text className="text-sm font-normal capitalize">
//           Add atleast one exercise by clicking button below
//         </Text>
//       </View>
//     );
//   }

//   const handleChangeInput = (
//     value: string,
//     index: number,
//     key: keyof ExerciseInterface,
//   ) => {
//     const ex_ref = exerciseRoutine[day]?.exercises;
//     if (ex_ref) {
//       const ex = ex_ref[index];
//       if (key === 'name') {
//         ex[key] = value;
//       }
//       if (key === 'sets' || key === 'reps') {
//         const filteredValue = value.replace(/[^0-9]/g, '');
//         ex[key] = Number(filteredValue);
//       }

//       setExerciseRoutine(prev => ({
//         ...prev,
//         [day]: {
//           ...prev[day],
//           exercises: ex_ref,
//         },
//       }));
//     }
//   };

//   return (
//     <React.Fragment>
//       {exerciseRoutine[day]?.exercises.map((ex, idx) => (
//         <View
//           className="bg-white p-4 pb-8 mb-10 flex flex-col justify-center items-center relative"
//           key={ex.id}>
//           <TouchableOpacity
//             className="absolute -bottom-6 rounded-full p-2"
//             style={{
//               backgroundColor: MThemeColors.grayBox,
//               // borderBlockEndColor: 'pink',
//               // borderBlockStartColor: 'pink',
//               // borderEndColor: 'black',
//               // borderStartColor: 'black',
//             }}
//             onPress={() => removeExercise(day, ex.id)}>
//             <View className="flex justify-center items-center rounded-full bg-red-500 w-8 h-8">
//               <MaterialIcon size={17} color={MThemeColors.white} name="minus" />
//             </View>
//           </TouchableOpacity>
//           <TextInput
//             className="mb-4 w-full"
//             mode="outlined"
//             label={'Exercise Name'}
//             value={ex.name}
//             onChangeText={value => handleChangeInput(value, idx, 'name')}
//           />
//           <View className="flex flex-row gap-4">
//             <TextInput
//               keyboardType="numeric"
//               className="flex flex-1"
//               mode="outlined"
//               label={'Sets'}
//               value={ex.sets ? ex.sets.toString() : ''}
//               onChangeText={value => handleChangeInput(value, idx, 'sets')}
//             />
//             <TextInput
//               keyboardType="numeric"
//               className="flex flex-1"
//               mode="outlined"
//               label={'Reps'}
//               value={ex.reps ? ex.reps.toString() : ''}
//               onChangeText={value => handleChangeInput(value, idx, 'reps')}
//             />
//           </View>
//         </View>
//       ))}
//     </React.Fragment>
//   );
// };

type RegenExerciseType = Omit<
  StepTwoInterface,
  | 'step'
  | 'setStep'
  | 'generalInfo'
  | 'untrackedChanges'
  | 'setUntrackedChanges'
> & {
  raiseFlag: React.Dispatch<React.SetStateAction<boolean>>;
};
const RegenExercises = ({
  days,
  exerciseRoutine,
  setExerciseRoutine,
  fetchedExerciseData,
  raiseFlag,
}: RegenExerciseType) => {
  // const dispatch = useDispatch();

  const memoizedFilteredList = useMemo(() => {
    return days.filter(d => d.stat === 1);
  }, [days]);

  const toggleDropdownVisibility = (day: WEEKDAYS) => {
    setExerciseRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        dropdownStat: !prev[day]?.dropdownStat,
      },
    }));
  };

  const toggleExerciseAccordion = (day: WEEKDAYS) => {
    setExerciseRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        accordionStat: !prev[day]?.accordionStat,
      },
    }));
  };

  // const [localExerciseList];

  const updateSelectedTargetMuscle = (value: string, day: WEEKDAYS) => {
    // console.log('value: ', value);
    if (value.split(',').filter(Boolean).length > 3) {
      Toast.show({
        type: 'error',
        text1: 'Too many parameters !',
        text2:
          'We usually recommend 2-3 muscle groups at a day for safety measures.',
      });
      return;
    }
    // console.log('day: ', day);
    setExerciseRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        targetMusclegroup: value,
      },
    }));

    // Raise flag of untracked changes
    raiseFlag(true);
  };
  // const checkCheckedStatus = (day: WEEKDAYS, value: string) => {
  //   const selectedBodyMusc = exerciseRoutine[day]?.targetMusclegroup ?? [];
  //   return selectedBodyMusc.includes(value);
  // };

  // const handleAddExercise = (day: WEEKDAYS) => {
  //   let ex_ref = exerciseRoutine[day]?.exercises;
  //   if (ex_ref) {
  //     ex_ref = [
  //       ...ex_ref,
  //       {
  //         id: Date.now(),
  //         name: '',
  //         // gifUrl: '',
  //         sets: 0,
  //         reps: 0,
  //       },
  //     ];
  //   } else {
  //     ex_ref = [
  //       {
  //         id: Date.now(),
  //         name: '',
  //         // gifUrl: '',
  //         sets: 0,
  //         reps: 0,
  //       },
  //     ];
  //   }

  //   setExerciseRoutine(prev => ({
  //     ...prev,
  //     [day]: {
  //       ...prev[day],
  //       exercises: ex_ref,
  //     },
  //   }));
  // };

  // const removeExercise = (day: WEEKDAYS, exId: number) => {
  //   let ex_ref = exerciseRoutine[day]?.exercises;

  //   if (ex_ref) {
  //     const filtered_ex = ex_ref.filter(el => el.id !== exId);

  //     setExerciseRoutine(prev => ({
  //       ...prev,
  //       [day]: {
  //         ...prev[day],
  //         exercises: filtered_ex,
  //       },
  //     }));
  //   }
  // };

  const dropdownList = useMemo(() => {
    if (fetchedExerciseData.length > 0) {
      return fetchedExerciseData.map((d: ExData) => ({
        label: d.bodyPart.toUpperCase(),
        value: d.bodyPart,
      }));
    } else {
      return [];
    }
  }, [fetchedExerciseData]);

  React.useEffect(() => {
    // console.log('Exercise Routine', JSON.stringify(exerciseRoutine));
  }, [exerciseRoutine]);

  const renderSelectedMuscleDetails = (day: WEEKDAYS) => {
    const selectedMuscle = exerciseRoutine[day]?.targetMusclegroup ?? '';
    if (selectedMuscle === '') {
      return null;
    }
    // Checking how many muscle group user did select
    const muscle_list = selectedMuscle.split(',').filter(Boolean);
    const selectedMuscleData = muscle_list.map(
      el => fetchedExerciseData.filter((d: ExData) => d.bodyPart === el)[0],
    );
    return (
      <React.Fragment>
        {selectedMuscleData.length > 0 && (
          <View className="flex flex-row justify-around items-center mt-5 flex-wrap">
            {/* <Text className="text-base font-normal mb-2">
              {selectedMuscleData.bodyPart.toUpperCase()}
            </Text> */}
            {selectedMuscleData.map((el, exIdx) => {
              if (typeof el.imgUrl === 'string') {
                return (
                  <Avatar.Image
                    className="my-2"
                    key={exIdx}
                    size={80}
                    source={{
                      uri: el.imgUrl,
                    }}
                  />
                );
              } else {
                return el.imgUrl.map((img, idx) => (
                  <Avatar.Image
                    className="my-2"
                    key={idx}
                    size={80}
                    source={{
                      uri: img,
                    }}
                  />
                ));
              }
            })}
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {memoizedFilteredList.length > 0 ? (
        memoizedFilteredList.map(d => (
          <React.Fragment key={d.id}>
            <TouchableOpacity
              onPress={() => toggleExerciseAccordion(d.day)}
              style={{backgroundColor: MThemeColors.gray}}
              className="p-4 my-5 flex flex-row justify-between items-center">
              <Text className="text-lg font-semibold capitalize">{d.day}</Text>
              <MaterialIcon
                name="chevron-down"
                size={30}
                color={MThemeColors.black}
              />
            </TouchableOpacity>

            {Object.keys(exerciseRoutine).length > 0 &&
              exerciseRoutine[d.day]?.accordionStat && (
                <View
                  className="p-4"
                  style={{
                    backgroundColor: MThemeColors.grayBox,
                  }}>
                  <Text className="text-base font-normal mb-5">
                    Target Muscle
                  </Text>

                  {/* <View className="flex flex-row flex-wrap">
                    {dropdownList.map((el, idx) => (
                      <TouchableOpacity
                        key={idx}
                        className="flex flex-row items-center w-1/2"
                        onPress={() =>
                          updateSelectedTargetMuscle(el.value, d.day)
                        }>
                        <Checkbox.Android
                          status={
                            checkCheckedStatus(d.day, el.value)
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                        <Text className="capitalize">{el.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View> */}

                  <DropDown
                    mode={'outlined'}
                    label="Select a target muscle"
                    inputProps={{
                      style: {
                        backgroundColor: MThemeColors.white,
                      },
                      multiline: true,
                    }}
                    dropDownContainerHeight={250}
                    dropDownItemTextStyle={{
                      color: MThemeColors.black,
                    }}
                    dropDownItemSelectedTextStyle={{
                      color: MThemeColors.black,
                      fontWeight: 'bold',
                    }}
                    list={dropdownList}
                    visible={exerciseRoutine[d.day]?.dropdownStat ?? false}
                    value={exerciseRoutine[d.day]?.targetMusclegroup ?? ''}
                    onDismiss={() => toggleDropdownVisibility(d.day)}
                    setValue={value => updateSelectedTargetMuscle(value, d.day)}
                    showDropDown={() => toggleDropdownVisibility(d.day)}
                    multiSelect
                  />
                  {renderSelectedMuscleDetails(d.day)}

                  {/* COLLECTION OF EXERCISES DETAILS  */}
                  {/* <Text className="text-base font-normal my-5">Exercises</Text>  */}

                  {/*<ExerciseOpearation
                    day={d.day}
                    exerciseRoutine={exerciseRoutine}
                    setExerciseRoutine={setExerciseRoutine}
                    removeExercise={removeExercise}
                  /> */}

                  {/* <Button
                    className="mt-5 rounded-none"
                    style={{
                      backgroundColor: MThemeColors.black,
                    }}
                    mode="contained"
                    onPress={() => handleAddExercise(d.day)}>
                    Add Exercise
                  </Button> */}
                </View>
              )}
          </React.Fragment>
        ))
      ) : (
        <View className="flex flex-col justify-center items-start pt-6">
          <Text className="text-lg font-semibold capitalize">
            No workout days selected
          </Text>
          <Text className="text-base font-normal capitalize">
            Select atleast one day from step 1
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};

export default function StepTwo({
  days,
  exerciseRoutine,
  setExerciseRoutine,
  fetchedExerciseData,
  step,
  setStep,
  generalInfo,
  untrackedChanges,
  setUntrackedChanges,
}: StepTwoInterface): JSX.Element {
  const toggleUntrackedFlag = () => {
    setUntrackedChanges(prev => !prev);
  };
  const handleNavigateNext = () => {
    const grindDays = days.filter(d => d.stat === 1);
    const grindWeekdays: WEEKDAYS[] = grindDays.map(el => el.day);

    // Check whether the selected days have atleast one targetmuscle set up
    const isEveryTargetMuscleNonEmpty = grindDays.every(
      ed => exerciseRoutine[ed.day]?.targetMusclegroup !== '',
    );

    if (!isEveryTargetMuscleNonEmpty) {
      Toast.show({
        type: 'error',
        text1: 'Missing target muscle',
        text2: 'Please select a target muscle for each day',
      });
      return;
    }

    // Check whether the selected days have atleast one exercise set up
    const isEveryExNonEmpty = grindWeekdays.every(
      gwd => (exerciseRoutine[gwd]?.exercises.length ?? 0) > 0,
    );

    // console.log('exerciseRoutine: ', JSON.stringify(exerciseRoutine));
    if (!isEveryExNonEmpty) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error on generating custom exercise routine',
      });
      return;
    } else {
      setStep(3);
    }
  };

  const handleNavigateBack = () => {
    setStep(1);
  };

  const generateActualExercise = () => {
    // Middleware function to inject exercise based on target muscle

    // Checking whether user selected muscle data for all selected days
    const ex_d = days.filter(el => el.stat === 1);
    if (ex_d.every(ed => exerciseRoutine[ed.day]?.targetMusclegroup !== '')) {
      // console.log('Current Exercise: ', exerciseRoutine);
      // console.log('My Days: ', days);

      const selectedLevel = generalInfo.levelOfFitness;
      const selectedGender = generalInfo.gender;
      const selectedAgeGroup = generalInfo.ageGroup;
      ex_d.forEach(e_d => {
        const todaysRoutine = exerciseRoutine[e_d.day];
        let selected_muscle_for_day = [''];

        if (todaysRoutine) {
          selected_muscle_for_day = todaysRoutine.targetMusclegroup
            .split(',')
            .filter(Boolean);
        }

        if (selected_muscle_for_day.length === 1) {
          const generatedExerciseData = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[0],
          });

          setExerciseRoutine(prev => {
            return {
              ...prev,
              [e_d.day]: {
                ...prev[e_d.day],
                exercises: generatedExerciseData[e_d.day]?.exercises,
                targetMusclegroup: selected_muscle_for_day[0],
                timeLimit: generatedExerciseData[e_d.day]?.timeLimit,
              },
            };
          });
        } else if (selected_muscle_for_day.length === 2) {
          const g1 = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[0],
          });
          const g2 = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[1],
          });
          // Checking availability
          const halfOfNeeded = Math.round(
            (g1[e_d.day]?.exercises.length ?? 2) / 2,
          );
          // Taking half from first
          let mixedEx: Record<string, string>[] = [];
          mixedEx.push(
            ...(g1[e_d.day]?.exercises.slice(0, halfOfNeeded) as Record<
              string,
              string
            >[]),
          );
          mixedEx.push(
            ...(g2[e_d.day]?.exercises.slice(halfOfNeeded) as Record<
              string,
              string
            >[]),
          );

          setExerciseRoutine(prev => {
            return {
              ...prev,
              [e_d.day]: {
                ...prev[e_d.day],
                exercises: mixedEx,
                targetMusclegroup: `${selected_muscle_for_day[0]},${selected_muscle_for_day[1]}`,
                timeLimit: g1[e_d.day]?.timeLimit,
              },
            };
          });
        } else if (selected_muscle_for_day.length === 3) {
          const g1 = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[0],
          });
          const g2 = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[1],
          });
          const g3 = generateUserExercisePlan({
            level: selectedLevel,
            gender: selectedGender,
            ageGroup: selectedAgeGroup,
            grindWeekday: e_d.day,
            targetMuscle: selected_muscle_for_day[2],
          });
          // Checking availability
          const quarterOfNeeded = Math.round(
            (g1[e_d.day]?.exercises.length ?? 3) / 3,
          );
          // Taking half from first
          let mixedEx: Record<string, string>[] = [];
          mixedEx.push(
            ...(g1[e_d.day]?.exercises.slice(0, quarterOfNeeded) as Record<
              string,
              string
            >[]),
          );
          mixedEx.push(
            ...(g2[e_d.day]?.exercises.slice(
              quarterOfNeeded,
              quarterOfNeeded * 2,
            ) as Record<string, string>[]),
          );
          mixedEx.push(
            ...(g3[e_d.day]?.exercises.slice(quarterOfNeeded * 2) as Record<
              string,
              string
            >[]),
          );

          setExerciseRoutine(prev => {
            return {
              ...prev,
              [e_d.day]: {
                ...prev[e_d.day],
                exercises: mixedEx,
                targetMusclegroup: `${selected_muscle_for_day[0]},${selected_muscle_for_day[1]},${selected_muscle_for_day[2]}`,
                timeLimit: g1[e_d.day]?.timeLimit,
              },
            };
          });
        }
      });

      // Toggling back the flag
      toggleUntrackedFlag();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incomplete details !',
        text2:
          'Please select all the exercise data for all the selected days first!',
      });
      return;
    }
  };

  return (
    <React.Fragment>
      <View className="flex flex-row items-start relative">
        <View className="absolute left-4 top-0 h-full w-0.5 bg-slate-300" />
        <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Text className="text-base font-medium leading-5 text-center">2</Text>
        </View>

        <View className="flex flex-col flex-1 pl-4 pt-1 pb-8">
          <Text className="text-lg font-bold leading-5">Step 2</Text>
          <Text className="text-base font-medium">
            Lets setup your exercise routine
          </Text>

          {step === 2 && (
            <React.Fragment>
              <Text className="text-base font-sm mt-4">
                Choose your target muscle and our system will generate a workout
                routine for you
              </Text>

              <RegenExercises
                days={days}
                exerciseRoutine={exerciseRoutine}
                setExerciseRoutine={setExerciseRoutine}
                fetchedExerciseData={fetchedExerciseData}
                raiseFlag={setUntrackedChanges}
              />

              <TouchableOpacity
                className="mt-5 py-3 rounded-none flex-1 flex flex-row items-center justify-center"
                disabled={!untrackedChanges}
                onPress={generateActualExercise}
                style={{
                  backgroundColor: untrackedChanges
                    ? MThemeColors.baseOrange
                    : MThemeColors.successGreen,
                }}>
                {untrackedChanges ? (
                  <WarningSvg
                    className="w-6 h-6 mr-4"
                    fill={MThemeColors.white}
                  />
                ) : (
                  <CheckMark
                    className="w-6 h-6 mr-4"
                    fill={MThemeColors.white}
                  />
                )}
                <Text className="text-white text-base font-medium">
                  {untrackedChanges
                    ? 'Generate Exercise For Me'
                    : 'Generated !'}
                </Text>
              </TouchableOpacity>

              {/* <Text className="py-4 text-center font-medium">
                  Now click on Finish Button below !
                </Text> */}
              {!untrackedChanges && (
                <StepNavigator
                  step={step}
                  navigateNext={handleNavigateNext}
                  navigateBack={handleNavigateBack}
                />
              )}
            </React.Fragment>
          )}
        </View>
      </View>
    </React.Fragment>
  );
}
