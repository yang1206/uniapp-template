import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import IconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import { NutResolver } from 'nutui-uniapp'
import VueMacros from 'unplugin-vue-macros/vite'
import { getRootPath, getSrcPath } from '../utils'

export default [
  AutoImport({
    imports: ['vue', 'pinia', 'uni-app', uniuseAutoImports()],
    dirs: [resolve(getSrcPath(), 'composables')],
    vueTemplate: true,
    dts: resolve(getRootPath(), 'typings/auto-import.d.ts'),
  }),
  Components({
    resolvers: [NutResolver(), UniUIResolver(), IconsResolver()],
    extensions: ['vue'],
    deep: true,
    directoryAsNamespace: true,
    dts: resolve(getRootPath(), 'typings/components.d.ts'),
  }),
  icons({
    compiler: 'vue3',
  }),
  VueMacros(),
]
