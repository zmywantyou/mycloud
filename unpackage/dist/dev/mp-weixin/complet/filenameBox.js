"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "filenameBox",
  setup(__props) {
    let changed = common_vendor.ref(false);
    let inputvalue = common_vendor.ref("新建文件夹1");
    let textstyle = common_vendor.ref("color: black;");
    textstyle.value = "color: black";
    function cancel() {
      changed.value = false;
      common_vendor.index.$emit("filechanged", false);
    }
    async function maketrue() {
      common_vendor.index.$emit("newfile", inputvalue.value);
    }
    common_vendor.index.$on("FiesystemError", (data) => {
      common_vendor.index.__f__("log", "at complet/filenameBox.vue:37", "fissysemerror is ");
      if (data == 1) {
        textstyle.value = "color: red";
        common_vendor.index.showToast({
          title: "文件重复",
          icon: "none"
        });
      }
    });
    common_vendor.index.$on("filechanged", (data) => {
      textstyle.value = "color: black";
      changed.value = data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(changed)
      }, common_vendor.unref(changed) ? {
        b: common_vendor.s(common_vendor.unref(textstyle)),
        c: common_vendor.unref(inputvalue),
        d: common_vendor.o(($event) => common_vendor.isRef(inputvalue) ? inputvalue.value = $event.detail.value : inputvalue = $event.detail.value),
        e: common_vendor.o(maketrue),
        f: common_vendor.o(cancel)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1319db05"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/complet/filenameBox.js.map
