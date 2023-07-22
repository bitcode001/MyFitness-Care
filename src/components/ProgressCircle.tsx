import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {Circle, G, Svg} from 'react-native-svg';
import {Animated} from 'react-native';

interface ProgressCircleInterface {
  progress: number;
  radius: number;
  strokeWidth: number;
}

export default function ProgressCircle({
  progress,
  radius,
  strokeWidth,
}: ProgressCircleInterface) {
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [progress, progressAnimation]);

  return (
    <View style={styles.container}>
      <View style={styles.core}>
        <Text className="text-lg font-medium">
          {Number(progress * 100) + '%'}
        </Text>
      </View>
      <Svg width={radius * 2} height={radius * 2}>
        <G rotation="-90" origin={`${radius}, ${radius}`} fill="transparent">
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke="#26D136"
            strokeWidth={strokeWidth}
            fill="#26D136"
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke="#FFF"
            fill="#FFF"
            strokeWidth={strokeWidth}
            strokeDasharray={[circumference]}
            strokeDashoffset={Animated.multiply(
              progressAnimation,
              circumference,
            )}
          />
        </G>
      </Svg>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  core: {
    position: 'absolute',
    zIndex: 1,
    // width: '100%',
    // height: '100%',
    // borderRadius: 1000, // Adjust this to make the core circular
  },
});
