import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import StepNavigator from './step.navigator';

interface StepThreeInterface {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  time: {
    hours: string;
    minutes: string;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      hours: string;
      minutes: string;
    }>
  >;
}

export default function StepThree({
  step,
  setStep,
  date,
  setDate,
  time,
  setTime,
}: StepThreeInterface): JSX.Element {
  // FOR DATE PICKER
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params: {date: CalendarDate}): void => {
      setOpenDatePicker(false);
      setDate(params.date!); // To assure the date is not null
    },
    [setOpenDatePicker, setDate],
  );

  // FOR TIME PICKER
  const [visible, setVisible] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const addSpacer = (value: number): string =>
    value < 10 ? `0${value}` : String(value);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setVisible(false);
      setTime({hours: addSpacer(hours), minutes: addSpacer(minutes)});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setVisible],
  );

  const handleNavigateBack = () => {
    setStep(2);
  };

  return (
    <View className="flex flex-row items-start">
      <View className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <Text className="text-base font-medium leading-5 text-center">3</Text>
      </View>

      <View className="flex flex-col flex-1 pl-4 pt-1">
        <Text className="text-lg font-bold leading-5">Step 3</Text>
        <Text className="text-base font-medium">
          Lets set the date and time to start
        </Text>
        {step === 3 && (
          <React.Fragment>
            {/* CHOOSEN DATE TIME  */}
            <View className="flex flex-col items-start gap-4 mt-5">
              <View className="flex flex-col">
                <Text className="text-base font-medium">
                  So you are starting from :{' '}
                </Text>
                <Text className="text-base font-bold leading-5">
                  {date?.toDateString()}
                </Text>
              </View>
              <View className="flex flex-col">
                <Text className="text-base font-medium">Every (Time)</Text>
                <Text className="text-base font-bold leading-5">
                  {time.hours}:{time.minutes}
                </Text>
              </View>
            </View>

            <View className="flex flex-row justify-between items-center gap-4 mt-10">
              <DatePickerModal
                locale="en-GB"
                mode="single"
                visible={openDatePicker}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                validRange={{
                  startDate: new Date(), // optional
                  // endDate: new Date(), // optional
                }}
              />
              <Button
                mode="contained"
                className="flex-1 rounded-none"
                onPress={() => setOpenDatePicker(true)}>
                Pick Date
              </Button>

              <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={Number(time.hours)}
                minutes={Number(time.minutes)}
              />
              <Button
                mode="contained"
                className="flex-1 rounded-none"
                onPress={() => setVisible(true)}>
                Pick Time
              </Button>
            </View>

            <StepNavigator step={step} navigateBack={handleNavigateBack} />
          </React.Fragment>
        )}
      </View>
    </View>
  );
}
