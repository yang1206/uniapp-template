import { resolve } from 'node:path'
import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import uniManifest from '@uni-helper/vite-plugin-uni-manifest'
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import restart from 'vite-plugin-restart'
import { getRootPath } from '../utils'
import unplugins from './unplugin'

export function setupVitePlugins(): PluginOption[] {
  const plugins = [
    uniManifest({ minify: true }),
    uniPages({
      mergePages: true,
      minify: true,
      dts: resolve(getRootPath(), 'typings/uni-pages.d.ts'),
    }),
    uniLayouts(),
    ...unplugins,
    restart({
      restart: [
        'pages.config.[jt]s',
        'manifest.config.[jt]s',
        'uno.config.[jt]s',
      ],
    }),
    unocss(),
    uni({
      vueOptions: {},
    }),
  ]
  return plugins
}
