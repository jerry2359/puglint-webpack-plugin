// 获取指定目录下的文件路径
const glob = require('glob')

module.exports = function (files) {
  return glob.sync(files)
}
