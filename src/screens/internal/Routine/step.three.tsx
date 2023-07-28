import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export default function StepThree(): JSX.Element {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params: {date: CalendarDate}): void => {
      setOpenDatePicker(false);
      console.log('whole params: ', params);
      setDate(params.date);
    },
    [setOpenDatePicker, setDate],
  );

  // FOR TIME PICKER
  const [visible, setVisible] = React.useState(false);
  const [time, setTime] = React.useState({hours: 0, minutes: 0});
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setVisible(false);
      setTime({hours, minutes});
    },
    [setVisible],
  );
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

        {/* CHOOSEN DATE TIME  */}
        <View className="flex flex-row items-center gap-4 mt-10">
          <View className="flex flex-col">
            <Text className="text-base font-medium">Date</Text>
            <Text className="text-base font-bold leading-5">
              {date?.toDateString()}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text className="text-base font-medium">Time</Text>
            <Text className="text-base font-bold leading-5">
              {JSON.stringify(time)}
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-between items-center gap-4 mt-10">
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openDatePicker}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
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
            hours={12}
            minutes={14}
          />
          <Button
            mode="contained"
            className="flex-1 rounded-none"
            onPress={() => setVisible(true)}>
            Pick Time
          </Button>
        </View>
      </View>
    </View>
  );
}
