import ajax from 'uni-ajax'
import type { AjaxRequestConfig, AjaxResponse } from 'uni-ajax'

const baseURL = import.meta.env.VITE_BASE_API
export interface BaseRes<T = any> {
  code: number
  msg: string
  data: T
  [key: string]: unknown
}
const request = ajax.create((): AjaxRequestConfig => {
  return {
    baseURL,
    timeout: 1000 * 60 * 5,
    // adapter(config) {
    //   if (config.method === 'GET') {
    //     return new Promise((resolve, reject) => {
    //       const uploadTask = uni.uploadFile({
    //         ...config,
    //         complete: (result) => {
    //           const response = { config, ...result }
    //           !config.validateStatus || config.validateStatus(result.statusCode)
    //             ? resolve(response)
    //             : reject(response)
    //         },
    //       })

    //       config.fetcher?.resolve(uploadTask)
    //     })
    //   }

    //   return ajax.defaults.adapter!(config)
    // },
  }
})

request.interceptors.request.use(
  (config: AjaxRequestConfig) => {
    return config
    // 在发送请求之前做些什么
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response: AjaxResponse<any>) => {
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default request
