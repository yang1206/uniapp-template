import type { AjaxRequestConfig, AjaxResponse } from 'uni-ajax'
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AjaxRequestConfig) => AjaxRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: AjaxResponse) => AjaxResponse
  responseInterceptorsCatch?: (err: any) => any
}

// 自定义传入的参数
export interface RequestConfig<T = AjaxResponse> extends AjaxRequestConfig {
  interceptors?: RequestInterceptors<T>
}
export interface CancelRequestSource {
  [index: string]: () => void
}
