"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addbtn",
  setup(__props) {
    let changed = common_vendor.ref(true);
    let deltext = common_vendor.ref("删除");
    let delchanged = common_vendor.ref(false);
    let deltimgsrc = common_vendor.ref("/static/del.png");
    function upfile() {
      common_vendor.index.$emit("Upfile");
    }
    function cancelDelChanged() {
      common_vendor.index.$emit("isDelChang", false);
      DelChanged(false);
    }
    function Delfiles() {
      common_vendor.index.__f__("log", "at complet/addbtn.vue:56", "delcilked");
      common_vendor.index.$emit("Delclicked");
    }
    function Delfilelist() {
      DelChanged(true);
      common_vendor.index.$emit("isDelChang", true);
    }
    function DelChanged(stuats) {
      if (stuats == false) {
        delchanged.value = false;
        deltext.value = "删除";
      } else {
        deltext.value = "确认删除";
        delchanged.value = true;
      }
    }
    function Upperlevel() {
      common_vendor.index.$emit("upperlevel");
    }
    function addfile() {
      common_vendor.index.$emit("filechanged", true);
    }
    function bthclick() {
      setTimeout(() => {
        changed.value = false;
      }, 500);
    }
    function backclick() {
      changed.value = true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(changed)
      }, common_vendor.unref(changed) ? {
        b: common_vendor.o(bthclick)
      } : common_vendor.e({
        c: common_assets._imports_0,
        d: common_vendor.o(backclick),
        e: common_assets._imports_1,
        f: common_vendor.o(Upperlevel),
        g: common_vendor.unref(delchanged)
      }, common_vendor.unref(delchanged) ? {
        h: common_assets._imports_2,
        i: common_vendor.o(cancelDelChanged)
      } : {}, {
        j: common_vendor.unref(deltimgsrc),
        k: common_vendor.o(($event) => !common_vendor.unref(delchanged) ? Delfilelist() : Delfiles()),
        l: common_vendor.t(common_vendor.unref(deltext)),
        m: common_assets._imports_3,
        n: common_vendor.o(addfile),
        o: common_assets._imports_4,
        p: common_vendor.o(upfile)
      }));
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef2b36d6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/complet/addbtn.js.map
