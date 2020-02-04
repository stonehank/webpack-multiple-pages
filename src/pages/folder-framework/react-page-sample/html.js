const layout = require('layoutDir/common-layout/html.js')
const contentPrefix=require('./content-prefix.ejs')
const content=require('./content.ejs')
const contentSuffix=require('./content-suffix.ejs')

module.exports = function buildPage(templateParams) {
  const language = templateParams.curLang
  const { author,publicPath,pageLocalesName,folderLocalesName1,folderLocalesName2 } = templateParams
  return layout.run({
    author,
    contentPrefix,
    content,
    contentSuffix,
    language,
    publicPath,
    pageLocalesName,
    folderLocalesName1,
    folderLocalesName2,
  })
}
