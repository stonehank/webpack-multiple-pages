const cusHeader = require('componentsDir/cus-header/html.ejs')
const cusMeta = require('componentsDir/cus-meta/html.ejs')
const externalLinks = require('componentsDir/external-links/html.ejs')
const footer = require('componentsDir/footer/html.ejs')
const scrollTop = require('componentsDir/scroll-top/html.ejs')
const topNav = require('componentsDir/top-nav/html.ejs')

const locales = require('localesDir')
const {isoCode,createDefaultMeta,primaryLang,languageUrlStr}=require('localesDir/config')
const layout = require('./html.ejs')

function getCurPageLang(langObj,folder1,folder2,page,defaultMeta){
  if(!folder1 && folder2 || !page){
    throw new Error('Error, Check plugins.config.js!! Possible error1 : Must have page. Possible error2: if have folder2 name, must have folder1(parent folder) name.')
  }
  if(folder1 && folder2 && page){
    return resolve(langObj,[folder1,folder2,page],0,defaultMeta)
  }else if(folder1 && page){
    return resolve(langObj,[folder1,page],0,defaultMeta)
  }else if(page){
    return resolve(langObj,[page],0,defaultMeta)
  }
}
function resolve(langObj,keyArr,idx,defaultMeta){
  if(idx===keyArr.length)return langObj
  if(langObj[keyArr[idx]]){
    return resolve(langObj[keyArr[idx]],keyArr,idx+1,defaultMeta)
  }else{
    return {meta:defaultMeta}
  }
}

const moduleExports = {
  run({
    contentPrefix,content,contentSuffix, language, publicPath, folderLocalesName1=null,folderLocalesName2=null,pageLocalesName,author
  }={}) {
    const $t = locales[language]
    let defaultMeta=createDefaultMeta(folderLocalesName1,folderLocalesName2,pageLocalesName,author)
    let curPageLang=getCurPageLang($t.pages,folderLocalesName1,folderLocalesName2,pageLocalesName,defaultMeta)
    const metaConfig = curPageLang.meta
    metaConfig.lang = isoCode[language]
    
    let prefixPath=publicPath+(language===primaryLang ? "" : languageUrlStr[language] )
    let params={
      publicPath,
      language ,
      prefixPath,
      pageLocalesName,
      folderLocalesName1,
      folderLocalesName2,
      $t,
    }
    const renderData = {
      contentPrefix: contentPrefix({lang: curPageLang, ...params}),
      content: content({lang: curPageLang, ...params}),
      contentSuffix: contentSuffix({lang: curPageLang, ...params}),
    	cusHeader : cusHeader({htmlLang: metaConfig.lang, ...params}),
			cusMeta : cusMeta({...metaConfig,...params}),
			externalLinks : externalLinks({lang: $t["external-links"], ...params}),
			footer : footer({lang: $t["footer"], ...params}),
			scrollTop : scrollTop({lang: $t["scroll-top"], ...params}),
			topNav : topNav({lang: $t["top-nav"], ...params}),
		}
    return layout(renderData)
  },
}

module.exports = moduleExports
