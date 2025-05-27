"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Getype = /* @__PURE__ */ ((Getype2) => {
  Getype2["Gettree"] = "Gettree";
  Getype2["GetBlob"] = "GetBlob";
  Getype2["PostNewFile"] = "NewFile";
  Getype2["Delfile"] = "Delfile";
  return Getype2;
})(Getype || {});
class CreateUrl {
  constructor(Jsonstr) {
    __publicField(this, "_Jsonstr");
    __publicField(this, "_path", null);
    __publicField(this, "_Sha", "master");
    __publicField(this, "_Name", null);
    __publicField(this, "_content", ".keep");
    __publicField(this, "token", "?access_token=");
    __publicField(this, "Wherepage", "&recursive=1");
    __publicField(this, "prarasha", "&sha=");
    __publicField(this, "mess", "&message=由小程序提交");
    this._Jsonstr = Jsonstr;
  }
  AddKey(url) {
    return url + this.token + this.FindPara("Key");
  }
  FindPara(where) {
    let param = JSON.parse(this._Jsonstr)[where];
    if (param == void 0) {
      throw new Error("本地json中无这个值" + where);
    }
    return param;
  }
  IsupGit(func) {
    if (this.FindPara("Isup") == false) {
      throw new Error("git没有开启");
    } else {
      return func;
    }
  }
  //创建文件夹
  PostNewfile() {
    if (this._path != null)
      var url = "https://gitee.com/api/v5/repos/{warehouse}/contents/{path}".replace("{warehouse}", this.FindPara("Warehouse")).replace("{path}", this._path);
    else
      throw new Error("path is null");
    return url;
  }
  Delfileurl() {
    if (this._path != null)
      var url = " https://gitee.com/api/v5/repos/{warehouse}/contents/{path}".replace("{warehouse}", this.FindPara("Warehouse")).replace("{path}", this._path);
    else
      throw new Error("path is null");
    return url + this.token + this.FindPara("Key") + this.prarasha + this._Sha + this.mess;
  }
  get postupdatafile() {
    let fileurlmode = {
      access_token: this.FindPara("Key")
    };
    return fileurlmode;
  }
  set setpostdata(value) {
    this._content = value;
  }
  get postdata() {
    let fileurlmode = {
      access_token: this.FindPara("Key"),
      content: this._content,
      message: "小程序提交"
    };
    return fileurlmode;
  }
  get Mianfilelist() {
    return this.Gettureurl() + this.Wherepage;
  }
  GetBloburl() {
    if (this._Name == null || void 0)
      throw new Error("name is null");
    let Gettree = "https://gitee.com/{warehouse}/raw/{sha}/{name}".replace("{warehouse}", this.FindPara("Warehouse")).replace("{sha}", this._Sha).replace("{name}", this._Name);
    return Gettree + this.token + this.FindPara("Key");
  }
  Gettureurl() {
    let Gettree = "https://gitee.com/api/v5/repos/{warehouse}/git/trees/{sha}".replace("{warehouse}", this.FindPara("Warehouse")).replace("{sha}", this._Sha);
    return Gettree + this.token + this.FindPara("Key");
  }
  SkipPageurl(page, url) {
    return url + this.Wherepage + page;
  }
  set Path(value) {
    this._path = value;
  }
  set Name(value) {
    this._Name = value;
  }
  set Sha(value) {
    this._Sha = value;
  }
  Create(getype) {
    switch (getype) {
      case "Delfile":
        return this.IsupGit(this.Delfileurl());
      case "Gettree":
        return this.IsupGit(this.Gettureurl());
      case "GetBlob":
        return this.IsupGit(this.GetBloburl());
      case "NewFile":
        return this.IsupGit(this.PostNewfile());
      default:
        throw new Error("没有匹配值");
    }
  }
}
exports.CreateUrl = CreateUrl;
exports.Getype = Getype;
//# sourceMappingURL=../../.sourcemap/mp-weixin/Tool/CreateUrl.js.map
