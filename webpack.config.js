const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const withRootPath = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: 'development',
  entry: {
    app: './src',
  },
  optimization: {
    minimize: false,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'ClashLand',
    }),
    new CopyWebpackPlugin([{
      from: 'assets',
      to: 'assets',
    }]),
  ],
  output: {
    filename: '[name].bundle.js',
    path: withRootPath('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          `${__dirname}/src`,
          `${__dirname}/core`,
          `${__dirname}/assets`,
        ],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      core: withRootPath('core'),
      assets: withRootPath('assets'),
      app: withRootPath('src'),
    },
  },
}
