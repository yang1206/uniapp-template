const uni = require('@uni-helper/eslint-config')
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    ignores: ['src/manifest.json', 'src/pages.json'],
  },
  unocss.configs.flat,
)
