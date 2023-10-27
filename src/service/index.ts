import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'
import { showNetworkError } from './helper'
import { DefaultBaseUrl, DefaultHeaders } from '@/constants'
import { useAuthStore } from '@/store'

const request = createAlova({
  baseURL: DefaultBaseUrl,
  timeout: 1000 * 60 * 5,

  ...AdapterUniapp(),
  async beforeRequest(method) {
    const authStore = useAuthStore()
    method.config.headers = {
      'token': authStore.token,
      'X-Token': authStore.token,
      'X-Access-Token': authStore.token,
      ...method.config.headers,
      ...DefaultHeaders,
    }
  },
  responded: {
    onSuccess: async (response, _method) => {
      const { data } = response as UniNamespace.RequestSuccessCallbackResult

      return data || null
    },
    onError: (error, methodInstance) => {
      showNetworkError({
        config: methodInstance,
      })
      return Promise.reject(error)
    },
  },
})

export default request
