"use strict";
const common_vendor = require("../../common/vendor.js");
const setting_Setting = require("../../setting/Setting.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "setting",
  props: {
    "keys": { default: "" },
    "keysModifiers": {}
  },
  emits: ["update:keys"],
  setup(__props) {
    let keys = common_vendor.useModel(__props, "keys");
    let isradio = false;
    let warehouse;
    let setting = new setting_Setting.Setting();
    try {
      let store = null;
      store = setting.GetWxStore();
      if (store != null) {
        const json = JSON.parse(store);
        keys.value = json["Key"];
        isradio = json["Isup"];
        warehouse = json["Warehouse"];
      }
    } catch (err) {
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:50", err);
    }
    let noisradio = !isradio;
    function radiochange(e) {
      common_vendor.index.__f__("log", "at pages/setting/setting.vue:54", "radiochange");
      if (e.target.value == "1") {
        isradio = true;
        noisradio = !isradio;
      } else {
        isradio = false;
        noisradio = !isradio;
      }
    }
    function savebth(e) {
      try {
        const bth = e.target;
        bth.textContent = "保存中...";
        let stroemode = {
          Warehouse: warehouse,
          Key: keys.value,
          Isup: isradio
        };
        setting.OutStromode = stroemode;
        setting.Wxstore();
        bth.textContent = "保存";
      } catch (err) {
        common_vendor.index.__f__("log", "at pages/setting/setting.vue:78", err);
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(keys),
        b: common_vendor.o(($event) => common_vendor.isRef(keys) ? keys.value = $event.detail.value : keys = $event.detail.value),
        c: common_vendor.unref(warehouse),
        d: common_vendor.o(($event) => common_vendor.isRef(warehouse) ? warehouse.value = $event.detail.value : warehouse = $event.detail.value),
        e: common_vendor.unref(isradio),
        f: common_vendor.unref(noisradio),
        g: common_vendor.o(radiochange),
        h: common_vendor.o(savebth)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/setting.js.map
