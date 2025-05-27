import {IoutMode} from "../Mode/IoutMode"
import { Alogrithm } from "../Tool/Algorithm";
import { Ref, onMounted,ref } from "vue";
import { Findflie } from "../Tool/Findflie";
import { CreateUrl, Getype } from "../Tool/CreateUrl";
import { Setting } from "../setting/Setting";
interface file{
	//当前路径
		nowurl:string,
	//文件列表
		mainlist:IoutMode[],
	//保存上一次文件列表
		list:IoutMode[][],
	//当前的路径层数
		index:number;
	}
export class fileSystemSever{
	private filesystem:Ref<file>;
	constructor(){
	 this.filesystem=ref({
			nowurl:"/",
			mainlist:[],
			list:[],
			index:-1
		})
	}
	//跳转到一页保存的path的
	public set Savenowpath(value:string) {
		//value+=(value+"/");
		this.filesystem.value.nowurl="/"+value;
	}
	public Upperpath():void{
	  this.filesystem.value.nowurl= new Alogrithm().
		CaptureThendelete(this.filesystem.value.nowurl,"/");	
	}
	public get Getnowpath():string{
		var len=this.filesystem.value.nowurl.length;
		return this.filesystem.value.nowurl.slice(1,len)
	}
	public set  Savenowlist(value:IoutMode[]){
		this.filesystem.value.list.push(value);
		this.filesystem.value.index++; 
		//console.log("sever",this.filesystem.value.list[this.filesystem.value.index]);
	}
	public get Getnowindex():number{
		return this.filesystem.value.index
	}
	public get Upperlist():IoutMode[]{
		if(this.filesystem.value.index<=0)
		return [ {
		url:"err", path:"0",mode:"0", type:"0",sha:"0",size:"0",	 
		}]
		this.filesystem.value.list.pop();
		this.filesystem.value.index--;
		console.log(this.filesystem.value.index);
		return this.filesystem.value.list[
			this.filesystem.value.index	
		];
	}
	public set SetNowlist(value:IoutMode[]){
		this.filesystem.value.list[this.filesystem.value.index]
		=value;
	}
     public set UpdataMainlist(value:IoutMode[]){
		 this.filesystem.value.mainlist=value
	 }
	 public get GetNowFileurlFromPath():string{
		 if(this.filesystem.value.nowurl=="/"){
			 return new CreateUrl(
			 new Setting().GetWxStore() as string
			 ).Create(Getype.Gettree);
		 }
		 console.log("mainlist is",this.filesystem.value.mainlist[0])
	 	return new Findflie(this.filesystem.value.mainlist)
		.FindurlFromPath(this.Getnowpath);
	 }
}