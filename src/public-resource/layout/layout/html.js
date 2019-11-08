const locales = require('localesDir/locales')
const header = require('componentsDir/header/html.ejs')
const meta = require('componentsDir/meta/html.ejs')
const topNav = require('componentsDir/top-nav/html.ejs')
const footer = require('componentsDir/footer/html.ejs')
const externalLinks = require('componentsDir/external-links/html.ejs')
const scrollTop = require('componentsDir/scrollTop/html.ejs')
const isoCode=require('localesDir/config').isoCode
const layout = require('./html.ejs')


const moduleExports = {
  run({
    preContent,content,affixContent, language, publicPath, folderLocalesName=null,pageLocalesName
  }={}) {
    const curLang = locales[language]
    let curPageLang
    if(folderLocalesName)curPageLang=curLang.pages[folderLocalesName][pageLocalesName]
    else curPageLang = curLang.pages[pageLocalesName]
    const metaConfig = curPageLang.meta
    metaConfig.lang = isoCode[language]
    const formLang = null
    const footerTemp = footer({ lang: curLang.footer, publicPath, language })
    const renderData = {
      header: header({ htmlLang: metaConfig.lang, language }),
      meta: meta(metaConfig),
      footer: footerTemp,
      topNav: topNav({
        lang: curLang.topNav, publicPath, language, pageLocalesName, folderLocalesName
      }),
      externalLinks: externalLinks(),
      preContent: preContent({
        lang: curPageLang, publicPath, language, formLang,
      }),
      content: content({
        lang: curPageLang, publicPath, language, formLang,
      }),
      affixContent: affixContent({
        lang: curPageLang, publicPath, language, formLang,
      }),
      scrollTop: scrollTop(),
    }
    return layout(renderData)
  },
}

module.exports = moduleExports
