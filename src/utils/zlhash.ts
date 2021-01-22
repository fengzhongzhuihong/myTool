/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1-BETA Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
/*
 * Configurable letiables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
let hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase     */
let chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode    */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s: string) {
  return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x: any[], len: number) {
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - (len % 32));
  x[(((len + 64) >> 9) << 4) + 15] = len;
  let w = Array(80);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  let e = -1009589776;
  for (let i = 0; i < x.length; i += 16) {
    let olda = a;
    let oldb = b;
    let oldc = c;
    let oldd = d;
    let olde = e;
    for (let j = 0; j < 80; j++) {
      if (j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      let t = safe_add(
        safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
        safe_add(safe_add(e, w[j]), sha1_kt(j)),
      );
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t: number, b: number, c: number, d: number) {
  if (t < 20) return (b & c) | (~b & d);
  if (t < 40) return b ^ c ^ d;
  if (t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t: number) {
  return t < 20
    ? 1518500249
    : t < 40
    ? 1859775393
    : t < 60
    ? -1894007588
    : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x: number, y: number) {
  let lsw = (x & 0xffff) + (y & 0xffff);
  let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num: number, cnt: number) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str: string) {
  let bin = Array();
  let mask = (1 << chrsz) - 1;
  for (let i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
  }
  return bin;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray: any) {
  const hexTab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
  let str = '';
  for (let i = 0; i < binarray.length * 4; i++) {
    str +=
      hexTab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
      hexTab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
  }
  return str;
}

/**
 * 生成唯一标识uuid
 * @returns {string}
 */
function uuid() {
  let s: any[] = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  return s.join('');
}

/**
 * 对字符串进行加密操作
 * @param {string} x 需要进行加密的字符串
 */
const test = (x: string) => {
  return hex_sha1(x);
};

const getUuid = () => uuid();

const zlhash = {
  getUuid,
  test,
};

export default zlhash;
