"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
const Tool_CreateUrl = require("../Tool/CreateUrl.js");
const setting_Setting = require("../setting/Setting.js");
const Api_BaseGetapi = require("../Api/BaseGetapi.js");
const Tool_TreeNode = require("../Tool/TreeNode.js");
const Tool_Algorithm = require("../Tool/Algorithm.js");
var page = /* @__PURE__ */ ((page2) => {
  page2["Home"] = "RefreshHomePageSave";
  return page2;
})(page || {});
class Farcy {
  Creat(option) {
    switch (option) {
      case "RefreshHomePageSave":
        return new RefreshHomePageSave();
      default:
        throw new Error("no option");
    }
  }
}
class RefreshHomePageSave {
  //private filesystem:fileSystemSever|undefined;
  //private  filetree:Promise<IMode>;
  constructor() {
    __publicField(this, "Create");
    this.Create = new Tool_CreateUrl.CreateUrl(new setting_Setting.Setting().GetWxStore());
  }
  async GetFilstFileListApi() {
    let url = this.Create.Create(Tool_CreateUrl.Getype.Gettree);
    var jsonlist = await new Api_BaseGetapi.BaseGetapi(url).Getapi();
    common_vendor.index.__f__("log", "at severs/RefreshPageSever.ts:37", jsonlist);
    var filetree = new Tool_TreeNode.TreeNode(jsonlist).GetNodes("tree");
    return filetree;
  }
  async GetFileMapApi() {
    let url = this.Create.Mianfilelist;
    var jsonlist = await new Api_BaseGetapi.BaseGetapi(url).Getapi();
    common_vendor.index.__f__("log", "at severs/RefreshPageSever.ts:44", jsonlist);
    var filetree = new Tool_TreeNode.TreeNode(jsonlist).GetNodes("tree");
    return filetree;
  }
  async GetNextFilelistApi(url) {
    url = this.Create.AddKey(url);
    var jsonlist = await new Api_BaseGetapi.BaseGetapi(url).Getapi();
    common_vendor.index.__f__("log", "at severs/RefreshPageSever.ts:51", jsonlist);
    var filetree = new Tool_TreeNode.TreeNode(jsonlist).GetNodes("tree");
    return filetree;
  }
  async RefreshPage(item, isup = false) {
    var mode = item;
    if (isup == true) {
      return await this.GetFileMapApi();
    }
    if (mode.path == "") {
      return await this.GetFilstFileListApi();
    }
    if (new Tool_Algorithm.Alogrithm().Countpathnumber(mode.path) >= 0) {
      return await this.GetNextFilelistApi(mode.url);
    }
    throw new Error("refre is not work");
  }
}
exports.Farcy = Farcy;
exports.page = page;
//# sourceMappingURL=../../.sourcemap/mp-weixin/severs/RefreshPageSever.js.map
