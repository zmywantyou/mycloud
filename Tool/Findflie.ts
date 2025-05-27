import {IoutMode} from'../Mode/IoutMode'
export class Findflie{
	private _mainList:IoutMode[]
	public constructor(mainlist:IoutMode[]){
		this._mainList=mainlist;
		//console.log(this._mainList)
	}
	public FindurlFromPath(path:string):string{
		console.log(path)
	   var list=this._mainList.find(obj=>obj.path==path);
	   if(list==undefined)
	   throw new Error("list can not find");
		return list.url;
	}
}