module.exports = {
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['RNGoogleSigninButton'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['RNGoogleSigninButton'],
    },
  },
  plugins: [
    '@react-native-firebase/app',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
};
