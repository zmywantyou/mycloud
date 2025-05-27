"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
const Tool_Path = require("../Tool/Path.js");
const Tool_CreateUrl = require("../Tool/CreateUrl.js");
const Api_BasePostapi = require("../Api/BasePostapi.js");
class GiteeOperationSever {
  constructor(Store) {
    __publicField(this, "Store");
    __publicField(this, "Postapi");
    if (Store === void 0)
      throw new Error("Store is null");
    this.Store = Store;
  }
  async UpNewFile(nowpath, callback) {
    let Store = this.Store;
    common_vendor.wx$1.chooseMessageFile({
      count: 10,
      type: "all",
      success(res) {
        const tempFilePaths = res.tempFiles;
        const uploadPromises = tempFilePaths.map((tempFilepath) => {
          return new Promise((resolve, reject) => {
            common_vendor.wx$1.getFileSystemManager().readFile({
              filePath: tempFilepath.path,
              encoding: "base64",
              success: (res2) => {
                var base64 = res2.data;
                let create = new Tool_CreateUrl.CreateUrl(Store);
                create.Path = Tool_Path.Path.joint(nowpath, tempFilepath.name);
                let url = create.Create(Tool_CreateUrl.Getype.PostNewFile);
                common_vendor.index.__f__("log", "at severs/GiteeOperationSever.ts:38", "create url is" + url);
                create.setpostdata = base64;
                common_vendor.wx$1.request({
                  url,
                  method: "POST",
                  data: create.postdata,
                  success: resolve,
                  fail: (err) => reject(err)
                });
              },
              fail: (err) => reject(err)
            });
          });
        });
        callback.CallbackOperation(true, uploadPromises);
      }
    });
  }
  async DeteFiles(items) {
    let create = new Tool_CreateUrl.CreateUrl(this.Store);
    create.Sha = items.sha;
    create.Path = items.path;
    const url = create.Create(Tool_CreateUrl.Getype.Delfile);
    common_vendor.index.__f__("log", "at severs/GiteeOperationSever.ts:65", url);
    this.Postapi = new Api_BasePostapi.BasePostapi(url);
    return this.Postapi.Postapi("DELETE");
  }
  async CreateNewFile(filename, nowpath) {
    try {
      let create = new Tool_CreateUrl.CreateUrl(this.Store);
      let pathurl = Tool_Path.Path.joint(nowpath, filename);
      create.Path = Tool_Path.Path.joint(pathurl, ".keep");
      var url = create.Create(Tool_CreateUrl.Getype.PostNewFile);
      common_vendor.index.__f__("log", "at severs/GiteeOperationSever.ts:75", url);
      this.Postapi = new Api_BasePostapi.BasePostapi(url);
      this.Postapi.Postdata = create.postdata;
      await this.Postapi.Postapi();
    } catch (err) {
      throw err;
    }
  }
}
exports.GiteeOperationSever = GiteeOperationSever;
//# sourceMappingURL=../../.sourcemap/mp-weixin/severs/GiteeOperationSever.js.map
