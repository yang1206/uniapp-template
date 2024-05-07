import { isMpWeixin } from '@uni-helper/uni-env'
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [
    {
      path: 'pages/index/index',
    },
  ],
  globalStyle: {
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: 'uniapp-vite-template',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    navigationStyle: 'custom',
  },
  tabBar: {
    // 支付宝小程序自定义需要特殊处理
    custom: true,
    color: `rgba(${255}, ${255}, ${255}, ${0})` as any,
    selectedColor: `rgba(${255}, ${255}, ${255}, ${0})` as any,
    backgroundColor: `rgba(${255}, ${255}, ${255}, ${0})` as any,
    borderStyle: isMpWeixin ? 'white' : 'rgb(255,255,255,0)' as any,
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home',
      },
      {
        pagePath: 'pages/count/count',
        text: 'Count',
      },
    ],
  },

})
