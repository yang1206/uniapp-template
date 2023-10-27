import type { Method } from 'alova'

export interface BaseRes<T = any> {
  code: number
  msg: string
  data: T
  [key: string]: unknown
}
let hasModal = false
export function showNetworkError({
  hasPrefix = true,
  message,
  config,
  response,
  type = 'modal' as 'toast' | 'modal',
  success,
  fail,
  complete,
}:
| {
  hasPrefix?: boolean
  message?: string
  config?: Method
  response?: UniNamespace.RequestSuccessCallbackResult
  type?: 'modal'
  success?: UniApp.ShowModalOptions['success']
  fail?: UniApp.ShowModalOptions['fail']
  complete?: UniApp.ShowModalOptions['complete']
}
| {
  hasPrefix?: boolean
  message?: string
  config?: Method
  response?: UniNamespace.RequestSuccessCallbackResult
  type: 'toast'
  success?: UniApp.ShowToastOptions['success']
  fail?: UniApp.ShowToastOptions['fail']
  complete?: UniApp.ShowToastOptions['complete']
} = {}) {
  // method
  const method
    = config?.type
    ?? ''
  const methodText = method ? `请求方法：${method}` : ''

  // url
  const url
    = config?.url

    ?? ''
  const urlText = url ? `请求地址：${url}` : ''

  // statusCode
  const statusCode
    = response?.statusCode
    ?? (response?.data as BaseRes)?.code
    ?? 0
  const statusCodeText = statusCode ? `状态代码：${statusCode}` : ''

  // errorCode
  const errorCode
    = response?.statusCode
    ?? (response?.data as BaseRes)?.code
    ?? ''
  const errorCodeText = errorCode ? `错误代码：${errorCode}` : ''

  // errorMessage
  const errorMessage
    = message
    ?? response?.errMsg
    ?? (response?.data as BaseRes)?.msg
    ?? ''
  const errorMessageText = errorMessage ? `错误信息：${errorMessage}` : ''

  const content = `${[
    hasPrefix ? '发生了错误。' : '',
    errorMessageText,
    errorCodeText,
    methodText,
    urlText,
    statusCodeText,
  ]
    .filter(item => !!item)
    .join('\r\n')}`

  if (type === 'toast') {
    uni.showToast({
      title: content,
      success,
      fail,
      complete,
    })
    return
  }
  if (type === 'modal' && !hasModal) {
    hasModal = true
    uni.showModal({
      title: '错误',
      content,
      success: (result) => {
        success?.(result)
        hasModal = false
      },
      fail: (result) => {
        fail?.(result)
        hasModal = false
      },
      complete,
    })
  }
}
