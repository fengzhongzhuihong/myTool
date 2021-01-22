/**
 * 用户的信息
 */
export interface IUser {
  // 登录名
  loginName: string;
  // 用户名称
  userName: string;
  // 用户类型
  userType: string;
  // 所在部门名称
  depName: string;
  // 所在部门的编码
  depCode: string;
}

export interface IZlUser extends IUser {
  // QQ
  QQ: string;
  // 手机号
  mobile: string;
  // 用户类型的中文名字
  userTypeName: string;
  // 所在部门的编码
  adminCode: string;
  // 是否需要更新密码
  newPwd: boolean;
  // 未读消息
  unReadCount: number;
  // 头像
  headImgUrl: string;
  // 工单权限
  workAuthority: string;
  // token
  jwtToken: string;
  // 当前用户的权限
  currentAuthority: string[] | string;
  /**
   * @deprecated
   * 账号名
   */
  account: string;
}
