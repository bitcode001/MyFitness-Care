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

  const animatedProgress = useSharedValue(percentage);

  animatedProgress.value = withTiming(percentage, {
    duration: 300, // Adjust duration as needed
    easing: Easing.inOut(Easing.ease),
  });

  const animatedProps = useAnimatedProps(() => {
    // const animate = interpolate(
    //   animatedProgress.value,
    //   [0, percentage],
    //   [0, percentage],
    //   {
    //     extrapolateRight: Extrapolation.CLAMP,
    //   },
    // );
    return {
      strokeDashoffset: circleLength * (1 - animatedProgress.value),
    };
  });

  return (
    // <Svg width={R * 2 + strokeWidth * 2} height={R * 2 + strokeWidth * 2}>
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
            fontWeight="medium"
            fill="#666">
            {label ? label : Math.floor(percentage)}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

export default AnimatedProgressPie;
