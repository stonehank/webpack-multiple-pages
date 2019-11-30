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
  createDefaultMeta(folder1,folder2,page,author){
    let title=page
    if(page==='index'){
      if(folder2){
        title=folder2
      }else if(folder1){
        title=folder1
      }
    }
    return {
      title,
      og_title: title,
      keywords: '',
      og_url: '',
      description: '',
      og_description: '',
      og_image: '',
      author,
    }
  }
}
