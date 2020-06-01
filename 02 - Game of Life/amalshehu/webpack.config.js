const path = require("path")
const webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Conway's Game of Life",
      filename: "index.html",
    }),
  ],
}
