import { createRouter } from 'uni-native-router' // 导出适配vue3的hooks获取路由钩子方法
import pages from '@/pages.json'
export { useRoute, useRouter } from 'uni-native-router' // 导入路由配置文件

// 创建路由对象
export const router = createRouter({ routes: pages.pages as unknown as Route[] })

// 设置路由器
export function setupRouter(app: any) {
  // 路由请求前拦截
  router.beforeEach!(async (to: any, from: any, next: any) => {
    next()
  })
  // 路由请求后拦截
  router.afterEach!((to: any, from: any) => {
    // 逻辑代码
  })

  return router
}
