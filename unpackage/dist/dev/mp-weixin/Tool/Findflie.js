"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
class Findflie {
  constructor(mainlist) {
    __publicField(this, "_mainList");
    this._mainList = mainlist;
  }
  FindurlFromPath(path) {
    common_vendor.index.__f__("log", "at Tool/Findflie.ts:9", path);
    var list = this._mainList.find((obj) => obj.path == path);
    if (list == void 0)
      throw new Error("list can not find");
    return list.url;
  }
}
exports.Findflie = Findflie;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/Findflie.js.map
