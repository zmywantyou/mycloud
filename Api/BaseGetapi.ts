import { IBaseGetapi } from "./IBaseGetapi";
import { IMode  } from "../Mode/IMode";
//import fetch from 'vue';  


export class BaseGetapi implements IBaseGetapi{
	 private  _apiurl:string;
	 public constructor(apiurl:string){
		 this._apiurl=apiurl;
	 }
	async Getapi(): Promise<JSON> {
	  try {
	    const res = await uni.request({
	      method: "GET",
	      url: this._apiurl,
	    });
	    if (res.statusCode !== 200) {
	
	      throw new Error(`HTTP 错误码: ${res.statusCode}`);
	    }
	    return res.data as JSON;
	    
	  } catch (err) {
	    console.error(`API 访问失败 [${this._apiurl}]:`, err);
	    throw new Error(`请求异常: ${err instanceof Error ? err.message : "未知错误"}`);
	  }
	}
} 
