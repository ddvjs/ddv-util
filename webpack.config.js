// var webpack = require("webpack")
var path = require('path')

module.exports = {
  entry: {
    'util': './lib/index.js',
    'time': './time'
  },
  output: {
    path: path.join(__dirname, './dist'),  // 设置打包后的js的输出位置
    filename: '[name].js'  // 和入口文件的名字相同
  },
  resolve: {
    extensions: ['.js'],
    alias: {  // 注册模块，以后用的时候可以直接requier("模块名")
    //    cookie: path.join(__dirname,"./static/js/jquery.cookie.js"),
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          ['es2015', { modules: false }]
        ],
        cacheDirectory: true
      }
    }]
  },
  devtool: 'sourcemap'  // 生成用来调试的map
}
