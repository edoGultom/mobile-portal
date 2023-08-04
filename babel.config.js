module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'AwesomeProject',
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin', // This line.
  ],
};
