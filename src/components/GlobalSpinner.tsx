import React from 'react';
import {StyleSheet, Dimensions, StatusBar, View} from 'react-native';
import {Button} from 'react-native-paper';
import Modal from 'react-native-modal';
import AnimatedLottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {stopSpinner} from '@/redux/slice/spinner.slice';
// const AnimatedLottieView = require('lottie-react-native');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    position: 'relative',
    zIndex: 9999,
  },
});

const GlobalSpinner = () => {
  const spinnerState = useSelector((state: RootState) => state.spinner);
  const dispatch = useDispatch();

  const handleStopSpinner = () => {
    dispatch(stopSpinner());
  };

  //   const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Dimensions.get('window').height +
    (StatusBar.currentHeight ? StatusBar.currentHeight : 0);

  return (
    <Modal
      propagateSwipe
      style={styles.modalContainer}
      isVisible={spinnerState.loading}
      coverScreen={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor="black"
      backdropOpacity={0.8}
      statusBarTranslucent={true}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      deviceHeight={deviceHeight}>
      {/* <ActivityIndicator size="large" color="#00ff00" /> */}
      <View className="w-64 h-64 flex justify-center items-center">
        <AnimatedLottieView
          source={require('@/assets/lottie/animation_meditation.json')}
          autoPlay
          loop
          // resizeMode="cover"
          // eslint-disable-next-line react-native/no-inline-styles
          cacheComposition={true}
          // autoSize={true}
          enableMergePathsAndroidForKitKatAndAbove
          hardwareAccelerationAndroid
          key={Date.now().toString() + Math.random()}
          testID={Date.now().toString()}
          useNativeLooping
          renderMode="AUTOMATIC"
        />
      </View>
      <Button mode="contained" onPress={handleStopSpinner}>
        Close
      </Button>
    </Modal>
  );
};

export default GlobalSpinner;
