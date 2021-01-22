import { ITablePage, IOptions2 } from '../@types/IZlData';

/**
 * 当前页是否是最后一页
 * @param data
 */
export const isLastPageData = (data: ITablePage<any>): boolean => {
  if (Object.keys(data).length > 0) {
    // 判断当前数据是否是最后一条
    const { records, current } = data;
    // 如果当前只有一条数据了并且当前页数大于一页
    return records.length === 1 && current > 1;
  }
  return false;
};

/**
 * 说明：生成翻页配置数据
 * @author tangbin
 * @date 2019/2/14
 * @time 16:36
 * @param data 后台传递的数据
 */
export const buildPageConfig = (data: ITablePage<any>) => ({
  // 设置第几页
  current: data.current || 0,
  // 设置每页条数
  pageSize: data.size || 0,
  // 设置总页数
  total: data.total || 0,
  // 页数跳转
  showQuickJumper: true,
  //是否支持切换每页的大小
  showSizeChanger: false,
  // 总页数显示
  showTotal: (total: number, range: number[]) =>
    `${total} 条数据中的第${range[0]}-${range[1]}条 `,
});

/**
 * 判断是否照片文件
 * @param filename
 */
export const isImageFile = (filename: string) => {
  const rgx = '(JPEG|jpeg|JPG|jpg|gif|GIF|HEIC|heic|BMP|bmp|PNG|png)$';
  const re = new RegExp(rgx, 'i');
  const fileExt = filename.replace(/.+\./, '');
  return re.test(fileExt);
};

/**
 * 构建钱的数值转换
 * @param str 需要转换的金钱
 * @return {string} 转成功了的
 */
export const buildMoneyStr = (str: string) => {
  if (!str) return 0;
  // 先找到小数点的位置
  let smallMoney = '';
  let money = '';
  if (str.indexOf('.') > 0) {
    smallMoney = str.substring(str.indexOf('.'));
    // 计算前面那部分的钱
    money = str.substring(0, str.indexOf('.'));
  } else {
    money = str;
  }
  let num = (money || 0).toString();
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result + smallMoney;
  }
  return result;
};

/**
 * 获取url的参数
 */
export function getUrlParams<T = any>(url = window.location.href): T {
  const theRequest: any = {};
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1];
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

/**
 * param 将要转为URL参数字符串的对象
 * prefix URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * return URL参数字符串
 */
export function urlEncode(param: any, prefix?: string, encode: boolean = true) {
  if (param == null) return '';
  let paramStr = '';
  const t: string = typeof param;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `&${prefix}=${encode ? encodeURIComponent(param) : param}`;
  } else {
    Object.keys(param).forEach((key) => {
      key =
        prefix == null
          ? key
          : prefix + (param instanceof Array ? `[${key}]` : `.${key}`);
      paramStr += urlEncode(param[key], key, encode);
    });
  }
  return paramStr;
}

/**
 * 将数据中的''转换成指定的字符串
 * @param obj 需要转换的对象
 * @param str 需要转换的字符串，默认是无
 */
export function buildNullStr<T = any>(obj: any, str = '无'): T {
  const newObj: any = obj;
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] === '') {
      newObj[key] = str;
    }
  });
  return newObj;
}

/**
 * 获取最近几年的年份
 * @param num 几年？默认三年
 */
export function getYearOpt(num: number = 3) {
  // 新的年份数据
  const newYearList: IOptions2[] = [];
  // 获得今年的年份
  const year = new Date().getFullYear();
  for (let i = 0; i < num; i += 1) {
    const yearObj = {
      id: year + i,
      text: year + i,
    };
    newYearList.push(yearObj);
  }
  return newYearList;
}

/**
 * 从optList中筛选出目标对象
 * @param s 需要筛选的目标字符串
 * @param optList 目标数组
 * @param key 数据的下标
 */
export const getListId = (s: string, optList: IOptions2[], key: string) => {
  if (optList.length === 0 || !s) return null;
  const classList: any = optList.filter((item) => item.text === s);
  if (classList.length > 0) {
    return classList[0][key];
  }
  return null;
};

export const urlToList = (url?: string): string[] => {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter((i) => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`,
  );
};

/**
 * 常用颜色
 */
export const zlColor = [
  '#fa541c',
  '#ffa940',
  '#ffc53d',
  '#d4b106',
  '#7cb305',
  '#08979c',
  '#1d39c4',
  '#eb2f96',
];

export default {
  buildMoneyStr,
  buildPageConfig,
  isImageFile,
  getUrlParams,
  urlEncode,
  buildNullStr,
  getYearOpt,
  getListId,
  urlToList,
  isLastPageData,
  zlColor,
};
