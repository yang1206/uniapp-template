import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^tm-(.*)': '@/tmui/components/tm-$1/tm-$1.vue',
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
    // navigationStyle: 'custom',
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
