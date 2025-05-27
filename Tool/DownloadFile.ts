	
class DownLoandPair{
	private CutePathEnd(path:string):string{
		var paths= path.split(".")
		var end:string=paths[paths.length-1].toLocaleString();
		//console.log(end);
		if(end!=null)
		return end;
		else throw Error("end is null");
		
	}
	public ShowToastfilepath(path:any){
		uni.showToast({
		 icon: 'none',
		 mask: true,
		 title: '文件已保存：' + path, //保存路径
		 duration: 3000,
				});
	}
	public setTimeout(path:any){
		const name=this.CutePathEnd(path);
		console.log(name);
	 setTimeout(() => {
		uni.openDocument({
		filePath: path,
		 showMenu: true,
		fileType:name
			});
			})
	}
}


export class DownloandFile{

private DownFile(url:string,name:string){
	
	uni.downloadFile({
	 url:url,
	 fail: (err) => {
	    console.log('downloadFile fail, err is:', err)
	    },
	 success:function(res){
		 //console.log(url);
		if(res.statusCode==200){
	    const fs = uni.getFileSystemManager();
		 const savedFilePath = `${wx.env.USER_DATA_PATH}/${name}`;
		fs.saveFile({
		tempFilePath:res.tempFilePath,
		 filePath: savedFilePath,
		fail(err) {
			  console.log('saveFile fail, err is:', err)
		},
		success:function(data){
		console.log(data.savedFilePath)
		 new DownLoandPair().ShowToastfilepath(savedFilePath);
	     new DownLoandPair().setTimeout(savedFilePath);
			}})}}
})

	
}
  public constructor(url :string,name:string){
	   console.log(url)
	  this.DownFile(url,name);
	 }
}