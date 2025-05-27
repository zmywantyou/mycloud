import {IMode} from"../Mode/IMode"
export interface IBasePostapi{
	Postapi<T extends IMode>(): Promise<T>
}