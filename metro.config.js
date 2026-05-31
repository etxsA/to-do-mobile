const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// global.css lives under src/ alongside the rest of the app source.
module.exports = withNativeWind(config, { input: './src/global.css' });
