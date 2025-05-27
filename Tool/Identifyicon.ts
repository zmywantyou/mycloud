
export class Indentifyicon{
	//传一个使用本组件的vue项目的对于图片的相对路径；
	private _path:string;
	public constructor(path:string){
		this._path=path+'/';
	}
	private CutePathEnd(path:string):string{
	var paths= path.split(".")
	var end:string=paths[paths.length-1].toLocaleString();
		if(end!=null)
		return end;
		else throw Error("end is null");
		
	}
	public Indentify(Filetype:string,Filepath:string):string{
		if(Filetype==="tree"){
		
			return this._path+Icon.FilesIcon;
		}
		if(Filetype==="blob"){
		var end=this.CutePathEnd(Filepath);
		switch(end){
			case FIleType.mp4:
			return this._path+Icon.Mp4Icon;
			case FIleType.pdf:
			return this._path+Icon.PdfIcon;
			case FIleType.ppt:
			return this._path+Icon.PPTIcon;
			case  FIleType.word:
			return this._path+Icon.WordIcon;
			case  FIleType.xword:
			return this._path+Icon.WordIcon;
			case  FIleType.txt:
			return this._path+Icon.TxtIcon;
			default:return this._path+Icon.OtherIcon;
		}
		
		}
		throw new Error("Filetype is not in");
	}
}
enum Icon{
	FilesIcon="files.png",
	PdfIcon="pdf.png",
	PPTIcon="ppt.png",
	WordIcon="word.png",
	Mp4Icon="mp4.png",
	TxtIcon="otherfile.png",
	OtherIcon="otherfile.png"
}
//支持文件类型
enum FIleType{
	mp4="mp4",
	pdf="pdf",
	ppt="ppt",
	word="doc",
	xword="docx",
	txt="txt"
}