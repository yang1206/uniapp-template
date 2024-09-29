import uniHelper from '@uni-helper/eslint-config'

export default uniHelper(
  {
    uni: true,
    uniJson: true,
    unocss: true,
    vue: {
      overrides: {
        'vue/custom-event-name-casing': ['kebab-case' | 'camelCase'],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': [
          2,
          {
            multiline: 1,
            singleline: 3,
          },
        ],
      },
    },
  },
)
