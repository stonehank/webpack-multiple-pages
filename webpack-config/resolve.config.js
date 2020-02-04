const dirVars = require('./base/dir-vars.config.js')
module.exports={
  extensions: ['.js'],
    alias: {
    localesDir: dirVars.localesDir,
      vendorDir: dirVars.vendorDir,
      assetsDir: dirVars.assetsDir,
      cssDir: dirVars.cssDir,
      jsDir: dirVars.jsDir,
      imagesDir: dirVars.imagesDir,
      componentsDir: dirVars.componentsDir,
      layoutDir: dirVars.layoutDir,
      logicDir: dirVars.logicDir,
      webpackConfig: dirVars.webpackConfig
  }
}
