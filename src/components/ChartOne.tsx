import React from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {View, Text} from 'react-native';

const barData = [
  {
    value: 250,
    label: 'M',
    topLabelComponent: () => <Text className="text-gray-500 text-xs">250</Text>,
    topLabelContainerStyle: {
      width: 30,
      //   backgroundColor: 'pink',
      alignSelf: 'center',
    },
  },
  {value: 500, label: 'T', frontColor: '#177AD5'},
  {value: 745, label: 'W', frontColor: '#177AD5'},
  {value: 320, label: 'T'},
  {value: 600, label: 'F', frontColor: '#177AD5'},
  {value: 256, label: 'S'},
  {value: 300, label: 'S'},
];
export default function ChartOne(): JSX.Element {
  return (
    <View className="w-full mt-5">
      <BarChart
        barWidth={22}
        yAxisThickness={0}
        xAxisType={'dashed'}
        xAxisColor={'lightgray'}
        // yAxisTextStyle={{color: 'lightgray'}}
        noOfSections={3}
        barBorderRadius={4}
        // frontColor="lightgray"
        data={barData}
        // yAxisThickness={0}
        // xAxisThickness={0}
        isAnimated={true}
        // showLine={true}
        // lineConfig={{
        //   color: '#F29C6E',
        //   thickness: 3,
        //   curved: true,
        //   hideDataPoints: true,
        // }}
      />
    </View>
  );
}
