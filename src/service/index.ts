import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'

const baseURL = import.meta.env.VITE_BASE_API
export interface BaseRes<T = any> {
  code: number
  msg: string
  data: T
  [key: string]: unknown
}
const request = createAlova({
  baseURL,
  timeout: 1000 * 60 * 5,
  ...AdapterUniapp(),
  async beforeRequest({ config }) {

  },
  responded: {
    onSuccess: async (response, method) => {
      const { statusCode, data } = response as UniNamespace.RequestSuccessCallbackResult
      return data || null
    },
    onError: () => {

    },
  },
})

export default request
