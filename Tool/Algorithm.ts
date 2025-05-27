export class Alogrithm{
	public CaptureThendelete(obj:string,matching:string):string{
		let i:number;
		for( i =obj.length;i>1;i--) {
			if(obj[i]==matching){
				break;
			}
		}
		console.log(i);
		obj=obj.substring(0,i);
		return obj
	}
	public Countpathnumber(obj:string):number{
		let i=0;
		for( i =obj.length;i>1;i--) {
			if(obj[i]=="/")
				break;
		}
		 return obj.length-i;
	}
	
}