const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: './index.html',
      template: './index.ejs'
    })
  ]
}