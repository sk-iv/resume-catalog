// const webpack = require('webpack');

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// Try the environment variable, otherwise use root
// argv.mode !== 'production' ? '/' : 'assets/'

module.exports = (env, argv) => ({
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: argv.mode !== 'production' ? '/' : 'assets/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: argv.mode !== 'production' ? './index.html' : '../index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});
