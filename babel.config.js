module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
