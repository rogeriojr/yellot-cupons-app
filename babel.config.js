module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "babel-preset-jest"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
