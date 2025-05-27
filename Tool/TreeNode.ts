
import { IMode } from "../Mode/IMode";

export class TreeNode{
	private _res:any
	public constructor(res:any){
		this._res=res;
	}
	public GetNodes<T extends IMode>(where:string):T[]{
		var treehead:T[]=this._res[where] as T[];
		return treehead;
	}
	public GetNode<T extends IMode>(where:string):T{
		var treehead:T=this._res[where] as T;
		return treehead;
	}
 //    public GetMode<T extends IMode>():T{
		
	// }
}