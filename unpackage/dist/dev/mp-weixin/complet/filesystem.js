"use strict";
const common_vendor = require("../common/vendor.js");
const Tool_Path = require("../Tool/Path.js");
const severs_GiteeOperationSever = require("../severs/GiteeOperationSever.js");
const severs_RefreshPageSever = require("../severs/RefreshPageSever.js");
const severs_fileSystemSever = require("../severs/fileSystemSever.js");
const Tool_CreateUrl = require("../Tool/CreateUrl.js");
const setting_Setting = require("../setting/Setting.js");
const Tool_DownloadFile = require("../Tool/DownloadFile.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "filesystem",
  setup(__props) {
    let Store = new setting_Setting.Setting().GetWxStore();
    let FileSystemSever = new severs_fileSystemSever.fileSystemSever();
    let farcy = new severs_RefreshPageSever.Farcy();
    let Operation = new severs_GiteeOperationSever.GiteeOperationSever(Store);
    let item = {
      url: "",
      path: "",
      mode: "",
      type: "",
      sha: "",
      size: ""
    };
    class Callback {
      CallbackOperation(isclosed, Operation2) {
        if (isclosed == true) {
          common_vendor.index.__f__("log", "at complet/filesystem.vue:34", "ICallback", FileSystemSever.Getnowpath);
          Promise.all(Operation2).then(() => {
            file.RefreshPage(item, true).then((re) => {
              FileSystemSever.UpdataMainlist = re;
              UpdataMainRefreshPage();
              common_vendor.index.showToast({ title: "上传成功" });
            }).catch((err) => {
              throw err;
            });
          }).catch((err) => {
            common_vendor.index.showToast({ title: "文件重复", icon: "none" });
            common_vendor.index.__f__("log", "at complet/filesystem.vue:45", err);
          });
        }
      }
    }
    common_vendor.index.$on("Upfile", () => {
      let callback = new Callback();
      Operation.UpNewFile(FileSystemSever.Getnowpath, callback);
    });
    common_vendor.index.$on("UpdataMainRefreshPage", () => {
      UpdataMainRefreshPage();
    });
    function UpdataMainRefreshPage() {
      var url = FileSystemSever.GetNowFileurlFromPath;
      item.url = url;
      item.path = FileSystemSever.Getnowpath;
      file.RefreshPage(item).then((re) => {
        common_vendor.index.$emit("Getfillist/", re);
        FileSystemSever.SetNowlist = re;
        common_vendor.index.__f__("log", "at complet/filesystem.vue:67", "updatamianrefireshpage is", re);
      });
    }
    common_vendor.index.$on(
      "newfile",
      (filename) => {
        Operation.CreateNewFile(filename, FileSystemSever.Getnowpath).catch((err) => {
          var Thefileexists = 1;
          FiesystemError(Thefileexists);
          common_vendor.index.__f__("log", "at complet/filesystem.vue:79", "opeeration", err);
        }).then(() => {
          file.RefreshPage(item, true).then((re) => {
            FileSystemSever.UpdataMainlist = re;
            UpdataMainRefreshPage();
          }).catch((re) => {
            common_vendor.index.__f__("log", "at complet/filesystem.vue:84", re);
          });
        });
      }
    );
    common_vendor.index.$on("DelOperation", async (re) => {
      common_vendor.index.__f__("log", "at complet/filesystem.vue:90", "DelOperation");
      var relist = re;
      var status = 0;
      for (re of relist) {
        await Operation.DeteFiles(re);
        status++;
      }
      if (status == relist.length) {
        file.RefreshPage(item, true).then((re2) => {
          FileSystemSever.UpdataMainlist = re2;
          UpdataMainRefreshPage();
          common_vendor.index.showToast({ title: "成功删除" });
        });
      }
    });
    function FiesystemError(ErrorNumber) {
      console.log();
      common_vendor.index.$emit("FiesystemError", ErrorNumber);
    }
    function RefreshPage(item2) {
      file.RefreshPage(item2).then((re) => {
        common_vendor.index.$emit("Getfillist/", re);
        FileSystemSever.Savenowlist = re;
      });
      FileSystemSever.Savenowpath = Tool_Path.Path.joint(FileSystemSever.Getnowpath, item2.path);
      common_vendor.index.__f__("log", "at complet/filesystem.vue:138", "当前的路径是", FileSystemSever.Getnowpath);
    }
    let file = farcy.Creat(severs_RefreshPageSever.page.Home);
    RefreshPage(item);
    common_vendor.index.$on("upperlevel", () => {
      FileSystemSever.Upperpath();
      common_vendor.index.$emit("Getfillist/", FileSystemSever.Upperlist);
      item.path = FileSystemSever.Getnowpath;
      common_vendor.index.__f__("log", "at complet/filesystem.vue:146", "当前的路径是", FileSystemSever.Getnowpath);
    });
    common_vendor.index.$on("Postfilest/path/tree", (re) => {
      if (re.type == "tree")
        RefreshPage(re);
    });
    common_vendor.index.$on("Postfilest/path/blob", (re) => {
      if (re.type == "blob") {
        var create2 = new Tool_CreateUrl.CreateUrl(Store);
        create2.Name = Tool_Path.Path.joint(FileSystemSever.Getnowpath, re.path);
        var url = create2.Create(Tool_CreateUrl.Getype.GetBlob);
        new Tool_DownloadFile.DownloandFile(url, re.path);
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/complet/filesystem.js.map
