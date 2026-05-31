module.exports = function (api) {
  api.cache(true);

  return {
    // babel-preset-expo enables expo-router + React Compiler; nativewind/babel
    // wires the className -> style transform (cssInterop) for NativeWind v4.
    presets: [['babel-preset-expo'], 'nativewind/babel'],
    // react-native-worklets/plugin is required by react-native-reanimated v4.
    // Path aliases (@/* -> ./src/*) are resolved natively by Expo from tsconfig,
    // so no babel-plugin-module-resolver is needed.
    plugins: ['react-native-worklets/plugin'],
  };
};
