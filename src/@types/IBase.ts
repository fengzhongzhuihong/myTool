/**
 * 路由的定义
 */
export interface IRoute {
  /**
   * 地址
   */
  path: string;
  /**
   * 对应组件地址，相对路径
   */
  component?: string;
  /**
   * 子路由
   */
  routes?: IRoute[];
  Routes?: string[];
  redirect?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 展示的图标
   */
  icon?: string;
  /**
   * 路由权限
   */
  authority?: string[];
  /**
   * 是否隐藏子目录
   */
  hideChildrenInMenu?: boolean;
  [key: string]: any;
}
