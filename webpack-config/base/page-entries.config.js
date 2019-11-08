const glob = require('glob')
const dirVars = require('./dir-vars.config.js')
const { notTransPrefix, deepFolderPrefix,notPagePrefix} = require('../config')
const options = {
  cwd: dirVars.pagesDir, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
}
const flatFolders = new glob.Glob(`!(${notTransPrefix}|${deepFolderPrefix}|${notPagePrefix})*`, options) // 考虑到多个页面共用HTML等资源的情况，跳过以`notPagePrefix`开头的目录
const deepFolders = new glob.Glob(`${deepFolderPrefix}*/[^${notPagePrefix}]*`, options)

const notTransFlat = new glob.Glob(`${notTransPrefix}!(${deepFolderPrefix}|${notPagePrefix})*`, options)
const notTransDeep = new glob.Glob(`${notTransPrefix}${deepFolderPrefix}*/[^${notPagePrefix}]*`, options)


let finalFlatFolders = flatFolders.found
let finalDeepFolders = deepFolders.found
let finalNotTransFlat = notTransFlat.found
let finalNotTransDeep = notTransDeep.found


module.exports = {
  flatFolders: finalFlatFolders,
  deepFolders: finalDeepFolders,
  notTransFlat: finalNotTransFlat,
  notTransDeep: finalNotTransDeep,
}
