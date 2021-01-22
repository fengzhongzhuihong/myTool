let enquireJs: any;
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: any) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquireJs = require('enquire.js');
}

const mobileQuery = 'only screen and (max-width: 767.99px)';

export function enquireScreen(cb: (flag?: boolean) => void, query: string = mobileQuery) {
  if (!enquireJs) {
    return;
  }

  const handler = {
    match: () => {
      cb && cb(true);
    },
    unmatch: () => {
      cb && cb();
    },
  };
  enquireJs.register(query, handler);
  return handler;
}

export function unenquireScreen(handler: any, query: string = mobileQuery) {
  if (!enquireJs) {
    return;
  }
  enquireJs.unregister(query, handler);
}

export default {
  enquireJs,
  unenquireScreen,
  enquireScreen
};
