import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import useUniManifest from '@uni-helper/vite-plugin-uni-manifest'
import restart from 'vite-plugin-restart'
import unplugins from './unplugin'

export function setupVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] {
  const plugins = [
    ...unplugins,
    unocss(),
    uniPages({
      mergePages: true,
    }),
    restart({
      restart: [
        'pages.config.[jt]s',
        'manifest.config.[jt]s',
        'unocss.config.[jt]s',
      ],
    }),
    useUniManifest(),
    uni(),
  ]
  return plugins
}
