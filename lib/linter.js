const PugLint = require('pug-lint')
const getFullMessage = require('./message')
const parse = require('./parse')
const globFiles = require('./globFiles')
const cache = require('./cache')

const linter = new PugLint()
let configured = false

module.exports = function (options) {
  return new Promise((resole, reject) => {
    const filePaths = globFiles(options.files)
    const handleCache = cache(filePaths)
    // 通过缓存策略去判断，得到被修改的文件内容
    const contents = handleCache.getFileContents()
    let errors = ''

    // 使用lint得到错误信息
    for(let filename in contents) {
      const result = checkLint(filename, contents[filename], options.config)
      // 记录文件是否出错，即lint出文件格式不规范
      if (result) {
        handleCache.addError(filename)
      } else {
        handleCache.deleteError(filename)
      }
      errors += result
    }

    resole(errors)
  })
}

function checkLint(filename, content, config) {
  if(!configured) linter.configure(parse(config))

  const result = linter.checkString(content)
  let errors = ''

  if (result.length) {
    errors = result.sort(function (a, b) {
      let line = a.line - b.line
      if (line == 0) return (a.column || 0) - (b.column || 0)
      else return line
    }).map(function (problem) {
      const rule = problem.code.toLowerCase().replace(/^pug:/, '').replace(/^lint_/, '')
      let errMsg = '\n' + getFullMessage(filename, content, problem.line, problem.column, problem.msg, rule) + '\n'

      // See more rule: https://github.com/pugjs/pug-lint/blob/master/docs/rules.md
      return errMsg
    }).join('\n\n')
  }

  return errors
}
