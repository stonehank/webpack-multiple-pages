const path = require('path')
const dirVars = require('./base/dir-vars.config.js')
const { flatFolders, deepFolders, notTransFlat, notTransDeep } = require('./base/page-entries.config.js')
const { deepFolderPrefix, notTransPrefix } = require('./config')
const configEntry = {}

flatFolders.forEach((page) => {
  configEntry[page] = path.resolve(dirVars.pagesDir, page + '/page.js')
})
deepFolders.forEach((page) => {
  const deepPage = page.substring(deepFolderPrefix.length)
  const split = deepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  const abbName = `${folderName}_${pageName}`
  configEntry[abbName] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

notTransFlat.forEach((page) => {
  const pageName = page.substring(notTransPrefix.length)
  configEntry[pageName] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

notTransDeep.forEach((page) => {
  const ntDeepPage = page.substring(notTransPrefix.length + deepFolderPrefix.length)
  const split = ntDeepPage.split('/')
  const folderName = split[0]
  const pageName = split[1]
  const abbName = `${folderName}_${pageName}`
  configEntry[abbName] = path.resolve(dirVars.pagesDir, page + '/page.js')
})

module.exports = configEntry
