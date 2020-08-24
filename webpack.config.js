const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const ENV = process.env.NODE_ENV || 'development'
const IS_PROD = ENV === 'production'
const SOURCE_DIR = path.resolve(__dirname, 'src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node-modules/,
        use: IS_PROD ? [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions'  })],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                SOURCE_DIR,
              ],
            }
          }
        ] : [
          {
            loader: 'style-loader',
            options: { singleton: true }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions'  })],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                SOURCE_DIR,
              ],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
        ],
      } 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: './index.html',
      template: './index.ejs'
    })
  ]
}