let hasModal = false
export function showNetworkError({
  hasPrefix = true,
  message,
  response,
  error,
  type = 'modal' as IUnShowErrorType,
  success,
  fail,
  complete,
}:
| {
  hasPrefix?: boolean
  message?: string
  response?: IUnResponse
  error?: IUnError
  type?: 'modal'
  success?: UniApp.ShowModalOptions['success']
  fail?: UniApp.ShowModalOptions['fail']
  complete?: UniApp.ShowModalOptions['complete']
}
| {
  hasPrefix?: boolean
  message?: string
  response?: IUnResponse
  error?: IUnError
  type: 'toast'
  success?: UniApp.ShowToastOptions['success']
  fail?: UniApp.ShowToastOptions['fail']
  complete?: UniApp.ShowToastOptions['complete']
} = {}) {
  // method
  const method
    = error?.config?.method
    ?? error?.task?.method
    // @ts-expect-error no types
    ?? error?.method
    ?? response?.config?.method
    ?? response?.task?.method
    // @ts-expect-error no types
    ?? response?.method
    ?? ''
  const methodText = method ? `请求方法：${method}` : ''

  // url
  const url
    = error?.config?.url
    ?? error?.task?.url
    // @ts-expect-error no types
    ?? error?.url
    ?? response?.config?.url
    ?? response?.task?.url
    // @ts-expect-error no types
    ?? response?.url
    ?? ''
  const urlText = url ? `请求地址：${url}` : ''

  // statusCode
  const statusCode
    = error?.status
    // @ts-expect-error no types
    ?? error?.statusCode
    // @ts-expect-error no types
    ?? error?.data?.status
    // @ts-expect-error no types
    ?? error?.data?.statusCode
    // @ts-expect-error no types
    ?? error?.data?.code
    ?? response?.status
    // @ts-expect-error no types
    ?? response?.statusCode
    ?? response?.data?.status
    ?? response?.data?.code
    // @ts-expect-error no types
    ?? response?.data?.statusCode
    ?? 0
  const statusCodeText = statusCode ? `状态代码：${statusCode}` : ''

  // errorCode
  const errorCode
    = error?.code
    // @ts-expect-error no types
    ?? error?.errno
    // @ts-expect-error no types
    ?? error?.data?.code
    // @ts-expect-error no types
    ?? error?.data?.errno
    // @ts-expect-error no types
    ?? response?.code
    ?? response?.errno
    ?? response?.data?.code
    // @ts-expect-error no types
    ?? response?.data?.errno
    ?? ''
  const errorCodeText = errorCode ? `错误代码：${errorCode}` : ''

  // errorMessage
  const errorMessage
    // @ts-expect-error no types
    = error?.data?.errMsg
    // @ts-expect-error no types
    ?? error?.data?.message
    // @ts-expect-error no types
    ?? error?.data?.msg
    // @ts-expect-error no types
    ?? error?.errMsg
    ?? error?.message
    // @ts-expect-error no types
    ?? error?.msg
    // @ts-expect-error no types
    ?? response?.data?.errMsg
    // @ts-expect-error no types
    ?? response?.data?.message
    ?? response?.data?.msg
    ?? response?.errMsg
    // @ts-expect-error no types
    ?? response?.message
    // @ts-expect-error no types
    ?? response?.msg
    ?? message
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
