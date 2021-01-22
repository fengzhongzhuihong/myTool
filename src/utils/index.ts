
// 数据类型
type IDataType = 'object' | 'array' | 'string';

export const sessionStorageUtils = {

  getStrItem:(key:string)=>{
    return sessionStorageUtils.getItem(key,'string');
  },

  getItem: (key: string, type: IDataType = 'object') => {
    const str = sessionStorage.getItem(key);
    if (str) {
      return type !== 'string' ? JSON.parse(str) : str;
    }
    if (type === 'object') {
      return {};
    }
    if (type === 'array') {
      return [];
    }
    if (type === 'string') {
      return '';
    }
  },

  setItem: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  setStrItem: (key: string, value: any) => {
    sessionStorage.setItem(key, value);
  },

  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },

  existsItem: (key: string) => {
    if (typeof sessionStorage.getItem(key) !== 'undefined') {
      return true;
    }
    return false;
  }
}

export const localStorageUtils = {
  getItem: (key: string, type: IDataType = 'object') => {
    const str = sessionStorage.getItem(key);
    if (str) {
      return type !== 'string' ? JSON.parse(str) : str;
    }
    if (type === 'object') {
      return {};
    }
    if (type === 'array') {
      return [];
    }
    if (type === 'string') {
      return '';
    }
  },

  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },

  existsItem: (key: string) => {
    if (typeof localStorage.getItem(key) !== 'undefined') {
      return true;
    }
    return false;
  }
}

export default {sessionStorageUtils, localStorageUtils};
