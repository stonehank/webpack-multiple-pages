module.exports={
  primaryLang:'en',
  otherLangList:['cn'],
  languageUrlStr : {
    en: '',
    cn: '/cn',
  },
  isoCode:{
    en:'en',
    cn:'zh-cmn-Hans'
  },
  langPanelExcludes: ['privacy-policy', 'terms-and-conditions', '404'],
  createDefaultMeta:(title)=>({
    title,
    og_title: title,
    keywords: '',
    og_url: '',
    description: '',
    og_description: '',
    og_image: ''
  })
}
