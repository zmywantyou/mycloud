"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
class BasePostapi {
  constructor(apiurl) {
    __publicField(this, "_apiurl");
    __publicField(this, "_header");
    __publicField(this, "_postdata");
    this._apiurl = apiurl;
    this._header = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
      // 示例：添加 Token
    };
  }
  set Postdata(value) {
    this._postdata = value;
  }
  async Postapi(method = "POST") {
    try {
      const response = await common_vendor.index.request({
        url: this._apiurl,
        method,
        header: this._header,
        data: this._postdata,
        timeout: 1e4
        // 超时设置
      });
      if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 304) {
        return response.data;
      } else {
        common_vendor.index.__f__("log", "at Api/BasePostapi.ts:36", response.data);
        throw new Error(`请求失败，状态码：${response.statusCode}`);
      }
    } catch (err) {
      common_vendor.index.__f__("error", "at Api/BasePostapi.ts:40", "API 请求异常:", err);
      throw err;
    }
  }
}
exports.BasePostapi = BasePostapi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Api/BasePostapi.js.map
