const babelConfig = require('./babel.config')

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      ...babelConfig
    },
  },
  plugins: [
    "flowtype"
  ],
}
