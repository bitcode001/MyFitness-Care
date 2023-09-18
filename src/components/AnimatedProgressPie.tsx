// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import Svg, {G, Circle, Text} from 'react-native-svg';

// interface ProgressPieProps {
//   percentage: number;
//   circleLength?: number;
//   strokeWidth?: number;
//   label?: number;
//   customColorCode?: string;
// }

// const AnimatedProgressPie = ({
//   percentage,
//   circleLength = 200,
//   strokeWidth = 10,
//   label,
//   customColorCode,
// }: ProgressPieProps) => {
//   const R = circleLength / (2 * Math.PI);
//   const cx = R + strokeWidth;
//   const cy = R + strokeWidth;
//   const svgW = R * 2 + strokeWidth * 2;
//   const svgH = R * 2 + strokeWidth * 2;

//   const strokeDashoffset = circleLength * (1 - percentage);

//   return (
//     <View style={styles.container}>
//       <Svg width={svgW} height={svgH} style={styles.svg}>
//         <G>
//           <Circle
//             cx={cx}
//             cy={cy}
//             r={R}
//             stroke={customColorCode ? customColorCode : 'rgb(34, 197, 94)'}
//             strokeWidth={strokeWidth}
//             fill={'transparent'}
//             strokeOpacity={0.4}
//           />
//           <G transform={`rotate(${-90} ${cx} ${cy})`}>
//             <Circle
//               cx={cx}
//               cy={cy}
//               r={R}
//               stroke={customColorCode ? customColorCode : 'rgb(34, 197, 94)'}
//               strokeWidth={strokeWidth / 2}
//               fill={'transparent'}
//               strokeDasharray={circleLength}
//               strokeLinecap={'round'}
//               strokeDashoffset={strokeDashoffset}
//             />
//           </G>
//           {/* <Text
//             x={cx}
//             y={cy}
//             textAnchor="middle"
//             alignmentBaseline="middle"
//             fontSize={16}
//             fontWeight="medium"
//             fill="#666">
//             {label ? label : Math.floor(percentage * 100)}
//           </Text> */}
//         </G>
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   svg: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default AnimatedProgressPie;

import React from 'react';
import {View} from 'react-native';
// import {View} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, {G, Circle, Text} from 'react-native-svg';

interface AnimatedProgressPieProps {
  percentage: number;
  circleLength?: number;
  radius?: number;
  strokeWidth?: number;
  label?: number;
  customColorCode?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedProgressPie = ({
  percentage,
  circleLength = 200,
  strokeWidth = 10,
  label,
  customColorCode,
}: AnimatedProgressPieProps) => {
  const R = circleLength / (2 * Math.PI);
  const cx = R + strokeWidth;
  const cy = R + strokeWidth;
  const svgW = R * 2 + strokeWidth * 2;
  const svgH = R * 2 + strokeWidth * 2;

  const animatedProgress = useSharedValue<number>(percentage);

  animatedProgress.value = withTiming(percentage, {
    duration: 300, // Adjust duration as needed
    easing: Easing.inOut(Easing.ease),
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circleLength * (1 - animatedProgress.value),
    };
  });

  return (
    <View className="flex items-center justify-center">
      <Svg
        width={svgW}
        height={svgH}
        className="flex items-center justify-center">
        <G>
          <Circle
            cx={cx}
            cy={cy}
            r={R}
            stroke={customColorCode ? customColorCode : 'rgb(34 197 94)'}
            strokeWidth={strokeWidth}
            fill={'transparent'}
            strokeOpacity={0.4}
          />
          <G transform={`rotate(${-90} ${cx} ${cy})`}>
            <AnimatedCircle
              cx={cx}
              cy={cy}
              r={R}
              stroke={customColorCode ? customColorCode : 'rgb(34 197 94)'}
              strokeWidth={strokeWidth / 2}
              fill={'transparent'}
              strokeDasharray={circleLength}
              strokeLinecap={'round'}
              // strokeDashoffset={circleLength * 1 - percentage}
              animatedProps={animatedProps}
            />
          </G>
          <Text
            x={cx}
            y={cy}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={16}
            fontWeight={'bold'}
            fill="#666">
            {label ? label : Math.floor(percentage)}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

export default AnimatedProgressPie;
