import { createSSRApp } from 'vue'
import App from './App.vue'
import tmui from '@/tmui'
import { setupStore } from '@/store'
import 'uno.css'
import '@/styles/reset.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(tmui, {} as Tmui.tmuiConfig)
  setupStore(app)
  return {
    app,
  }
}
