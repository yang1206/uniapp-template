import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { getRootPath, getSrcPath } from '../utils'
import { TmUiResolver } from './resolver'

export default [
  AutoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getRootPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    resolvers: [TmUiResolver()],
    extensions: ['vue'],
    deep: true,
    dts: resolve(getRootPath(), 'typings/components.d.ts'),
  }),
]
