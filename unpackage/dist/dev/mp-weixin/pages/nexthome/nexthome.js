"use strict";
const common_vendor = require("../../common/vendor.js");
const Api_BaseGetapi = require("../../Api/BaseGetapi.js");
const Tool_TreeNode = require("../../Tool/TreeNode.js");
const Tool_Identifyicon = require("../../Tool/Identifyicon.js");
const setting_Setting = require("../../setting/Setting.js");
const Tool_CreateUrl = require("../../Tool/CreateUrl.js");
const Tool_DownloadFile = require("../../Tool/DownloadFile.js");
if (!Math) {
  (filenameBox + addbtn)();
}
const filenameBox = () => "../../complet/filenameBox.js";
const addbtn = () => "../../complet/addbtn.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "nexthome",
  setup(__props) {
    let files = common_vendor.ref();
    let isfilesnull = common_vendor.ref();
    let setting = new setting_Setting.Setting();
    const Store = setting.GetWxStore();
    let IndentIcon = new Tool_Identifyicon.Indentifyicon("../../static");
    let url = setting.GetWxChanel("nexthome", "url");
    let baseurl = setting.GetWxChanel("nexthome", "path");
    common_vendor.index.$emit("nowurl", baseurl);
    common_vendor.index.$emit("nowpath", url);
    common_vendor.index.$on(baseurl, (data) => {
      common_vendor.index.__f__("log", "at pages/nexthome/nexthome.vue:60", data);
      files.value = data;
    });
    setting.DelWxChanel("nexthome");
    try {
      common_vendor.onMounted(async () => {
        url = new Tool_CreateUrl.CreateUrl(Store).AddKey(url);
        var jsonlist = await new Api_BaseGetapi.BaseGetapi(url).Getapi();
        files.value = new Tool_TreeNode.TreeNode(jsonlist).GetNodes("tree");
      });
      if (files.value != void 0) {
        isfilesnull.value = false;
        throw new Error("files is undefied");
      } else {
        isfilesnull.value = true;
      }
    } catch (err) {
      common_vendor.index.__f__("log", "at pages/nexthome/nexthome.vue:85", err);
    }
    function Skipnexthome(item) {
      common_vendor.index.__f__("log", "at pages/nexthome/nexthome.vue:89", item.path);
      if (item.type == "blob") {
        common_vendor.index.__f__("log", "at pages/nexthome/nexthome.vue:92", item.path);
        var creaturl = new Tool_CreateUrl.CreateUrl(Store);
        creaturl.Name = baseurl + "/" + item.path;
        var url2 = creaturl.Create(Tool_CreateUrl.Getype.GetBlob);
        new Tool_DownloadFile.DownloandFile(url2, item.path);
      }
      if (item.type == "tree") {
        common_vendor.index.__f__("log", "at pages/nexthome/nexthome.vue:100", "had clicked...");
        setting.SetWxChanel("newfile", JSON.parse(`{"url":"${item.url}","path":"${item.path}"}`));
        setting.SetWxChanel("nexthome", JSON.parse(`{"url":"${item.url}","path":"${item.path}"}`));
        common_vendor.index.navigateTo({
          url: "/pages/nexthome/nexthome",
          success() {
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isfilesnull)
      }, common_vendor.unref(isfilesnull) ? {
        b: common_vendor.f(common_vendor.unref(files), (item, k0, i0) => {
          return {
            a: common_vendor.unref(IndentIcon).Indentify(item.type, item.path),
            b: common_vendor.t(item.path),
            c: common_vendor.o(($event) => Skipnexthome(item), item.path),
            d: item.path
          };
        })
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/nexthome/nexthome.js.map
