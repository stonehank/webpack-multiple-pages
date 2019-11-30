const webpack = require('webpack')
const path = require('path')

const glob = require('glob-all')
const dirVars = require('./base/dir-vars.config.js')
const { transFlat, notTransFolder, notTransFlat, transFolder } = require('./base/page-entries.config.js')
const { publicPath ,notTransPrefix} = require('./config')
const {primaryLang,otherLangList} = require('./locales/config')

const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

otherLangList.unshift(primaryLang)
const allLangList=otherLangList
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
  /*
  * !!!
  * use for clean unused css, if your files which includes css style is not in src folder,
  * maybe need to update here, or just remove it.
  * */

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

function resolveFlat(page,langList,fullPath){
  let filename = ''
  // 定义filename路径
  langList.forEach(lang => {
    if (lang === primaryLang) {
      filename = `./${page}.html`
    } else {
      filename = `./${lang}/${page}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.pagesDir, `./${fullPath}/html.js`),
      inject: true,
      cache: true,
      templateParameters: {
        curLang: lang,
        publicPath: publicPath,
        folderLocalesName1:null,
        folderLocalesName2:null,
        pageLocalesName:page
      },
      chunks: [page, 'commons', 'libs', 'manifest']
    })
    configPlugins.unshift(htmlPlugin)
  })
}
function resolveDeep(pathArr,langList){
  let folderName1=''
  let folderName2=''
  let pageName=''
  let fullPath=''
  // 最后一个是完整路径
  if(pathArr.length===3){
    [folderName1,pageName,fullPath]=pathArr
  }else{
    [folderName1,folderName2,pageName,fullPath]=pathArr
  }
  let filename=''
  const chunks = [folderName1 + '_' + (folderName2 ? (folderName2 + '_') : '') + pageName, 'commons', 'libs', 'manifest']
  let outputPath='./'+folderName1 + '/' + (folderName2 ? folderName2 + '/' : '') + pageName
  langList.forEach(lang => {
    if (lang === primaryLang) {
      filename = `${outputPath}.html`
    } else {
      filename = `./${lang}/${outputPath}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.pagesDir, `./${fullPath}/html.js`),
      inject: true,
      cache: true,
      templateParameters: {
        curLang: lang,
        publicPath: publicPath,
        folderLocalesName1:folderName1,
        folderLocalesName2:folderName2,
        pageLocalesName:pageName
      },
      chunks: chunks
    })
    configPlugins.unshift(htmlPlugin)
  })
}

notTransFlat.forEach((page) => {
  const pageName = page.substring(notTransPrefix.length)
  resolveFlat(pageName,[primaryLang],page)
})
// 一级folder
transFlat.forEach((page) => {
  resolveFlat(page,allLangList,page)
})

notTransFolder.forEach((pathArr) => {
  resolveDeep(pathArr,[primaryLang])
})
transFolder.forEach((pathArr) => {
  resolveDeep(pathArr,allLangList)
})

module.exports = configPlugins.filter(Boolean)
