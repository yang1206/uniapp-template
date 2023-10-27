module.exports = {
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}': 'eslint --fix --cache',
  '*.{ts,cts,mts,tsx,vue}': () => 'vue-tsc --noEmit -p tsconfig.vitest.json --composite false',
}
