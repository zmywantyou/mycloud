
import { IMode } from "../Mode/IMode";
import { IBasePostapi } from "./IBasePostapi";
export interface postdata{
	access_token:string;
	content?:unknown;
	message?:string;
}
export class BasePostapi implements IBasePostapi {
  private _apiurl: string;
  private _header: Record<string, string>;
  private _postdata:any;
  public constructor(apiurl: string) {
    this._apiurl = apiurl;
    this._header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + uni.getStorageSync('token') // 示例：添加 Token
    };
  }
   public set Postdata(value:postdata) {
   	  this._postdata=value;
   }
  public async Postapi<T extends IMode>(method:any='POST'): Promise<T> {
    try {
      const response = await uni.request({
        url: this._apiurl,
        method: method,
        header: this._header,
		data:this._postdata,
        timeout: 10000 // 超时设置
      });

      if (response.statusCode === 200||response.statusCode===201||response.statusCode===304) {
        return response.data as T;
      } else {
		  console.log(response.data)
        throw new Error(`请求失败，状态码：${response.statusCode}`);
      }
    } catch (err) {
      console.error('API 请求异常:', err);
      throw err; // 向上抛出错误供调用方处理
    }
  }
}