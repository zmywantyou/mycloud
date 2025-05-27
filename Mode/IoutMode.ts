import { IMode } from "./IMode"
export interface IoutMode extends IMode{
	path:string;
	mode:string;
	type:string;
	sha:string;
	size:string;
	url:string;
}