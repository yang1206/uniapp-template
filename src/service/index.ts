import type { AjaxRequestConfig, AjaxResponse } from 'uni-ajax'
import Request from './request'

export const request = new Request({
  baseURL: import.meta.env.VITE_APP_GLOB_BASE_API,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: AjaxRequestConfig) => {
      uni.showLoading({
        title: '正在请求',
      })
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AjaxResponse) => {
      uni.hideLoading()
      return result
    },
    responseInterceptorsCatch: (error) => {
      uni.hideLoading()
      // eslint-disable-next-line no-unused-expressions
      error.response
      return Promise.reject(new Error(error.response.data))
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {HttpRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const HttpRequest = <T = any>(config: AjaxRequestConfig) => {
  return request.request<T>(config)
}
export default HttpRequest
