const glob = require('glob')
const dirVars = require('./dir-vars.config.js')
const { notTransPrefix, deepFolderPrefix } = require('../config')
const options = {
  cwd: dirVars.pagesDir, // 在pages目录里找
  sync: true, // 这里不能异步，只能同步
}
const flatFolders = new glob.Glob(`!(${notTransPrefix}|${deepFolderPrefix}|_)*`, options) // 考虑到多个页面共用HTML等资源的情况，跳过以`_`开头的目录
const deepFolders = new glob.Glob(`${deepFolderPrefix}*/[^_]*`, options)

const notTransFlat = new glob.Glob(`${notTransPrefix}!(${deepFolderPrefix}|_)*`, options)
const notTransDeep = new glob.Glob(`${notTransPrefix}${deepFolderPrefix}*/[^_]*`, options)


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
