"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TreeNode {
  constructor(res) {
    __publicField(this, "_res");
    this._res = res;
  }
  GetNodes(where) {
    var treehead = this._res[where];
    return treehead;
  }
  GetNode(where) {
    var treehead = this._res[where];
    return treehead;
  }
  //    public GetMode<T extends IMode>():T{
  // }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/TreeNode.js.map
