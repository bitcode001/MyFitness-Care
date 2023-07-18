module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
        root: ['.'],
        alias: {
          '@': './src',
          apis: './src/apis',
          components: './src/components',
          hooks: './src/hooks',
          redux: './src/redux',
          screens: './src/screens',
          assets: './src/assets',
          constants: './src/constants',
          navigation: './src/navigation',
          utils: './src/utils',
          config: './src/config',
          theme: './src/theme',
        },
      },
    ],
  ],
};
