const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const isDev = process.env.NODE_ENV === 'development'
const dirVars = require('./webpack-config/base/dir-vars.config.js')
const { publicPath } = require('./webpack-config/config')

function parseCss(preLoader=1){
  return [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: {
        // 开启css中的图片打包功能
        url: true,
        importLoaders: preLoader,
        sourceMap: isDev
      }
    },
    // All the rules in postcss.config.js
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        config: {
          ctx: {
            'postcss-preset-env': {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3
            },
            'postcss-flexbugs-fixes': {},
            cssnano: {},
          }
        }
      }
    },
  ]
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: require('./webpack-config/entry.config.js'),

  output: {
    path: path.join(__dirname, './dist'),
    filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    publicPath: publicPath === '' ? '/' : publicPath
  },
  resolve: {
    extensions: ['.js'],
    alias: {

      localesDir: dirVars.localesDir,
      vendorDir: dirVars.vendorDir,

      assetsDir: dirVars.assetsDir,
      /* less */
      cssDir: dirVars.cssDir,
      jsDir: dirVars.jsDir,
      /* img */
      imageDir: dirVars.imageDir,

      /* components */
      componentsDir: dirVars.componentsDir,

      /* layout */
      layoutDir: dirVars.layoutDir,
      layout: path.resolve(dirVars.layoutDir, 'layout/html'),
      //
      /* logic */
      logicDir: dirVars.logicDir,
      commonPage: path.resolve(dirVars.logicDir, 'common.page'),

      webpackConfig: dirVars.webpackConfig
    }
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : false,

  plugins: require('./webpack-config/plugins.config.js'),
  optimization: {
    minimize: !isDev,
    minimizer: [new TerserJSPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: isDev
          ? false
          : {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
        ie8: true,
        safari10: true
      }
    }), new OptimizeCSSAssetsPlugin({
      parser: safePostCssParser,
    })],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          test: /node_modules/,
          name: 'libs',
          minChunks: 4,
          minSize: 0,
          priority: 30,
        },
        commons: {
          name: 'commons',
          enforce: true,
          minChunks: 4,
          minSize: 0,
          priority: 20,
        },
        vendors:false,
        default: false
      },
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  module: {
    rules: [
      {
        oneOf: [
          // {
          //   enforce: 'pre',
          //   test: /\.(js|jsx)$/,
          //   exclude: /node_modules/,
          //   include: dirVars.srcRootDir,
          //   loader: 'eslint-loader',
          //   options: {
          //     fix: true,
          //   },
          // },
          {
            test: /\.(js|jsx)$/,
            include: dirVars.srcRootDir,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  babelrc: true,
                }
              },
              {
                loader: 'eslint-loader',
                options: {
                  fix:true
                }
              }
            ]
          },

          {
            test: /\.css$/,
            use: parseCss()
          },

          {
            test: /\.scss$/,
            use: parseCss(2).concat({loader: 'sass-loader'})
          },
          {
            test: /\.ejs$/,
            include: dirVars.srcRootDir,
            exclude: /node_modules/,
            loader: 'ejs-loader',
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            include: dirVars.assetsDir,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: isDev ? 0 : 4096,
                  name: 'image/[name]-[contenthash:8].[ext]',
                  publicPath: '/'
                },
              },
            ],
          },

          {
            test: /\.(woff|woff2|eot|ttf)$/,
            include: dirVars.assetsDir,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'font/[name]-[contenthash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            include: dirVars.assetsDir,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'vector/[name]-[contenthash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.ico$/,
            include: dirVars.assetsDir,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'image/[name].[ext]',
                },
              },
            ],
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/[name].[contenthash:8].[ext]',
            },
          },
        ]
      }
    ],
  },

  stats: {
    all: false,
    children:true,
    colors: true,
    errors: true,
    warnings: true,
    timings: true,
  },

  devServer: isDev ? {
    overlay: true,
    noInfo: true,
    clientLogLevel: 'silent',
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
