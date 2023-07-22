import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Toast, {
  BaseToast,
  // SuccessToast,
  // ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';

const styles = StyleSheet.create({
  style: {
    height: 'auto',
    // width: '100%',
    // borderRadius: 10,
    // backgroundColor: '#fff',
    elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginVertical: 10,
    marginTop: 30,
  },
  successStyle: {
    borderLeftColor: '#4CAF50',
    // borderLeftColor: '#69C779',
  },
  errorStyle: {
    borderLeftColor: '#F44336',
  },
  infoStyle: {
    borderLeftColor: '#2196F3',
  },
  warningStyle: {
    borderLeftColor: '#FFC107',
  },
  contentContainerStyle: {
    flex: 1,
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  text1Style: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  text2Style: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});

const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={[styles.style, styles.successStyle]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text1NumberOfLines={2}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={[styles.style, styles.errorStyle]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text1NumberOfLines={2}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={[styles.style, styles.infoStyle]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text1NumberOfLines={2}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
    />
  ),
  warning: props => (
    <BaseToast
      {...props}
      style={[styles.style, styles.warningStyle]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text1NumberOfLines={2}
      text2Style={styles.text2Style}
      text2NumberOfLines={10}
    />
  ),
};

export const MyToast = () => {
  return <Toast config={toastConfig} />;
};
