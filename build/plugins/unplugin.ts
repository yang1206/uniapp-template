import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

import { NutResolver } from 'uniapp-nutui'
import { getRootPath, getSrcPath } from '../utils'

export default [
  AutoImport({
    imports: ['vue', '@vueuse/core', 'pinia', 'uni-app'],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getRootPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    resolvers: [NutResolver(), UniUIResolver()],
    extensions: ['vue'],
    deep: true,
    directoryAsNamespace: true,
    dts: resolve(getRootPath(), 'typings/components.d.ts'),
  }),
]
