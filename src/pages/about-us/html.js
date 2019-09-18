const layout = require('layout')
const content = require('./html.ejs')
const abbreviation = require('configDir/abbreviation')

module.exports = function (templateParams) {
  const language = templateParams.curLang
  const publicPath = templateParams.publicPath
  return layout.run({
    content,
    language,
    publicPath,
    page_locales_name: abbreviation['about-us'],
    page_name:'about-us'
  })
}
