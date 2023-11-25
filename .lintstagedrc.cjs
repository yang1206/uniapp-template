module.exports = {
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}': 'eslint --fix --cache',
  '*.{scss,css,vue}': 'stylelint  --fix --allow-empty-input',
  '*.{ts,cts,mts,tsx,vue}': () => 'vue-tsc --noEmit -p tsconfig.vitest.json --composite false',
}
