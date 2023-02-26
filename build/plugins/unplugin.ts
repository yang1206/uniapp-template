import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { getRootPath, getSrcPath } from '../utils'
export default [
  AutoImport({
    imports: ['vue', 'vue-router', 'uni-app'],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getRootPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    dts: resolve(getRootPath(), 'typings/components.d.ts'),
  }),
]
