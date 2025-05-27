import { IoutMode } from "../Mode/IoutMode"
import { ICallbackOperation } from "../Mode/CallbackOperation"
import { Path } from "../Tool/Path"
import { CreateUrl, Getype } from "../Tool/CreateUrl"
import { BasePostapi } from "../Api/BasePostapi";
import { IMode } from "../Mode/IMode";
export class GiteeOperationSever {
	private Store : string;
	private Postapi : BasePostapi | undefined
	public constructor(Store : string | undefined) {
		if (Store === undefined)
			throw new Error("Store is null");
		this.Store = Store
		//this.Getapi=new BaseGetapi()
	}

	public async UpNewFile(nowpath : string, callback : ICallbackOperation) {
		let Store = this.Store
		wx.chooseMessageFile({
			count: 10,
			type: 'all',
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFiles;
				//console.log(tempFilePaths)
				//let numbereach : number = 0;
				const uploadPromises = tempFilePaths
					.map((tempFilepath) => {
						return new Promise((resolve, reject) => {
							wx.getFileSystemManager().readFile({
								filePath: tempFilepath.path,
								encoding: 'base64',
								success: (res) => {
									var base64 = res.data;
									let create = new CreateUrl(Store)
									create.Path = Path.joint(nowpath, tempFilepath.name)
									let url = create.Create(Getype.PostNewFile);
									console.log("create url is" + url);
									// var api=new BasePostapi(url);
									create.setpostdata = base64 as unknown;
									wx.request({
										url: url,
										method: "POST",
										data: create.postdata,
										success: resolve,
										fail: (err) => reject(err)
									})
								},
								fail: (err) => reject(err)
							})
						})
					})
					 callback.CallbackOperation(true,uploadPromises)
			},
			
            
		})
	}
	public async DeteFiles(items:IoutMode):Promise<IMode>{

		let create = new CreateUrl(this.Store)
		create.Sha=items.sha;
		create.Path=items.path;
		const url=create.Create(Getype.Delfile);
		console.log(url)
		this.Postapi=new BasePostapi(url)
		return this.Postapi.Postapi("DELETE");
	}
	public async CreateNewFile(filename : string, nowpath : string) : Promise<void> {
		try {
			let create = new CreateUrl(this.Store);
			let pathurl : string = Path.joint(nowpath, filename)
			create.Path = Path.joint(pathurl, ".keep");
			var url = create.Create(Getype.PostNewFile);
			console.log(url)
			this.Postapi = new BasePostapi(url);
			this.Postapi.Postdata = create.postdata
			await this.Postapi.Postapi();
		}
		catch (err) {
			//console.log(err)
			throw err
		}
	}
}