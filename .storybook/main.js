module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs", "@storybook/addon-actions"],
  features: {
    postcss: false, // This removes the PostCSS deprecation warning
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Add babel-loader for JSX in both stories and source files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
    });
    return config;
  },
};
