"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Indentifyicon {
  constructor(path) {
    //传一个使用本组件的vue项目的对于图片的相对路径；
    __publicField(this, "_path");
    this._path = path + "/";
  }
  CutePathEnd(path) {
    var paths = path.split(".");
    var end = paths[paths.length - 1].toLocaleString();
    if (end != null)
      return end;
    else
      throw Error("end is null");
  }
  Indentify(Filetype, Filepath) {
    if (Filetype === "tree") {
      return this._path + "files.png";
    }
    if (Filetype === "blob") {
      var end = this.CutePathEnd(Filepath);
      switch (end) {
        case "mp4":
          return this._path + "mp4.png";
        case "pdf":
          return this._path + "pdf.png";
        case "ppt":
          return this._path + "ppt.png";
        case "doc":
          return this._path + "word.png";
        case "docx":
          return this._path + "word.png";
        case "txt":
          return this._path + "otherfile.png";
        default:
          return this._path + "otherfile.png";
      }
    }
    throw new Error("Filetype is not in");
  }
}
exports.Indentifyicon = Indentifyicon;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/Identifyicon.js.map
