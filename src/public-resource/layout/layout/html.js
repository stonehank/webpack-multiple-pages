const locales = require('localesDir')
const header = require('componentsDir/header/html.ejs')
const meta = require('componentsDir/meta/html.ejs')
const topNav = require('componentsDir/top-nav/html.ejs')
const footer = require('componentsDir/footer/html.ejs')
const externalLinks = require('componentsDir/external-links/html.ejs')
const scrollTop = require('componentsDir/scrollTop/html.ejs')
const {isoCode,createDefaultMeta}=require('localesDir/config')
const layout = require('./html.ejs')

function getCurPageLang(obj,folder1,folder2,page,defaultMeta){
  if(!folder1 && folder2 || !page){
    throw new Error('Error, Check plugins.config.js!!')
  }
  if(folder1 && folder2 && page){
    return resolve(obj,[folder1,folder2,page],0,defaultMeta)
  }else if(folder1 && page){
    return resolve(obj,[folder1,page],0,defaultMeta)
  }else if(page){
    return resolve(obj,[page],0,defaultMeta)
  }
}
function resolve(obj,keyArr,idx,defaultMeta){
  if(idx===keyArr.length)return obj
  if(obj[keyArr[idx]]){
    return resolve(obj[keyArr[idx]],keyArr,idx+1,defaultMeta)
  }else{
    return {meta:defaultMeta}
  }
}

const moduleExports = {
  run({
        preContent,content,affixContent, language, publicPath, folderLocalesName1=null,folderLocalesName2=null,pageLocalesName
      }={}) {
    const curLang = locales[language]
    let defaultMeta=createDefaultMeta(folderLocalesName1,folderLocalesName2,pageLocalesName)
    let curPageLang=getCurPageLang(curLang,folderLocalesName1,folderLocalesName2,pageLocalesName,defaultMeta)
    const metaConfig = curPageLang.meta
    metaConfig.lang = isoCode[language]

    const formLang = null
    let pathPrefix=publicPath+(language!=="en" ? "/"+language : "")

    const renderData = {
      header: header({
        htmlLang: metaConfig.lang,
        language ,pathPrefix
      }),
      meta: meta(metaConfig),
      footer: footer({
        lang: curLang.footer,
        publicPath,
        language ,
        pathPrefix,
        pageLocalesName,
        folderLocalesName1,
        folderLocalesName2
      }),
      topNav: topNav({
        lang: curLang.topNav,
        publicPath,
        language,
        pathPrefix,
        pageLocalesName,
        folderLocalesName1,
        folderLocalesName2
      }),
      externalLinks: externalLinks(),
      preContent: preContent({
        lang: curPageLang,
        publicPath,
        pathPrefix,
        formLang,
      }),
      content: content({
        lang: curPageLang,
        publicPath,
        language,
        pathPrefix,
        formLang,
      }),
      affixContent: affixContent({
        lang: curPageLang,
        publicPath,
        language,
        pathPrefix,
        formLang,
      }),
      scrollTop: scrollTop(),
    }
    return layout(renderData)
  },
}

module.exports = moduleExports
