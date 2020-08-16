const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const translateEnvToMode = (env) => {
  if (env === "production") {
    return "production";
  }
  return "development";
};

module.exports = (env) => {
  return {
    target: "electron-renderer",
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false,
    },
    resolve: {
      extensions: [".js", ".html", ".css"],
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`),
      },
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
        { test: /\.handlebars$/, loader: "handlebars-loader" },
        {
          test: /\.js$/,
          use: ["babel-loader"],
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" }),
    ],
  };
};
