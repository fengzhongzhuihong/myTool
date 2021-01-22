const ArrayUtil = {
  /**
   * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
   * **/
  updateArray: <T = any>(array: T[], item: T) => {
    for (let i = 0, len = array.length; i < len; i++) {
      let temp = array[i];
      if (item === temp) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  },

  /**
   * 将数组中指定元素移除
   * @param array
   * @param item 要移除的item
   * @param id 要对比的属性，缺省则比较地址
   * @returns {*}
   */
  remove: (array: any[], item: any, id: any) => {
    if (!array) return;
    for (let i = 0, l = array.length; i < l; i++) {
      const val = array[i];
      if (item === val || (val && val[id] && val[id] === item[id])) {
        array.splice(i, 1);
      }
    }
    return array;
  },

  /**
   * 判断两个数组的是否相等
   * @return boolean true 数组长度相等且对应元素相等
   * */
  isEqual: (arr1: any[], arr2: any[]) => {
    if (!(arr1 && arr2)) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, l = arr1.length; i < l; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  },

  /**
   * clone 数组
   * @return Array 新的数组
   * */
  clone: (from: any[]) => {
    if (!from) return [];
    let newArray = [];
    for (let i = 0, l = from.length; i < l; i++) {
      newArray[i] = from[i];
    }
    return newArray;
  },

  /**
   *获取两个数组的差集
   * @param arr1
   * @param arr2
   */
  subSet: (arr1: any[], arr2: any[]) => {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const subset = [];
    for (let item of set1) {
      if (!set2.has(item)) {
        subset.push(item);
      }
    }
    return subset;
  },
};

export default ArrayUtil;
