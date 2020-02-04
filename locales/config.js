module.exports={
  "primaryLang": "english",
  "otherLangList": [
    "chinese"
  ],
  "languageUrlStr": {
    "english": "",
    "chinese": "/cn"
  },
  "isoCode": {
    "english": "en",
    "chinese": "zh"
  },
	createDefaultMeta:function createDefaultMeta(folder1,folder2,page,author=''){
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