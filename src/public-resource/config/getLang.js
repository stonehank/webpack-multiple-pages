
function getLang(language) {
  switch (language) {
    case 'en':
      return 'en'
    case 'cn':
      return 'zh-cmn-Hans'
    default:
      return 'en'
  }
}

module.exports = getLang
