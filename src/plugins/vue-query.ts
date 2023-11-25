import { VueQueryPlugin } from '@tanstack/vue-query'
import type { Plugin } from 'vue'
import { vueQueryPluginOptions } from '@/service'

export const vueQueryPlugin: Plugin = {
  install: (app) => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
