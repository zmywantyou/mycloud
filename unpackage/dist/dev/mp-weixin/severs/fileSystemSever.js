"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
const Tool_Algorithm = require("../Tool/Algorithm.js");
const Tool_Findflie = require("../Tool/Findflie.js");
const Tool_CreateUrl = require("../Tool/CreateUrl.js");
const setting_Setting = require("../setting/Setting.js");
class fileSystemSever {
  constructor() {
    __publicField(this, "filesystem");
    this.filesystem = common_vendor.ref({
      nowurl: "/",
      mainlist: [],
      list: [],
      index: -1
    });
  }
  //跳转到一页保存的path的
  set Savenowpath(value) {
    this.filesystem.value.nowurl = "/" + value;
  }
  Upperpath() {
    this.filesystem.value.nowurl = new Tool_Algorithm.Alogrithm().CaptureThendelete(this.filesystem.value.nowurl, "/");
  }
  get Getnowpath() {
    var len = this.filesystem.value.nowurl.length;
    return this.filesystem.value.nowurl.slice(1, len);
  }
  set Savenowlist(value) {
    this.filesystem.value.list.push(value);
    this.filesystem.value.index++;
  }
  get Getnowindex() {
    return this.filesystem.value.index;
  }
  get Upperlist() {
    if (this.filesystem.value.index <= 0)
      return [{
        url: "err",
        path: "0",
        mode: "0",
        type: "0",
        sha: "0",
        size: "0"
      }];
    this.filesystem.value.list.pop();
    this.filesystem.value.index--;
    common_vendor.index.__f__("log", "at severs/fileSystemSever.ts:55", this.filesystem.value.index);
    return this.filesystem.value.list[this.filesystem.value.index];
  }
  set SetNowlist(value) {
    this.filesystem.value.list[this.filesystem.value.index] = value;
  }
  set UpdataMainlist(value) {
    this.filesystem.value.mainlist = value;
  }
  get GetNowFileurlFromPath() {
    if (this.filesystem.value.nowurl == "/") {
      return new Tool_CreateUrl.CreateUrl(
        new setting_Setting.Setting().GetWxStore()
      ).Create(Tool_CreateUrl.Getype.Gettree);
    }
    common_vendor.index.__f__("log", "at severs/fileSystemSever.ts:73", "mainlist is", this.filesystem.value.mainlist[0]);
    return new Tool_Findflie.Findflie(this.filesystem.value.mainlist).FindurlFromPath(this.Getnowpath);
  }
}
exports.fileSystemSever = fileSystemSever;
//# sourceMappingURL=../../.sourcemap/mp-weixin/severs/fileSystemSever.js.map
