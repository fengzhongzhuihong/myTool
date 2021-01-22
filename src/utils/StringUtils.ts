export default class stringUtils {
  /**
   * 将参数中的null，''等属性删除掉
   * @param params 需要判断的对象
   */
  static buildParamsNull(params: any) {
    const newParams: any = {};
    if (params) {
      Object.keys(params).forEach((key) => {
        if (this.isExit(params[key])) {
          newParams.key = params[key];
        }
      });
    }
    return newParams;
  }

  /**
   * 判断是否存在
   * @param str 需要判断的参数
   */
  static isExit(str?: string | number) {
    if (str === '') {
      return false;
    }
    if (str === 0) {
      return true;
    }
    return str;
  }

  /**
   * 版本号比较方法
   * 传入两个字符串，当前版本号：curV；比较版本号：reqV
   * 调用方法举例：compare("1.1","1.2")，将返回false
   * @param locV 本地版本
   * @param serV 服务端版本
   * @return {boolean}
   */
  static compareVer(locV: string, serV: string) {
    if (locV && serV) {
      // 将两个版本号拆成数字
      const arr1 = serV.split('.');
      const arr2 = locV.split('.');
      const minLength = Math.min(arr1.length, arr2.length);
      let position = 0;
      let diff = 0;
      // 依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
      // eslint-disable-next-line no-cond-assign
      while (
        position < minLength &&
        (diff = parseInt(arr1[position], 10) - parseInt(arr2[position], 10)) ===
          0
      ) {
        position++;
      }
      diff = diff !== 0 ? diff : arr1.length - arr2.length;
      // 若curV大于reqV，则返回true
      return diff > 0;
    }
    return false;
  }
}
