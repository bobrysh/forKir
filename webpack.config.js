const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const html = require("html-loader");
const css = require("css-loader");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./scripts/index.js",
    // keyboardConstants: './scripts/keyboard-constants.js',
    // keyboardScript: './scripts/keyboard-script.js',
    // slider: './scripts/slider.js',
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: path.join(__dirname, "."),
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            {
              plugins: [
                "@babel/plugin-proposal-class-properties",
                ["@babel/transform-runtime"],
              ],
            },
          ],
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
