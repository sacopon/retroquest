const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ディレクトリ設定
const sourceDir = path.join(__dirname, "../src");
const publicDir = path.join(__dirname, "../dist");
const assetDir = path.join(__dirname, "../assets/dist");

module.exports = {
  entry: {
    index: "./src/index.ts",
    app: "./src/app.ts",
  },
  output: {
    path: publicDir,
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      // for .ts files
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(sourceDir), "node_modules"],
    extensions: [".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["index"],
      template: path.join(sourceDir, "index.html.ejs"),
      inject: "body",
      hash: true,
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["app"],
      template: path.join(sourceDir, "app.html.ejs"),
      inject: "body",
      hash: true,
      filename: "app.html",
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    contentBase: [publicDir, assetDir],
    open: true,
  },
};
