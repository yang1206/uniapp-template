import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import { setupStore } from '@/store'
import 'uno.css'
import '@/styles/reset.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  setupStore(app)
  return {
    app,
  }
}
