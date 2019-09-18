
function getLang (language) {
  switch (language) {
    case 'en':
      return 'en'
    case 'cn':
      return 'zh-cmn-Hans'
  }
}

module.exports = getLang
