"use strict";
const common_vendor = require("../common/vendor.js");
class Alogrithm {
  CaptureThendelete(obj, matching) {
    let i;
    for (i = obj.length; i > 1; i--) {
      if (obj[i] == matching) {
        break;
      }
    }
    common_vendor.index.__f__("log", "at Tool/Algorithm.ts:9", i);
    obj = obj.substring(0, i);
    return obj;
  }
  Countpathnumber(obj) {
    let i = 0;
    for (i = obj.length; i > 1; i--) {
      if (obj[i] == "/")
        break;
    }
    return obj.length - i;
  }
}
exports.Alogrithm = Alogrithm;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/Algorithm.js.map
