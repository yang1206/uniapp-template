declare module 'uview-plus'
interface Uni {
  $u: {
    $parent: {
      call: any
    }
    addStyle: (style: Object | string, target?: 'object' | 'string' = 'object') => any
    addUnit: (value: style | number, unit?: 'px') => string
    color: {
      borderColor: string
      contentColor: string
      default: string
      error: string
      info: string
      lightColor: string
      mainColor: string
      primary: string
      success: string
      tipsColor: string
      warning: string
    },
    colorGradient: Function
    colorToRgba: (color2, alpha) => {}
    config: {
      type: unknown[]
      color: Record<string, unknown>[]
      unit: "px" | 'rpx' | 'rem'
      v: number
      version: number
    }
    date: Function
    debounce: (func2) => {}
    deepClone: (obj) => {}
    deepMerge: Function
    error: (err) => {}
    formValidate: (instance, event) => any
    getDuration: (value) => void
    getProperty: (obj, key) => void
    getPx: (value: any) => any
    guid: () => void
    hexToRgb: (sColor) => void
    http: any
    mixin: {
      beforeDestroy: any
      computed: any
      created: any
      data: any
      methods: any
      onLoad: any
      onReachBottom: any
      props: any
    }
    mpMixin: {
      options: {
        virtualHost: boolean
      }
    }
    os: () => any
    padZero: () => any
    page: () => string
    pages: () => any
    platform: string
    priceFormat: (number2) => number
    props: any
    queryParams: () => any
    random: (min, max) => number
    randomArray: () => []
    range: (min, max, value) => any
    rgbToHex: (rgb) => any
    route: (object: {
      type: string,
      url: string,
      delta: number,
      params: Object,
      animationType: string,
      animationDuration: number
    }) => void
    setConfig: (_ref23) => void
    setProperty: (obj, key, value) => void
    sleep: (value: number) => Promise<any>
    sys: () => any
    test: {
      amount: (value) => boolean
      array: (value) => boolean
      carNo: (value) => boolean
      chinese: (value: string) => boolean
      code: (value: string, len: number) => boolean
      contains: (value: string, param: string) => boolean
      date: (value) => boolean
      dateISO: (value) => boolean
      digits: (value) => boolean
      email: (value: string) => boolean
      empty: (value) => boolean
      enOrNum: (value) => boolean
      func: (value) => boolean
      idCard: (value) => boolean
      image: (value) => boolean
      isEmpty: (value) => boolean
      jsonString: (value) => boolean
      landline: (value) => boolean
      letter: (value) => boolean
      mobile: (value) => boolean
      number: (value) => boolean
      object: (value) => boolean
      promise: (value) => boolean
      range: (value, param) => boolean
      rangeLength: (value: number, array: Array) => boolean
      regExp: (value) => boolean
      string: (value) => boolean
      url: (value) => boolean
      video: (value) => boolean
    }
    throttle: (func2: Function, timer: number) => void
    timeFormat: (value: any, format: string) => any
    timeFrom: () => any
    toast: (title: string) => void
    trim: (str, pos) => any
    type2icon: () => any
    zIndex: {
      indexListSticky: number
      mask: number
      navbar: number
      noNetwork: number
      popup: number
      sticky: number
      toast: number
      topTips: number
    }
  }
}
interface file {
  size: number,
  thumb: string,
  type: string,
  url: string
}
interface UUpload {
  file: file | file[],
  index: number,
  name: string
}