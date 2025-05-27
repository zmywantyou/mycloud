<template>
	
<view class="home-container">
	<filesystem/>
	<filenameBox/>
	<addbtn/>
  <view class="file-container">
    <!-- 文件列表 -->
    <view class="file-list" v-if="isfilesnull">
		
     <view  v-for="item in files":key="item.path" >
		<view class="file-item" :style="Isdelteing?Delfilelist.includes(item)?Deldivstyle:{}:{}" @click="Isdelteing? BtDetFile(item):BtnNextpath(item)">
        <view class="file-icon" >
          <img :src="IndentIcon.Indentify(item.type,item.path)" class="icon" />
        </view>
        <view class="file-info">
          <text class="file-name">{{item.path}}</text>
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
import  filesystem from"@/complet/filesystem.vue"
import {Alogrithm} from"../../Tool/Algorithm"
import {Findflie} from"../../Tool/Findflie"
import filenameBox from "@/complet/filenameBox.vue";
import addbtn from"@/complet/addbtn.vue";
import { Setting } from "../../setting/Setting";
import { ICallbackOperation } from '../../Mode/CallbackOperation';
import {IoutMode} from'../../Mode/IoutMode'
import {CreateUrl,Getype}from'../../Tool/CreateUrl'
import { Ref, onBeforeMount, onMounted,reactive,ref } from "vue";
import { TreeNode } from "../../Tool/TreeNode";
import{DownloandFile}from"../../Tool/DownloadFile"
import{Indentifyicon}from"../../Tool/Identifyicon";
import { emit, on } from "cluster";
import { BasePostapi } from "../../Api/BasePostapi";
import { fileSystemSever } from "../../severs/fileSystemSever";
import { promises } from "dns";

let Deldivstyle=ref({
  background: '#f0f0f0',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '20px',
  borderRadius: '8px'
});
let files=ref<IoutMode[]>();
let Delfilelist:Ref<IoutMode[]>=ref([]);
let isfilesnull=ref<boolean>(false)
let Sha=ref<string>();
let IndentIcon=new Indentifyicon("../../static");
let Isdelteing=ref<boolean>(false)
let upper:boolean=false;
console.log("this home")
//更新列表
uni.$on("Getfillist/",(re)=>{
	Delfilelist.value=[]
   Updatafilelist(re);
})

function BtnNextpath(item:IoutMode){
	if(item.type=="tree")
	uni.$emit("Postfilest/path/tree",item)
	if(item.type=="blob")
	uni.$emit("Postfilest/path/blob",item)
	
}
function BtDetFile(item:IoutMode){
	Delfilelist.value.push(item)
}
uni.$on("Delclicked",()=>{
	console.log("delcilked")
	uni.$emit("DelOperation",Delfilelist.value)
})
uni.$on("isDelChang",(re)=>{
	if(re==true){
		console.log("had cl")
		Isdelteing.value=true
		
	}
	else {
		Isdelteing.value=false
		Delfilelist.value=[];
		}
})
function Updatafilelist(re:any){
	console.log(re)
	files.value=re;
	Isfilstnull(files)
}
function deladdlist(file:IoutMode){
	
}
// uni.$on("FiesystemError",(err)=>{
// 	Showerr(err);
// })
function Showerr(error:Error){
	uni.showToast({
		title:"文件重复",
		icon:"none"
	})
	console.log(error)
}
function Isfilstnull(files:Ref<IoutMode[]|undefined>){
	if(files.value==undefined){
		isfilesnull.value=false;
	}
	else isfilesnull.value=true
	
}

	     
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
