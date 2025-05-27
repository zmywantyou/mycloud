<template>
	<view class="filesystem"></view>
</template>
<script lang="ts" setup>
	import { ICallbackOperation } from "../Mode/CallbackOperation"
	import { Findflie } from "../Tool/Findflie"
	import { Path } from "../Tool/Path"
	import { GiteeOperationSever } from "../severs/GiteeOperationSever"
	import { IoutMode } from "../Mode/IoutMode"
	import { Farcy, page } from "../severs/RefreshPageSever"
	import { fileSystemSever } from '../severs/fileSystemSever';
	import { CreateUrl, Getype } from "../Tool/CreateUrl";
	import { Setting } from "../setting/Setting";
	import { DownloandFile } from "../Tool/DownloadFile";
	import { create } from "domain";
	import { watch } from "fs";
	import { fail } from "assert"
	let Store : string | null = new Setting().GetWxStore()
	let FileSystemSever : fileSystemSever = new fileSystemSever()
	let farcy : Farcy = new Farcy()
	let Operation : GiteeOperationSever = new GiteeOperationSever(Store)
	//readonly Res:Promise<IoutMode[]>
	let item : IoutMode = {
		url: "",
		path: "",
		mode: "",
		type: "",
		sha: "",
		size: "",
	}
	class Callback implements ICallbackOperation {
		CallbackOperation(isclosed : boolean, Operation : Promise<any>[]) : void {
			if (isclosed == true) {
				console.log("ICallback", FileSystemSever.Getnowpath)
				//console.log("callback")
				Promise.all(Operation).then(() => {
					file.RefreshPage<IoutMode>(item, true).then((re) => {
						FileSystemSever.UpdataMainlist = re;
						UpdataMainRefreshPage()
						uni.showToast({ title: "上传成功" })
					})
						.catch((err) => { throw err })
				}).catch((err) => {
					uni.showToast({ title: "文件重复", icon: "none" })
					console.log(err)
				});
			}

		}

	}
	uni.$on("Upfile", () => {
		let callback : Callback = new Callback();
		Operation.UpNewFile(FileSystemSever.Getnowpath, callback)

	})
	uni.$on("UpdataMainRefreshPage", () => {
		UpdataMainRefreshPage()
	})
	function UpdataMainRefreshPage() {
		var url = FileSystemSever.GetNowFileurlFromPath;
		item.url = url
		item.path = FileSystemSever.Getnowpath
		file.RefreshPage(item).then((re) => {
			uni.$emit("Getfillist/", re)
			FileSystemSever.SetNowlist = re;
			console.log("updatamianrefireshpage is", re);
		});
	}


	//新建文件夹
	uni.$on("newfile", (filename : string) => {
		//console.log("filename is",filename)
		Operation.CreateNewFile(filename, FileSystemSever.Getnowpath)
			.catch((err) => {
				var Thefileexists = 1;
				FiesystemError(Thefileexists);
				console.log("opeeration", err)
			}).then(() => {
				file.RefreshPage<IoutMode>(item, true).then((re) => {
					FileSystemSever.UpdataMainlist = re;
					UpdataMainRefreshPage()
				}).catch((re) => { console.log(re) })
			});

	}
	)
	uni.$on("DelOperation",async (re)=>{
		console.log("DelOperation")
	  var relist=re as IoutMode[]
	  var status:number=0
	  //gitee api 要求只能顺序执行每个删除，不支持全部删除
	  for (re of relist) { 
		await Operation.DeteFiles(re)
		 status++;
	  }
	  if(status==relist.length){
		  file.RefreshPage<IoutMode>(item, true).then((re) => {
		    	FileSystemSever.UpdataMainlist = re;
		    	UpdataMainRefreshPage()
		    	uni.showToast({ title: "成功删除" })
		    })
	  }
	  //var status:number=0;
	  // relist.map((re)=>{
	  // 		   Operation.DeteFiles(re).then(()=>{
			// 	   status++;
			// 	   uni.showToast({ title: "成功删除文件"+status+“})
			//    });
	  // })
	  // const primses=relist.map((re)=>{
		 //  return Operation.DeteFiles(re);
	  // })
	  
	  //  Promise.all(primses).then(()=>{
		 //   file.RefreshPage<IoutMode>(item, true).then((re) => {
		 //   	FileSystemSever.UpdataMainlist = re;
		 //   	UpdataMainRefreshPage()
		 //   	uni.showToast({ title: "成功删除" })
		 //   })
	  //  }).catch((err)=>console.log(err))
	})
	//错误传递
	function FiesystemError(ErrorNumber : number) {
		console.log()
		uni.$emit("FiesystemError", ErrorNumber)
	}
	function RefreshPage(item : IoutMode) {
		file.RefreshPage(item).then((re) => {
			//console.log(re)
			uni.$emit("Getfillist/", re)
			FileSystemSever.Savenowlist = re;
		});
		//console.log("当前的路径是", Path.joint(FileSystemSever.Getnowpath,item.path));
		FileSystemSever.Savenowpath =
			Path.joint(FileSystemSever.Getnowpath, item.path)
		console.log("当前的路径是", FileSystemSever.Getnowpath);
	}
	let file = farcy.Creat(page.Home)
	RefreshPage(item)
	uni.$on("upperlevel", () => {
		FileSystemSever.Upperpath()
		uni.$emit("Getfillist/", FileSystemSever.Upperlist);
		item.path = FileSystemSever.Getnowpath;
		console.log("当前的路径是", FileSystemSever.Getnowpath);
	})
	uni.$on("Postfilest/path/tree", (re : IoutMode) => {
		if (re.type == "tree")
			RefreshPage(re)

	})
	uni.$on("Postfilest/path/blob", (re : IoutMode) => {
		if (re.type == "blob") {
			//console.log("item path is",re.path)
			//console.log("blob is",FileSystemSever.Getnowpath+"/"+re.path)
			var create = new CreateUrl(Store as string)
			create.Name = Path.joint(FileSystemSever.Getnowpath, re.path)
			var url = create.Create(Getype.GetBlob)
			new DownloandFile(url, re.path)
		}

	})
</script>