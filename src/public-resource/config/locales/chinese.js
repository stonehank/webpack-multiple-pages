const abbreviation = require('../abbreviation');

module.exports = {
  topNav: {
    menu: '菜单',
    home: '主页',
    aboutU: '关于',
    projects: '项目',
    contactU: '联系我们',
  },
  footer: {
    footer: '页脚',
    home: '主页',
    aboutU: '关于',
    projects: '项目',
    contactU: '联系我们',
  },
  pages: {
    [abbreviation.index]: {
      meta: {
        title: '首页标题',
        og_title: 'og标题',
        keywords: '首页关键词',
        og_url: '唯一link',
        description: '首页描述',
        og_description: 'og描述',
        og_image: '首页分享时的图片',
      },
      home: '主页',
    },
    [abbreviation['contact-us']]: {
      meta: {
        title: '联系页面标题',
        og_title: 'og标题',
        keywords: '联系页面关键词',
        og_url: '唯一link',
        description: '联系页面描述',
        og_description: 'og描述',
        og_image: '联系页面分享时的图片',
      },
      contactU: '联系我们',
    },
    [abbreviation['about-us']]: {
      meta: {
        title: '关于页面标题',
        og_title: 'og标题',
        keywords: '关于页面关键词',
        og_url: '唯一link',
        description: '关于页面描述',
        og_description: 'og描述',
        og_image: '关于页面分享时的图片',
      },
      aboutU: '关于我们',
    },
    [abbreviation['privacy-policy']]: {
      meta: {
        title: '标题',
        og_title: 'og标题',
        keywords: '关键词',
        og_url: '唯一link',
        description: '描述',
        og_description: 'og描述',
        og_image: '分享时的图片',
      },
    },
    [abbreviation['terms-and-conditions']]: {
      meta: {
        title: '标题',
        og_title: 'og标题',
        keywords: '关键词',
        og_url: '唯一link',
        description: '描述',
        og_description: 'og描述',
        og_image: '分享时的图片',
      },
    },
    [abbreviation['404']]: {
      meta: {
        title: '标题',
        og_title: 'og标题',
        keywords: '关键词',
        og_url: '唯一link',
        description: '描述',
        og_description: 'og描述',
        og_image: '分享时的图片',
      },
    },
    [abbreviation.projects]: {
      meta: {
        title: '项目页标题',
        og_title: 'og标题',
        keywords: '项目页关键词',
        og_url: '唯一link',
        description: '项目页描述',
        og_description: 'og描述',
        og_image: '项目页分享时的图片',
      },
      projects: '项目',
    },
  },

};
