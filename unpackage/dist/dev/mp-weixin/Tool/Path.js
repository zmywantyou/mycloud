"use strict";
const common_vendor = require("../common/vendor.js");
class Path {
  static joint(rpath, lpath) {
    common_vendor.index.__f__("log", "at Tool/Path.ts:4", "rpath is", rpath, "lpath is", lpath);
    if (rpath == void 0)
      return lpath;
    if (rpath.length == 0)
      return lpath;
    if (rpath.length > 0)
      return rpath + "/" + lpath;
    if (lpath.length == 0)
      return rpath;
    throw new Error("path is worth");
  }
}
exports.Path = Path;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/Path.js.map
