"use strict";
const common_vendor = require("../../common/vendor.js");
const Tool_Identifyicon = require("../../Tool/Identifyicon.js");
if (!Math) {
  (filesystem + filenameBox + addbtn)();
}
const filesystem = () => "../../complet/filesystem.js";
const filenameBox = () => "../../complet/filenameBox.js";
const addbtn = () => "../../complet/addbtn.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    let Deldivstyle = common_vendor.ref({
      background: "#f0f0f0",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "20px",
      borderRadius: "8px"
    });
    let files = common_vendor.ref();
    let Delfilelist = common_vendor.ref([]);
    let isfilesnull = common_vendor.ref(false);
    common_vendor.ref();
    let IndentIcon = new Tool_Identifyicon.Indentifyicon("../../static");
    let Isdelteing = common_vendor.ref(false);
    common_vendor.index.__f__("log", "at pages/home/home.vue:63", "this home");
    common_vendor.index.$on("Getfillist/", (re) => {
      Delfilelist.value = [];
      Updatafilelist(re);
    });
    function BtnNextpath(item) {
      if (item.type == "tree")
        common_vendor.index.$emit("Postfilest/path/tree", item);
      if (item.type == "blob")
        common_vendor.index.$emit("Postfilest/path/blob", item);
    }
    function BtDetFile(item) {
      Delfilelist.value.push(item);
    }
    common_vendor.index.$on("Delclicked", () => {
      common_vendor.index.__f__("log", "at pages/home/home.vue:81", "delcilked");
      common_vendor.index.$emit("DelOperation", Delfilelist.value);
    });
    common_vendor.index.$on("isDelChang", (re) => {
      if (re == true) {
        common_vendor.index.__f__("log", "at pages/home/home.vue:86", "had cl");
        Isdelteing.value = true;
      } else {
        Isdelteing.value = false;
        Delfilelist.value = [];
      }
    });
    function Updatafilelist(re) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:96", re);
      files.value = re;
      Isfilstnull(files);
    }
    function Isfilstnull(files2) {
      if (files2.value == void 0) {
        isfilesnull.value = false;
      } else
        isfilesnull.value = true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isfilesnull)
      }, common_vendor.unref(isfilesnull) ? {
        b: common_vendor.f(common_vendor.unref(files), (item, k0, i0) => {
          return {
            a: common_vendor.unref(IndentIcon).Indentify(item.type, item.path),
            b: common_vendor.t(item.path),
            c: common_vendor.s(common_vendor.unref(Isdelteing) ? common_vendor.unref(Delfilelist).includes(item) ? common_vendor.unref(Deldivstyle) : {} : {}),
            d: common_vendor.o(($event) => common_vendor.unref(Isdelteing) ? BtDetFile(item) : BtnNextpath(item), item.path),
            e: item.path
          };
        })
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
