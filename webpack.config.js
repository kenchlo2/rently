const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const env = require('dotenv').config().parsed;
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

module.exports = {
  devtool: 'eval-source-map',
  mode: 'production',
  entry: ['./index.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.png|svg|jpg|otf|gif$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'svg-url-loader',
            options: {
              limit: 1000,
            }
          }
        ]
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      // path to build index.html in /build
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    // new webpack.DefinePlugin(envKeys)
    new webpack.DefinePlugin({ 'process.env.MAPBOX_API_KEY': JSON.stringify(env.MAPBOX_API_KEY) })
  ],
  devServer: {
    // host: 'localhost',
    // port: 8080,
    // contentBase: path.resolve(__dirname, '/dist'),
    // compress: true,
    publicPath: '/',
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // fallback to root for other urls
    historyApiFallback: true,

    //setup proxy to access BE server
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      }
    }
  }
};
