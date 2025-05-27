import { IMode } from "./IMode"
export interface IModefile extends IMode{
	id:string,
	name:string,
	isFolder:boolean,
	size:string,
	type:string
	data:JSON
}


//https://gitee.com/cqzmy/hosework/raw/master/2022212862%20%E9%92%9F%E6%B0%91%E6%89%AC%20%E5%AE%9E%E9%AA%8C2.doc