module.exports = {
  stories: ["../stories/**/*.stories.js", "../stories/**/*.stories.mdx"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  // core: {
  //   builder: "webpack5",
  // },
  features: {
    postcss: false, // This removes the PostCSS deprecation warning
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Add babel-loader for JSX
    config.module.rules.push({
      test: /\.stories\.js$/,
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
