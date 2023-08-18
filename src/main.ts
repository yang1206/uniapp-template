import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import 'uno.css'
import '@/styles/reset.css'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
