import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      'nut-(.*)?-(.*)': 'uni-nutui/components/sky-nutui/packages/__VUE/$1$2/index.vue',
      'nut-(.*)': 'uni-nutui/components/sky-nutui/packages/__VUE/$1/index.vue',
      '^vin-(.*)': '@vingogo/uni-ui/components/$1/index.vue',
    },
  },

  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [
    {
      path: 'pages/index/index',
      type: 'page',
    },
    {
      path: 'pages/test/test',
      type: 'page',
    },
    {
      path: 'pages/not-found/index',
      name: 'notfound',
      style: {
        navigationBarTitleText: 'NotFound',
      },
    },
  ],
  globalStyle: {
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#777',
    navigationBarTitleText: 'uniapp-vue3',
    // navigationStyle:'custom'
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
  },

})
