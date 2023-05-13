import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import useUniManifest from '@uni-helper/vite-plugin-uni-manifest'
import ViteRestart from 'vite-plugin-restart'
import Inspect from 'vite-plugin-inspect'
import unplugins from './unplugin'

export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins = [
    ...unplugins,
    uni(),
    unocss(),
    uniPages({
      mergePages: true,
    }),
    Inspect(), // vite分析工具
    ViteRestart({
      restart: [
        'pages.config.[jt]s',
        'manifest.config.[jt]s',
        'unocss.config.[jt]s',
      ],
    }),
    useUniManifest(),
  ]
  return plugins
}
