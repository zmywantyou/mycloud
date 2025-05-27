import { error } from "console";
import { IMode } from "../Mode/IMode";

export interface Stroemode{
	//密钥
	Key:string;
	//是否使用gitee存储方式
	Isup:boolean;
	//仓库地址
	Warehouse:string
	
	}

export class Setting{
	private _Stroemode:Stroemode | undefined;
		//private _Isup:boolean;
	set OutStromode(value:Stroemode) {
		this._Stroemode=value;
	}
	public GetWxChanel(pagekey:string,where:string):string{
		let re:any;
		    re= wx.getStorageSync(pagekey) as JSON;
			if(re==null||re==undefined)
			 //return re[where];
			throw new Error("chanel is no value");
			//console.log(re);
			if(re[where]==undefined)
			throw new Error("chanel is underfind");
			return re[where];
			
	}
	public DelWxChanel(pagekey:string){
		wx.removeStorage({
			key:pagekey,
			success() {
				console.log(pagekey +"be removed");
			},
			fail(err) {
				console.log(err);
			}
		});
	}
	//通把数据存储在内存中实现通道传递
	public async SetWxChanel(pagekey:string,data:JSON){
		//console.log(data);
		 wx.setStorage({
		    key: pagekey,
		    data: data,
		    success: function () {
		     // console.log('设置缓存数据成功');
		    }
		  });

	}
	public Wxstore(){
		if(this._Stroemode==undefined)
		throw new Error("Stromode is undefined");
		let jsonstr:string=JSON.stringify(this._Stroemode);
		wx.setStorageSync('userInfo', jsonstr);
		}
	public GetWxStore():string{
		let str:string|null= wx.getStorageSync('userInfo');
		if(str==null){
			throw new Error ("getwxstore is null");
		}
		else return str;
		}
	public DeletWxStroe(){
		 wx.removeStorageSync('userInfo');
	}
	}

