"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
class BaseGetapi {
  constructor(apiurl) {
    __publicField(this, "_apiurl");
    this._apiurl = apiurl;
  }
  async Getapi() {
    try {
      const res = await common_vendor.index.request({
        method: "GET",
        url: this._apiurl
      });
      if (res.statusCode !== 200) {
        throw new Error(`HTTP 错误码: ${res.statusCode}`);
      }
      return res.data;
    } catch (err) {
      common_vendor.index.__f__("error", "at Api/BaseGetapi.ts:24", `API 访问失败 [${this._apiurl}]:`, err);
      throw new Error(`请求异常: ${err instanceof Error ? err.message : "未知错误"}`);
    }
  }
}
exports.BaseGetapi = BaseGetapi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Api/BaseGetapi.js.map
