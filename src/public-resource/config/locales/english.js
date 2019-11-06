const abbreviation = require('../abbreviation')


/*
 meta: {
    title: 'title here',
    og_title: 'og title here',
    keywords: 'keywords here',
    og_url: 'canonical link here',
    description: 'description here',
    og_description: 'og description here',
    og_image: 'share image here',
  }
* */

module.exports = {
  topNav: {
    menu: 'MENU',
    home: 'Home',
    aboutU: 'About us',
    projects: 'Projects',
    contactU: 'Contact us',
    services:'Services',
    subSer1:'Sub Services-1',
    subSer2:'Sub Services-2',
    subSer3:'Sub Services-3',
  },
  footer: {
    footer: 'Footer',
    aboutU: 'About us ',
    projects: 'Projects',
    contactU: 'Contact Us ',
    privPol: 'Privacy Policy ',
  },
  pages: {
    [abbreviation.index]: {
      meta: {
        title: 'Home',
        og_title: 'Home',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
      title: 'Home',
    },
    [abbreviation['contact-us']]: {
      meta: {
        title: 'Contact Us',
        og_title: 'Contact Us',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
      title: 'Contact us',
    },
    [abbreviation['about-us']]: {
      meta: {
        title: 'About Us',
        og_title: 'About Us',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
      title: 'About us',
    },
    [abbreviation['privacy-policy']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
    },
    [abbreviation['terms-and-conditions']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
    },
    [abbreviation['404']]: {
      meta: {
        title: '404',
        og_title: '404',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
    },
    [abbreviation.projects]: {
      meta: {
        title: 'Projects',
        og_title: 'Projects',
        keywords: '',
        og_url: '',
        description: '',
        og_description: '',
        og_image: '',
      },
      title: 'Projects',
    },
    [abbreviation.services]: {
      [abbreviation.index]:{
        meta: {
          title: 'Services',
          og_title: 'Services',
          keywords: '',
          og_url: '',
          description: '',
          og_description: '',
          og_image: '',
        },
        title:'Services'
      },
      [abbreviation['sub-services-1']]: {
        meta: {
          title: 'Sub Services 1',
          og_title: 'Sub Services 1',
          keywords: '',
          og_url: '',
          description: '',
          og_description: '',
          og_image: '',
        },
        title:'Sub Services 1'
      },
      [abbreviation['sub-services-2']]: {
        meta: {
          title: 'Sub Services 2',
          og_title: 'Sub Services 2',
          keywords: '',
          og_url: '',
          description: '',
          og_description: '',
          og_image: '',
        },
        title:'Sub Services 2'
      },
      [abbreviation['sub-services-3']]: {
        meta: {
          title: 'Sub Services 3',
          og_title: 'Sub Services 3',
          keywords: '',
          og_url: '',
          description: '',
          og_description: '',
          og_image: '',
        },
        title:'Sub Services 3'
      },
    },
  },
}
