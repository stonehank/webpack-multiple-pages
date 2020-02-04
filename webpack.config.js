const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const { publicPath } = require('./webpack-config/config')

module.exports = {

  mode: isDev ? 'development' : 'production',
  
  entry: require('./webpack-config/entry.config.js'),

  output: {
    path: path.join(__dirname, './dist'),
    filename: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash:8].js',
    publicPath: publicPath === '' ? '/' : publicPath
  },
  
  resolve: require('./webpack-config/resolve.config.js'),
  
  devtool: isDev ? 'cheap-module-source-map' : false,
  
  plugins: require('./webpack-config/plugins.config.js'),
  
  optimization: require('./webpack-config/optimization.config.js'),
  
  module: require('./webpack-config/module.config.js'),

  stats:isDev ? {} : {
    all:false
  },

  devServer: isDev ? {
    quiet:true,
    hot: true,
    port: 3000,
    host: getIP(),
  } : {},
}

function getIP (force) {
  if (force) return force
  const os = require('os')
  const ifaces = os.networkInterfaces()
  for (const key in ifaces) {
    for (const details of ifaces[key]) {
      if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
        return details.address
      }
    }
  }
  return '0.0.0.0'
}
