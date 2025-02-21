import type { PluginOption } from 'vite'
import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import uniManifest from '@uni-helper/vite-plugin-uni-manifest'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import uniPolyfill from 'vite-plugin-uni-polyfill'
import { getRootPath } from '../utils'
import unplugins from './unplugin'

export async function setupVitePlugins(): Promise<PluginOption[]> {
  const unocss = (await import('unocss/vite')).default
  const plugins = [
    uniManifest({ minify: true }),
    uniPages({
      mergePages: true,
      minify: true,
      dts: resolve(getRootPath(), 'typings/uni-pages.d.ts'),
    }),
    uniLayouts(),
    ...unplugins,
    uniPolyfill(),
    unocss(),
    uni({
      vueOptions: {},
    }),
  ]
  return plugins
}
