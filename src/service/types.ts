import type { UnConfig, UnError, UnResponse } from '@uni-helper/uni-network'

type IUnShowErrorType_ = 'toast' | 'modal'

type IUnRequestData_ = Record<string, any>

interface IUnResponseData_ {
  success: boolean
  code: string
  message: string
  [key: string]: any
}

interface IUnConfig_<T = IUnResponseData_, D = IUnRequestData_> extends UnConfig<T, D> {
  showError?: boolean
  showErrorType?: IUnShowErrorType_
}
interface IUnResponse_<T = IUnResponseData_, D = IUnRequestData_> extends UnResponse<T, D> {}

type IUnPromise_<T = IUnResponseData_, D = IUnRequestData_> = Promise<IUnResponse_<T, D>>

interface IUnError_<T = IUnResponseData_, D = IUnRequestData_> extends UnError<T, D> {
  response?: IUnResponse_<T, D>
}

export type {
  IUnShowErrorType_ as IUnShowErrorType,
  IUnRequestData_ as IUnRequestData,
  IUnResponseData_ as IUnResponseData,
  IUnConfig_ as IUnConfig,
  IUnResponse_ as IUnResponse,
  IUnPromise_ as IUnPromise,
  IUnError_ as IUnError,
}

declare global {
  type IUnShowErrorType = IUnShowErrorType_
  interface IUnRequestData extends IUnRequestData_ {}
  interface IUnResponseData extends IUnResponseData_ {}
  interface IUnConfig<T = IUnResponseData_, D = IUnRequestData_> extends IUnConfig_<T, D> {}
  interface IUnResponse<T = IUnResponseData_, D = IUnRequestData_> extends IUnResponse_<T, D> {}
  type IUnPromise<T = IUnResponseData_, D = IUnRequestData_> = IUnPromise_<T, D>
  interface IUnError<T = IUnResponseData_, D = IUnRequestData_> extends IUnError_<T, D> {}
}
