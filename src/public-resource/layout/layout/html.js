const locales = require('configDir/locales');
const header = require('componentsDir/header/html.ejs');
const meta = require('componentsDir/meta/html.ejs');
const topNav = require('componentsDir/top-nav/html.ejs');
const footer = require('componentsDir/footer/html.ejs');
const externalLinks = require('componentsDir/external-links/html.ejs');
const scrollTop = require('componentsDir/scrollTop/html.ejs');
const getLang = require('configDir/getLang');
const layout = require('./html.ejs');


const moduleExports = {
  run({
    content, language, publicPath, pageLocalesName, pageName,
  }) {
    const curLang = locales[language];
    const curPageLang = curLang.pages[pageLocalesName]
    const metaConfig = curPageLang.meta
    metaConfig.lang = getLang(language);
    const formLang = null;
    const footerTemp = footer({ lang: curLang.footer, publicPath, language });
    const renderData = {
      header: header({ htmlLang: metaConfig.lang, language }),
      meta: meta(metaConfig),
      footer: footerTemp,
      topNav: topNav({ lang: curLang.topNav, publicPath, language }),
      externalLinks: externalLinks(),
      content: content({
        lang: curPageLang, publicPath, language, formLang,
      }),
      scrollTop: scrollTop(),
      pageName,
    };
    return layout(renderData);
  },
};

module.exports = moduleExports;
