const locales = require('configDir/locales')
const header = require('componentsDir/header/html.ejs')
const meta = require('componentsDir/meta/html.ejs')
const topNav = require('componentsDir/top-nav/html.ejs')
const footer = require('componentsDir/footer/html.ejs')
const externalLinks = require('componentsDir/external-links/html.ejs')
const scrollTop = require('componentsDir/scrollTop/html.ejs')
const layout = require('./html.ejs')
const getLang = require('configDir/getLang')


const moduleExports = {
  run ({ content, language, publicPath, page_locales_name, page_name, options = {} }) {
    const curLang = locales[language]
    let curPageLang = curLang.pages[page_locales_name]
    const final_meta_config = curPageLang.meta
    final_meta_config.lang = getLang(language)
    let formLang = null
    let footerTemp = footer({ lang: curLang.footer, publicPath, language })
    const renderData = {
      header: header({ htmlLang: final_meta_config.lang, language }),
      meta: meta(final_meta_config),
      footer: footerTemp,
      topNav: topNav({ lang: curLang.topNav, publicPath, language }),
      externalLinks: externalLinks(),
      content: content({ lang: curPageLang, publicPath, language, formLang }),
      scrollTop: scrollTop(),
      page_name:page_name
    }
    return layout(renderData)
  }
}

module.exports = moduleExports
