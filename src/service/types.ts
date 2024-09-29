import type { UnConfig, UnError, UnResponse } from '@uni-helper/uni-network'

type IUnShowErrorType_ = 'toast' | 'modal'

type IUnRequestData_ = Record<string, any>

interface IUnResponseData_<T = unknown> {
  code: number
  msg: string
  status: boolean
  data: T
}

interface IUnConfig_<T = IUnResponseData_, D = IUnRequestData_> extends UnConfig<T, D> {
  showError?: boolean
  showErrorType?: IUnShowErrorType_
}
interface IUnResponse_<T = IUnResponseData_, D = IUnRequestData_> extends UnResponse<T, D> { }

type IUnPromise_<T = IUnResponseData_, D = IUnRequestData_> = Promise<IUnResponse_<T, D>>

interface IUnError_<T = IUnResponseData_, D = IUnRequestData_> extends UnError<T, D> {
  response?: IUnResponse_<T, D>
}

export type {
  IUnConfig_ as IUnConfig,
  IUnError_ as IUnError,
  IUnPromise_ as IUnPromise,
  IUnRequestData_ as IUnRequestData,
  IUnResponse_ as IUnResponse,
  IUnResponseData_ as IUnResponseData,
  IUnShowErrorType_ as IUnShowErrorType,
}

declare global {
  type IUnShowErrorType = IUnShowErrorType_
  type IUnResponseData<T = unknown> = IUnResponseData_<T>
  interface IUnRequestData extends IUnRequestData_ { }
  interface IUnConfig<T = IUnResponseData_, D = IUnRequestData_> extends IUnConfig_<IUnResponseData_<T>, D> { }
  interface IUnResponse<T = IUnResponseData_, D = IUnRequestData_> extends IUnResponse_<IUnResponseData_<T>, D> { }
  type IUnPromise<T = IUnResponseData_, D = IUnRequestData_> = IUnPromise_<IUnResponseData_<T>, D>
  interface IUnError<T = IUnResponseData_, D = IUnRequestData_> extends IUnError_<IUnResponseData_<T>, D> { }
}
