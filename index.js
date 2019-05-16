const path = require('path')
const runCompilation = require('./lib/run-compilation')

function apply(options, compiler) {
  options = options || {}
  const context = options.context || compiler.context

  // 结合context拼凑files字符串，如'src/**/*.pug'
  options.files = path.join(context, '/', options.files)

  const runner = runCompilation.bind(this, options)

  // 这里兼容老版本的webpack
  if (compiler.hooks) {
    const pluginName = 'PuglintWebpackPlugin'
    compiler.hooks.run.tapAsync(pluginName, runner)
    compiler.hooks.watchRun.tapAsync(pluginName, (compiler, done) => {
      runner(compiler, done)
    })
  } else {
    compiler.plugin('run', runner)
    compiler.plugin('watch-run', (watcher, done) => {
      runner(watcher.compiler, done)
    })
  }
}

// 将options传递给apply方法
module.exports = function puglintWebpackPlugin(options) {
  return {
    apply: apply.bind(this, options)
  }
}
