const path = require('path')
const dirVars = require('./base/dir-vars.config.js')
const { flatFolders, deepFolders, notTransFlat, notTransDeep } = require('./base/page-entries.config.js')
const abbreviation = require('../src/public-resource/config/abbreviation')
const { deepFolder_prefix, notTrans_prefix } = require('./config')
const configEntry = {}

flatFolders.forEach((page) => {
  configEntry[abbreviation[page]] = path.resolve(dirVars.pagesDir, page + '/page.js')
})
deepFolders.forEach((page) => {
  const deepPage = page.substring(deepFolder_prefix.length)
  const split = deepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  const abbName = `${abbreviation[folderName]}_${abbreviation[pageName]}`
  configEntry[abbName] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

notTransFlat.forEach((page) => {
  const pageName = page.substring(notTrans_prefix.length)
  configEntry[abbreviation[pageName]] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

notTransDeep.forEach((page) => {
  const ntDeepPage = page.substring(notTrans_prefix.length + deepFolder_prefix.length)
  const split = ntDeepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  const abbName = `${abbreviation[folderName]}_${abbreviation[pageName]}`
  configEntry[abbName] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

module.exports = configEntry
