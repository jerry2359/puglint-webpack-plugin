'use strict'
const path = require('path')
const util = require('util')

module.exports = function configParser(config) {
  if (config.extends) {
    const configPath = path.resolve(util.format('node_modules/%s', config.extends), 'index.js')

    try {
      const defaultConfig = require(configPath)
      delete config.extends
      return Object.assign(defaultConfig, config)
    } catch (e) {
    }
  }
  return config
}
