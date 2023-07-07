import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import uniManifest from '@uni-helper/vite-plugin-uni-manifest'
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import restart from 'vite-plugin-restart'
import unplugins from './unplugin'

export function setupVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] {
  const plugins = [
    ...unplugins,
    unocss(),
    uniPages({
      mergePages: true,
      minify: true,
    }),
    restart({
      restart: [
        'pages.config.[jt]s',
        'manifest.config.[jt]s',
        'unocss.config.[jt]s',
      ],
    }),
    uniManifest({ minify: true }),
    uniLayouts(),
    uni(),
  ]
  return plugins
}
