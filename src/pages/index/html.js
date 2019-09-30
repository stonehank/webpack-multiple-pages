const layout = require('layout');
const abbreviation = require('configDir/abbreviation');
const content = require('./html.ejs');

module.exports = function buildPage(templateParams) {
  const language = templateParams.curLang;
  const { publicPath } = templateParams;
  return layout.run({
    content,
    language,
    publicPath,
    pageLocalesName: abbreviation.index,
    pageName: 'index',
  });
};
