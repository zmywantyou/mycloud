
export class Base64 {
	private context:string;
	public constructor(context:string){
		this.context=context;
	}
	public Tobase64():string{
	 let arrayBuffer = uni.base64ToArrayBuffer(this.context)
	 const uint8Array = new Uint8Array(arrayBuffer);
	 let str = '';
	 // 遍历每个字节转为 ASCII 字符
	 for (let i = 0; i < uint8Array.length; i++) {
	     str += String.fromCharCode(uint8Array[i]);
	 }
	 return str;
	}
}