/**
 * 路由类型定义
 */
declare interface Route {
  path: string;
  name?: string;
  fullPath?: string;
  query: Query;
  [key: string]: any;
}
