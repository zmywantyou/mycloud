"use strict";
const common_vendor = require("../common/vendor.js");
class DownLoandPair {
  CutePathEnd(path) {
    var paths = path.split(".");
    var end = paths[paths.length - 1].toLocaleString();
    if (end != null)
      return end;
    else
      throw Error("end is null");
  }
  ShowToastfilepath(path) {
    common_vendor.index.showToast({
      icon: "none",
      mask: true,
      title: "文件已保存：" + path,
      //保存路径
      duration: 3e3
    });
  }
  setTimeout(path) {
    const name = this.CutePathEnd(path);
    common_vendor.index.__f__("log", "at Tool/DownloadFile.ts:22", name);
    setTimeout(() => {
      common_vendor.index.openDocument({
        filePath: path,
        showMenu: true,
        fileType: name
      });
    });
  }
}
class DownloandFile {
  DownFile(url, name) {
    common_vendor.index.downloadFile({
      url,
      fail: (err) => {
        common_vendor.index.__f__("log", "at Tool/DownloadFile.ts:41", "downloadFile fail, err is:", err);
      },
      success: function(res) {
        if (res.statusCode == 200) {
          const fs = common_vendor.index.getFileSystemManager();
          const savedFilePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/${name}`;
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            filePath: savedFilePath,
            fail(err) {
              common_vendor.index.__f__("log", "at Tool/DownloadFile.ts:52", "saveFile fail, err is:", err);
            },
            success: function(data) {
              common_vendor.index.__f__("log", "at Tool/DownloadFile.ts:55", data.savedFilePath);
              new DownLoandPair().ShowToastfilepath(savedFilePath);
              new DownLoandPair().setTimeout(savedFilePath);
            }
          });
        }
      }
    });
  }
  constructor(url, name) {
    common_vendor.index.__f__("log", "at Tool/DownloadFile.ts:64", url);
    this.DownFile(url, name);
  }
}
exports.DownloandFile = DownloandFile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/DownloadFile.js.map
