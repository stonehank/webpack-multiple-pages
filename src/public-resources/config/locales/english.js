const abbreviation = require('../abbreviation')
const blog = require('./blog')

module.exports = {
  topNav: {
    menu: 'MENU',
    home: 'Home',
    aboutU: 'About us',
    projects: 'Projects',
    contactU: 'Contact us!'
  },
  footer: {
    aboutU: 'About us ',
    projects: 'Projects',
    contactU: 'Contact Us ',
    privPol: 'Privacy Policy ',
  },
  pages: {
    [abbreviation.index]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['contact-us']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['about-us']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['privacy-policy']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['terms-and-conditions']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['404']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
    [abbreviation['projects']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here'
      },
    },
  }
}
