const chalk = require('chalk')

// 获取带有错误文件行列的信息
module.exports = function (filename, src, line, column, message, rule) {
  var fullMessage
  var location = line + (column ? ':' + column : '')
  if (src && line >= 1 && line <= src.split('\n').length) {
    var lines = src.split('\n')
    var start = Math.max(line - 3, 0)
    var end = Math.min(lines.length, line + 3)
    // Error context
    var context = lines.slice(start, end).map(function (text, i) {
      var curr = i + start + 1
      var preamble = (curr == line ? '  > ' : '    ')
        + curr
        + '| '
      var out = preamble + text
      if (curr === line && column > 0) {
        out += '\n'
        out += Array(preamble.length + column).join('-') + '^'
      }
      return out
    }).join('\n')
    fullMessage = (filename || 'Pug') + ':' + location + '\n' + context + '\n\n' + message + '   ' + chalk.grey(rule)
  } else {
    fullMessage = (filename || 'Pug') + ':' + location + '\n\n' + message + '   ' + chalk.grey(rule)
  }
  return fullMessage
}
