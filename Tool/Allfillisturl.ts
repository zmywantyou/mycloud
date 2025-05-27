import { IoutMode } from "../Mode/IoutMode";

interface file{
	path:string;
	mode:string;
	type:string;
	sha:string;
	size:string;
	url:string;
}
export class allfillisturl{
	private  static  nowurl:string="{home}";
	private static mainlist:file[][];
	//private  static  root:file[];
	private static  list:file[][]=[]
	private static  index:number=0;
	public  static updata(file:file[][]){
		this.mainlist=file;
	}
	public  static getnowurl():string{
		return this.nowurl;
	} 
	public static add(url:unknown):number{
		this.list.push(url as file[]);
		//this.root.push(item as file);
		this.index+=1;
		return this.index;
	}
	public static uppdatanow(file:file[],now:number):number{
		if(this.index<0){
			return -1;
		}
		this.list[now]=file;
		//this.root[now]=root;
		return this.index;
	}
	public static upper():number{
		if (this.index==0){
			this.list.splice(0,this.list.length);
			//this.root.splice(0,this.root.length);
			return -1;
		}
		this.index-=1;
		return this.index;
	}
    public  get pagenow():number {
    	return allfillisturl.index;
    }
	public static now():file[]|number{
		//console.log(this.list[this.index]);
		if(this.index==0)
		return 0;
		return this.list[this.index-1];
	}
}