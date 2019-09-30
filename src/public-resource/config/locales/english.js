const abbreviation = require('../abbreviation');

module.exports = {
  topNav: {
    menu: 'MENU',
    home: 'Home',
    aboutU: 'About us',
    projects: 'Projects',
    contactU: 'Contact us',
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
        title: 'home page title here',
        og_title: 'og title here',
        keywords: 'home page keywords here',
        og_url: 'canonical link here',
        description: 'home page description here',
        og_description: 'og description here',
        og_image: 'home page share image here',
      },
      home: 'Home',
    },
    [abbreviation['contact-us']]: {
      meta: {
        title: 'contact page title here',
        og_title: 'og title here',
        keywords: 'contact page keywords here',
        og_url: 'canonical link here',
        description: 'contact page description here',
        og_description: 'og description here',
        og_image: 'contact page share image here',
      },
      contactU: 'Contact us',
    },
    [abbreviation['about-us']]: {
      meta: {
        title: 'About page title here',
        og_title: 'og title here',
        keywords: 'About page keywords here',
        og_url: 'canonical link here',
        description: 'About page description here',
        og_description: 'og description here',
        og_image: 'About page share image here',
      },
      aboutU: 'About us',
    },
    [abbreviation['privacy-policy']]: {
      meta: {
        title: 'title here',
        og_title: 'og title here',
        keywords: 'keywords here',
        og_url: 'canonical link here',
        description: 'description here',
        og_description: 'og description here',
        og_image: 'share image here',
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
        og_image: 'share image here',
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
        og_image: 'share image here',
      },
    },
    [abbreviation.projects]: {
      meta: {
        title: 'Projects page title here',
        og_title: 'og title here',
        keywords: 'Projects page keywords here',
        og_url: 'canonical link here',
        description: 'Projects page description here',
        og_description: 'og description here',
        og_image: 'Projects page share image here',
      },
      projects: 'Projects',
    },
  },
};
