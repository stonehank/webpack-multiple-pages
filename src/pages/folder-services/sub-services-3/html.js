const layout = require('layout')

const preContent=require('./content-pre.ejs')
const content=require('./content.ejs')
const affixContent=require('./content-affix.ejs')

module.exports = function buildPage(templateParams) {
  const language = templateParams.curLang
  const { publicPath,pageLocalesName,folderLocalesName } = templateParams
  return layout.run({
    preContent,
    content,
    affixContent,
    language,
    publicPath,
    folderLocalesName,
    pageLocalesName,
  })
}
