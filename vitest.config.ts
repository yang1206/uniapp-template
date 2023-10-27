import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(
  (env) => {
    return {
      ...viteConfig(env),
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        singleThread: true,
      },
    }
  },
)
