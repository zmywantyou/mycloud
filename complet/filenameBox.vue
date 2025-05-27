<template>
	<view class="filenamebox" v-if="changed">
	  <input type="text" :style="textstyle" v-model="inputvalue"/>
	<view class="butview">
		<button @click="maketrue">确定</button>
		<button @click="cancel">取消</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import {BasePostapi,postdata} from'../Api/BasePostapi';
import { IoutMode } from '../Mode/IoutMode';
import { CreateUrl,Getype } from '../Tool/CreateUrl';
import { Setting } from '../setting/Setting';
import { TreeNode } from '../Tool/TreeNode';
import { BaseGetapi } from '../Api/BaseGetapi';
import { url } from 'inspector';
import { allfillisturl } from '../Tool/allfillisturl';
import { basename } from 'path';
import { createSecretKey } from 'crypto';
// const Store:null|string=new Setting().GetWxStore();
let changed:Ref<boolean>=ref(false);
let inputvalue:Ref<string>=ref("新建文件夹1");
let textstyle=ref("color: black;");
textstyle.value="color: black";
function cancel(){
	changed.value=false;
	uni.$emit('filechanged',false)
}
async function maketrue(){
     uni.$emit("newfile",inputvalue.value);	
	
}
uni.$on("FiesystemError",(data)=>{
	console.log("fissysemerror is ")
	if(data==1){
	textstyle.value="color: red";
	uni.showToast({
		title:"文件重复",
		icon:"none"
	})
	}
})
uni.$on('filechanged',(data)=>{
	textstyle.value="color: black";
	 changed.value=data;
	});

</script>

<style scoped>
	
	.filenamebox{
		/*浮动设置*/
		position: fixed;
		top:4%;
	    left:4%;
		width: 90%;
		height: 20%;
		/*样式设置*/
		border-radius: 5%;
		box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05);
		 border: 2px solid whitesmoke; 
		background-color: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px); /* 背景模糊 */
		-webkit-backdrop-filter: blur(10px); /* 兼容老版本 Safari */
	}
	input{
		
		text-align: center;
	    margin: auto;
		margin-top: 5%;
		height: 20%;
		width: 85%;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05);
		/* color: black; */
		font-size: 140%;
	}
	 .butview{
		 
		 margin-top: 8%;
		 display: flex;
	 }
	 .butview button{
		 width: 40%;
	 }
	 .butview :first-child{
		 color: white;
		 background-color:  #229fff;
	 }
</style>