<template>
	
<view class="home-container">
	<filenameBox/>
	<addbtn/>
  <view class="file-container">
    <!-- 文件列表 -->
    <view class="file-list" v-if="isfilesnull">
		
     <view  v-for="item in files":key="item.path" >
		<view class="file-item" @click="Skipnexthome(item)">
        <view class="file-icon" >
          <img :src="IndentIcon.Indentify(item.type,item.path)" class="icon" />
        </view>
        <view class="file-info">
          <text class="file-name">{{item.path}}</text>
		 <!-- <view class="file-actions" >
		     <image src="/static/。。.png" class="action-icon"/>
		   </view> -->
        </view>  
		</view>

      </view>
</view>
    <!-- 空状态 -->
    <view  class="empty-state" v-else>
      <text class="empty-text">暂无文件</text>
    </view>
  </view>
</view>

</template>

<script lang="ts" setup>
	import filenameBox from "@/complet/filenameBox.vue";
	import addbtn from"@/complet/addbtn.vue";
	import { BaseGetapi } from '../../Api/BaseGetapi';
	import { IModefile } from '../../Mode/IModefile';
	import {IoutMode} from'../../Mode/IoutMode'
	import { getCurrentInstance, onMounted,ref } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	import { TreeNode } from "../../Tool/TreeNode";
	import{Indentifyicon}from"../../Tool/Identifyicon";
import { Setting } from '../../setting/Setting';
import { CreateUrl, Getype } from '../../Tool/CreateUrl';
import { DownloandFile } from '../../Tool/DownloadFile';
	let files=ref<IoutMode[]>(); 
	let isfilesnull=ref<boolean>();
	
	//let url:string;
	//加载图标
	let setting=new Setting;
	 const Store:null|string=setting.GetWxStore();
	let IndentIcon=new Indentifyicon("../../static");
	let url:string=setting.GetWxChanel("nexthome","url");
	let baseurl:string=setting.GetWxChanel("nexthome","path");
	uni.$emit("nowurl",baseurl);
	uni.$emit("nowpath",url);
	uni.$on(baseurl,(data)=>{
		console.log(data);
		files.value=data
		});
		setting.DelWxChanel("nexthome")
	//console.log(url);
	try{
		//组件中执行异步
		 onMounted(async()=>{ 
			url=new CreateUrl(Store as string).AddKey(url)
			//缺少creaet key 导致子文件访问失败
			var jsonlist=await new BaseGetapi(url).Getapi();
		     files.value=new TreeNode(jsonlist).GetNodes("tree");
			 });
		 if(files.value!=undefined){
			 isfilesnull.value=false;
			 throw new Error("files is undefied");
			 //console.log("");
		 }else{
			 isfilesnull.value=true;
		 }
	   }
	  
	
	
	catch(err){
		console.log(err);
	}
	function Skipnexthome(item:IoutMode){
		
		console.log(item.path);
		//console.log(item.type)
		if(item.type=="blob"){
		 console.log(item.path)
		 var creaturl=new CreateUrl(Store as string);
		 creaturl.Name=baseurl+"/"+item.path;
		 //console.log(item.path);
		 var url=creaturl.Create(Getype.GetBlob);
		 new DownloandFile(url,item.path);}
	
		if(item.type=="tree"){
		console.log("had clicked...");
		setting.SetWxChanel("newfile",JSON.parse(`{"url":"${item.url}","path":"${item.path}"}`));
		setting.SetWxChanel("nexthome",JSON.parse(`{"url":"${item.url}","path":"${item.path}"}`))
		uni.navigateTo({
			url:"/pages/nexthome/nexthome",
			success() {
				//setting.DelWxChanel("nexthome");
			}
		  });}}
	
</script>
<style>
.home-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: white;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05);
}

.file-icon .icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 24rpx;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.file-name {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.file-meta {
  font-size: 24rpx;
  color: #999;
}
.file-actions {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-25%);
  opacity: 0.8;
  transition: all 0.2s ease;
}
.file-actions .action-icon {
  width: 48rpx;
  height: 48rpx;
  padding: 20rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  opacity: 0.5;
  margin-bottom: 40rpx;
}

.empty-text {
  color: #999;
  font-size: 28rpx;
}
</style>

