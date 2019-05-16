// 缓存内容
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const cache = {}

module.exports = function (filePaths) {
  // 记录已修改的文件内容
  const changedContents = {}

  filePaths.forEach(filePath => {
    const {changed, errored, content} = parseFile(filePath)
    if (changed || errored) {
      changedContents[filePath] = content
    }
  })

  return {
    getFileContents: function() {
      return changedContents
    },
    addError: function (filePath) {
      cache[filePath].errored = true
    },
    deleteError: function (filePath) {
      cache[filePath].errored = false
    }
  }
}

// 分析文件
// 得到文件内容
// 得到文件是否被修改过
// 更新文件到缓存
// 返回文件信息
function parseFile(filePath) {
  const buffer = fs.readFileSync(filePath)
  const hash = getHash(buffer)

  if (typeof cache[filePath] === 'undefined') {
    cache[filePath] = {}
    cache[filePath].errored = true
  }
  const changed = cache[filePath].hash !== hash

  if (changed) {
    cache[filePath].hash = hash
  }
  return {
    changed,
    errored: cache[filePath].errored,
    content: buffer.toString()
  }
}

// 根据文件内容获取hash
function getHash(buffer) {
  return crypto
    .createHash( 'md5' )
    .update( buffer )
    .digest( 'hex' )
}
