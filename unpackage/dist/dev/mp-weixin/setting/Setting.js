"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
class Setting {
  constructor() {
    __publicField(this, "_Stroemode");
  }
  //private _Isup:boolean;
  set OutStromode(value) {
    this._Stroemode = value;
  }
  GetWxChanel(pagekey, where) {
    let re;
    re = common_vendor.wx$1.getStorageSync(pagekey);
    if (re == null || re == void 0)
      throw new Error("chanel is no value");
    if (re[where] == void 0)
      throw new Error("chanel is underfind");
    return re[where];
  }
  DelWxChanel(pagekey) {
    common_vendor.wx$1.removeStorage({
      key: pagekey,
      success() {
        common_vendor.index.__f__("log", "at setting/Setting.ts:36", pagekey + "be removed");
      },
      fail(err) {
        common_vendor.index.__f__("log", "at setting/Setting.ts:39", err);
      }
    });
  }
  //通把数据存储在内存中实现通道传递
  async SetWxChanel(pagekey, data) {
    common_vendor.wx$1.setStorage({
      key: pagekey,
      data,
      success: function() {
      }
    });
  }
  Wxstore() {
    if (this._Stroemode == void 0)
      throw new Error("Stromode is undefined");
    let jsonstr = JSON.stringify(this._Stroemode);
    common_vendor.wx$1.setStorageSync("userInfo", jsonstr);
  }
  GetWxStore() {
    let str = common_vendor.wx$1.getStorageSync("userInfo");
    if (str == null) {
      throw new Error("getwxstore is null");
    } else
      return str;
  }
  DeletWxStroe() {
    common_vendor.wx$1.removeStorageSync("userInfo");
  }
}
exports.Setting = Setting;
//# sourceMappingURL=../../.sourcemap/mp-weixin/setting/Setting.js.map
