import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import unocss from 'unocss/vite'
import uniPages from '@uni-helper/vite-plugin-uni-pages'
import useUniManifest from '@uni-helper/vite-plugin-uni-manifest'
import tmuiCss from '../../src/tmui/tool/vitePlugs/tmuiCss'
import unplugins from './unplugin'
export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins = [
    ...unplugins,
    uni(),
    unocss(),
    tmuiCss(),
    uniPages({
      onAfterScanPages(ctx) {
        return ctx
      },
    }),
    useUniManifest(),
  ]
  return plugins
}
