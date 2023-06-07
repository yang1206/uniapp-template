import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
    },
  },

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
    custom: true,
  },

})
