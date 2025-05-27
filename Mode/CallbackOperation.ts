export  
interface ICallbackOperation{ 
	CallbackOperation(isclosed:boolean, Operation:Promise<any>):void;
}
