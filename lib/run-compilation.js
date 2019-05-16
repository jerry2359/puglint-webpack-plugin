const linter = require('./linter')

module.exports = function runCompilation(options, compiler, done) {
  let errorMessages = ''

  linter(options)
    .then(errors => {
      errorMessages = errors
      done()
    })
    .catch(done)

  const callback = (compilation, next) => {
    if (errorMessages) {
      compilation.errors.push(new Error(errorMessages))
      errorMessages = ''
    }
    next()
  }

  if (compiler.hooks) {
    compiler.hooks.afterEmit.tapAsync('PuglintWebpackPlugin', callback)
  } else {
    compiler.plugin('after-emit', callback)
  }
}
