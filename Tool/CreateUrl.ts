import{ Base64 } from "../Tool/Base64";
export enum Getype{
	Gettree="Gettree",
	GetBlob="GetBlob",
	PostNewFile="NewFile",
	Delfile="Delfile"
}
interface fileurlmode{
	access_token:string;
	content?:unknown;
	message?:string;
}

enum ReApi{
	Delfile=" https://gitee.com/api/v5/repos/{warehouse}/contents/{path}",
	Postnewfile="https://gitee.com/api/v5/repos/{warehouse}/contents/{path}",
	Gettree="https://gitee.com/api/v5/repos/{warehouse}/git/trees/{sha}",
	GetBlob="https://gitee.com/{warehouse}/raw/{sha}/{name}"
	//Getfile="https://gitee.com/api/v5/repos/cqzmy/hosework/git/trees/{sha}"
}

export class CreateUrl{
	private _Jsonstr:string;
	private _path:string|null=null;
	private _Sha:string="master";
	private _Name:string|null=null;
	private _content:unknown=".keep";
	private readonly token:string="?access_token=";
	private readonly Wherepage:string="&recursive=1";
	private readonly prarasha:string="&sha=";
	private readonly mess:string="&message=由小程序提交";
	public constructor(Jsonstr:string){
		this._Jsonstr=Jsonstr;
	}
	public AddKey(url:string):string{
		return url
		+this.token
		+this.FindPara("Key");
	}
		
	private FindPara(where:string):any{
		let param:unknown=JSON.parse(this._Jsonstr)[where];
		if(param==undefined){
			throw new Error("本地json中无这个值"+where);
		}
		return param;
	}
	private IsupGit(func:string):string{
		if(this.FindPara("Isup") as boolean==false){
			throw new Error("git没有开启");
		}
		else{
		 return	func;
		}
	}
	//创建文件夹
	private PostNewfile():string{
	   if(this._path!=null)
	    var url=ReApi.Postnewfile
	   .replace("{warehouse}",this.FindPara("Warehouse"))
	   .replace("{path}",this._path)
	   else throw new Error("path is null");
	   return url;
	}
	private Delfileurl():string{
		if(this._path!=null)
		var url=ReApi.Delfile
		.replace("{warehouse}",this.FindPara("Warehouse"))
		.replace("{path}",this._path)
		else throw new Error("path is null");
		return url
		+this.token
		+this.FindPara("Key")
		+this.prarasha
		+this._Sha
		+this.mess;
	}
	public get postupdatafile(){
		let fileurlmode:fileurlmode={
			access_token:this.FindPara("Key"),
		}
		//fileurlmode.access_token=this.FindPara("Key");
		return fileurlmode
	}
	public set setpostdata(value:unknown){
		this._content=value;
	}
	public get postdata() {
		let fileurlmode:fileurlmode={
			access_token:this.FindPara("Key"),
			content:this._content,
			message:"小程序提交"
		}
		return fileurlmode
	}
	public get Mianfilelist():string{
		return this.Gettureurl()
		+this.Wherepage;
	}
	private GetBloburl():string{
		if(this._Name==null||undefined) throw new Error("name is null");
		let Gettree:string=ReApi.GetBlob
			.replace("{warehouse}",this.FindPara("Warehouse"))
			.replace("{sha}",this._Sha)
			.replace("{name}",this._Name);
			return Gettree
			+this.token
			+this.FindPara("Key");
	}
	private Gettureurl():string{
	let Gettree:string=ReApi.Gettree
		.replace("{warehouse}",this.FindPara("Warehouse"))
		.replace("{sha}",this._Sha);
		return Gettree
		+this.token
		+this.FindPara("Key");
	}
	public SkipPageurl(page:number,url:string):string{
		return url
		+this.Wherepage
		+page;
	}
	
	public set Path(value:string){
		this._path=value;
	}
	public set Name(value:string){
		this._Name=value;
	}
	public set Sha(value:string){
		//if(value==null) return;
		this._Sha=value;
	}
	public Create(getype:string):string{
		switch(getype){
			case Getype.Delfile:return this.IsupGit(this.Delfileurl());
			case Getype.Gettree:return this.IsupGit(this.Gettureurl());
			case Getype.GetBlob:return this.IsupGit(this.GetBloburl());
			case Getype.PostNewFile:return this.IsupGit(this.PostNewfile());
			default :throw new Error("没有匹配值") 
		}
	}
}

