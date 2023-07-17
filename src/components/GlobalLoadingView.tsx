import React, {useState} from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import Modal from 'react-native-modal';
import AnimatedLottieView from 'lottie-react-native';
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

const GlobalLoadingView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Dimensions.get('window').height +
    (StatusBar.currentHeight ? StatusBar.currentHeight : 0);

  return {
    setIsLoading,
    LoadingView: (): JSX.Element => (
      <Modal
        propagateSwipe
        style={styles.modalContainer}
        isVisible={isLoading}
        coverScreen={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropColor="black"
        backdropOpacity={0.4}
        statusBarTranslucent={true}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        deviceHeight={deviceHeight}>
        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
        <AnimatedLottieView
          source={require('@/assets/lottie/animation_meditation.json')}
          autoPlay
          loop
          resizeMode="cover"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 200, height: 200}}
          cacheComposition={true}
          autoSize={true}
          enableMergePathsAndroidForKitKatAndAbove
          hardwareAccelerationAndroid
          key={Date.now().toString() + Math.random()}
          testID={Date.now().toString()}
          useNativeLooping
          renderMode="AUTOMATIC"
        />
        <Button mode="contained" onPress={() => setIsLoading(false)}>
          Close
        </Button>
      </Modal>
    ),
  };
};

export default GlobalLoadingView;
