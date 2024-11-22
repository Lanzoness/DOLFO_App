const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 */
const config = {
  resolver: {
    extraNodeModules: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      fs: require.resolve('react-native-fs'),
      os: require.resolve('os-browserify/browser'),
      events: require.resolve('events'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
