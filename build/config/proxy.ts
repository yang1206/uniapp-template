import type { ProxyOptions } from 'vite'

export function createViteProxy(isUseProxy = true, proxyType: ProxyType) {
  if (!isUseProxy)
    return undefined

  const proxyConfig = getProxyConfig(proxyType)

  const proxy: Record<string, string | ProxyOptions> = {
    [proxyConfig.prefix]: {
      target: proxyConfig.target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${proxyConfig.prefix}`), '/'),
    },
  }
  return proxy
}
const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
  dev: {
    prefix: '/app',
    target: 'http://localhost:1206',
  },
  test: {
    prefix: '/api',
    target: 'http://localhost:1206',
  },
  prod: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
}

export function getProxyConfig(envType: ProxyType = 'dev'): ProxyConfig {
  return proxyConfigMappings[envType]
}
