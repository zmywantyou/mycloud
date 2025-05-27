import { IMode } from "../Mode/IMode";
import{CreateUrl, Getype} from"../Tool/CreateUrl"
import{Setting}from"../setting/Setting"
import{BaseGetapi}from"../Api/BaseGetapi"
import { TreeNode } from "../Tool/TreeNode";
import { IoutMode } from "../Mode/IoutMode";
import { Ref, ref } from "e:/hbuilderx/plugins/hbuilderx-language-services/builtin-dts/common/vue2and3";
import { Alogrithm } from "../Tool/Algorithm";
import { fileSystemSever } from "./fileSystemSever";
export enum page{
	Home="RefreshHomePageSave",
}
interface IRefreshPageSave{
	 RefreshPage<T>(item:T):Promise<T[]>,
	  RefreshPage<T>(item:T,isup:boolean):Promise<T[]>
}
export class Farcy{
  public Creat(option:page):IRefreshPageSave{
	  switch(option){
		case "RefreshHomePageSave":
		return new RefreshHomePageSave()
		default:throw new Error("no option")
	  }
  }
}
class RefreshHomePageSave implements IRefreshPageSave{
    Create:CreateUrl;
	//private filesystem:fileSystemSever|undefined;
    //private  filetree:Promise<IMode>;
    constructor(){
		//this.filetree=this.GetFilstFileListApi();
		this.Create=new CreateUrl(new Setting().GetWxStore()) 
	}
	private async GetFilstFileListApi():Promise<IMode>{
	 let url=this.Create.Create(Getype.Gettree)
	 var jsonlist=await new BaseGetapi(url).Getapi();
	 console.log(jsonlist)
	 var filetree:IMode[]=new TreeNode(jsonlist).GetNodes("tree");
	 return filetree
	} 
	private async GetFileMapApi():Promise<IMode>{
		let url=this.Create.Mianfilelist;
		var jsonlist=await new BaseGetapi(url).Getapi();
		console.log(jsonlist)
		var filetree:IMode[]=new TreeNode(jsonlist).GetNodes("tree");
		return filetree
	}
	private async GetNextFilelistApi(url:string):Promise<IMode>{
		url=this.Create.AddKey(url);
		var jsonlist=await new BaseGetapi(url).Getapi();
		console.log(jsonlist)
		var filetree:IMode[]=new TreeNode(jsonlist).GetNodes("tree");
		return filetree
	}
	public async RefreshPage<T>(item:T,isup:Boolean):Promise<T[]>
	public   async RefreshPage<T>(item:T):Promise<T[]>
    public   async RefreshPage<T>(item:T,isup:Boolean=false):Promise<T[]>{
		var mode=item as IoutMode; 
		if(isup==true){
			return await this.GetFileMapApi() as T[]
		}
		if(mode.path==""){
			return await this.GetFilstFileListApi() as T[]
		}
		if(new Alogrithm().Countpathnumber(mode.path)>=0){
			return await this.GetNextFilelistApi(mode.url) as T[];
		}
		throw new Error("refre is not work");
	}
	
}