const webpack = require('webpack')
const path = require('path')

const glob = require('glob')
const dirVars = require('./base/dir-vars.config.js')
const { flatFolders, deepFolders, notTransFlat, notTransDeep } = require('./base/page-entries.config.js')
const { publicPath, deepFolderPrefix, notTransPrefix } = require('./config')
const abbreviation = require('../src/public-resource/config/abbreviation')
const langList = require('../src/public-resource/config/config').langList

const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'

const configPlugins = [
  isDev && new webpack.HotModuleReplacementPlugin(),
  new DuplicatePackageCheckerPlugin(),
  !isDev && new CleanWebpackPlugin(),
  new WebpackBar(),
  new CopyPlugin(
    isDev
      ? [
        { from: 'copy-file', to: '' },
      ]
      : [
        { from: 'public', to: 'static' },
        { from: 'copy-file', to: '' },
      ]
  ),
  new BundleAnalyzerPlugin({
    analyzerMode: isDev ? 'disabled' : 'static'
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
    anime: ['animejs', 'default'],
  }),

  new MiniCssExtractPlugin({
    filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
    chunkFilename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
  }),
  // use for clean unused css, if happen some css miss, please update or remove it.
  !isDev && new PurgecssPlugin({
    paths: glob.sync([
      `${dirVars.srcRootDir}/**/*.?(ejs|js)`,
      `${dirVars.staticRootDir}/copy-file/js/*.?(ejs|js)`,
    ], { nodir: true }),
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
  })
]

// 一级folder
flatFolders.forEach((page) => {
  let filename = ''
  // 定义filename路径
  langList.forEach(lang => {
    if (lang === 'en') {
      filename = `./${page}.html`
    } else {
      filename = `./${lang}/${page}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
      inject: true,
      cache: true,
      templateParameters: {
        curLang: lang,
        publicPath: publicPath,
        folderLocalesName:null,
        pageLocalesName:abbreviation[page]
      },
      chunks: [abbreviation[page], 'commons', 'libs', 'manifest']
    })
    configPlugins.unshift(htmlPlugin)
  })
})

deepFolders.forEach((page) => {
  const deepPage = page.substring(deepFolderPrefix.length)
  const split = deepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  let filename = ''
  const chunks = [abbreviation[folderName] + '_' + abbreviation[pageName], 'commons', 'libs', 'manifest']
  langList.forEach(lang => {
    if (lang === 'en') {
      filename = `./${deepPage}.html`
    } else {
      filename = `./${lang}/${deepPage}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
      inject: true,
      cache: true,
      templateParameters: {
        curLang: lang,
        publicPath: publicPath,
        folderLocalesName:abbreviation[folderName],
        pageLocalesName:abbreviation[pageName]
      },
      chunks: chunks
    })
    configPlugins.unshift(htmlPlugin)
  })
})

notTransFlat.forEach((page) => {
  const pageName = page.substring(notTransPrefix.length)
  let outputFilename = `./${pageName}.html`
  if (pageName === '404')outputFilename = `./${pageName}.shtml`
  const htmlPlugin_en = new HtmlWebpackPlugin({
    filename: outputFilename,
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    inject: true,
    cache: true,
    templateParameters: {
      curLang: 'en',
      publicPath: publicPath,
      folderLocalesName:null,
      pageLocalesName:abbreviation[pageName]
    },
    chunks: [abbreviation[pageName], 'commons', 'libs', 'manifest']
  })
  configPlugins.unshift(htmlPlugin_en)
})

notTransDeep.forEach((page) => {
  const ntDeepPage = page.substring(notTransPrefix.length + deepFolderPrefix.length)
  const split = ntDeepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  const chunks = [abbreviation[folderName] + '_' + abbreviation[pageName], 'commons', 'libs', 'manifest']
  const htmlPlugin_en = new HtmlWebpackPlugin({
    filename: `./${ntDeepPage}.html`,
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    inject: true,
    cache: true,
    templateParameters: {
      curLang: 'en',
      publicPath: publicPath,
      folderLocalesName:abbreviation[folderName],
      pageLocalesName:abbreviation[pageName]
    },
    chunks
  })
  configPlugins.unshift(htmlPlugin_en)
})

module.exports = configPlugins.filter(Boolean)
