<template>
	 <div class="addbtn">
		 <div  v-if="changed">
		<button  @click="bthclick">+</button>
		</div>
		<div class="listdiv" v-else>
			<div><image src="/static/centred.png" @click="backclick" /></div>
		<list-view>
			<div class="fex">
		<list-item >
				<image src="/static/fistrt.png" @click="Upperlevel"/>
				 <text>上一级</text>
				</list-item>
		<list-item v-if="delchanged">
				<image src="/static/Canceldel.png" @click="cancelDelChanged"/>
				<text>取消</text>
				</list-item>
	    <list-item>
                   <image :src="deltimgsrc" @click="!delchanged?Delfilelist():Delfiles()"/>
				 <text>{{deltext}}</text>
				 </list-item>
	    <list-item>
		
			<image src="/static/addfiles.png" @click="addfile"/>
			 <text>新建</text>
			
			</list-item>
			<list-item>			
				<image src="/static/addfile.png" @click="upfile"/>
				 <text>上传</text>
				</list-item>
				</div>
		</list-view>
		</div>
	 </div>
</template>

<script lang="ts" setup>
	import { Ref, onMounted, ref} from 'vue';
import { CreateUrl, Getype } from '../Tool/CreateUrl';
import { Setting } from '../setting/Setting';
import { allfillisturl } from '../Tool/Allfillisturl';
import { BasePostapi } from '../Api/BasePostapi';
	let changed:Ref<boolean>=ref(true);
	let deltext:Ref<string>=ref("删除");
	let delchanged:Ref<boolean>=ref(false);
	let deltimgsrc:Ref<string>=ref("/static/del.png");
 function upfile(){
	uni.$emit("Upfile")
	}
	function cancelDelChanged(){
		uni.$emit("isDelChang",false)
		DelChanged(false)
	}
	function Delfiles(){
		console.log("delcilked")
		uni.$emit("Delclicked")
	}
	function Delfilelist(){
		DelChanged(true)
		uni.$emit("isDelChang",true)
	}	
	function DelChanged(stuats:boolean){
		if(stuats==false){
			delchanged.value=false
			deltext.value="删除"
		}
		else {
			deltext.value="确认删除"
			delchanged.value=true
		}
	}
	function Upperlevel(){
		uni.$emit("upperlevel");
	}
	function addfile(){
		uni.$emit("filechanged",true);
	}
	function bthclick(){
		 
     setTimeout(()=>{
		 changed.value=false;
	 },500) 
	  
	}
	function backclick(){
		changed.value=true;
	}
</script>

<style scoped>
.fliex{
	display: flex;
	 flex-direction:column;
	   flex-wrap: nowrap;
	 align-items: center;
	
}

/* label{
	 display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 8px;
} */

.addbtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
.listdiv{
	margin-right: 20px;
	background: #6A95CC;  
	border-radius: 10px;  
	 border: 1px solid rgba(255,255,255,0.15);
     backdrop-filter: blur(100px);
      -webkit-backdrop-filter: blur(100px); /* Safari兼容 */
	/* 阴影增强 */
	box-shadow: 0 6px 12px rgba(33,150,243,0.3); /* 带品牌色透明度[4,5](@ref) */
	
	/* 交互动效 */
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	
	/* 内容居中 */
	display: flex;
	 flex-direction: row;
	  flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}
text{
	color: beige;
}
.fex{
	  display: flex;
	   flex-direction:row;
	   align-items: center; 
	    
}
list-item{
	margin: 4px;
	font-size: 50%;
 	display: flex;
	 flex-direction:column;
	 align-items: center; 
}
image{
	padding: 2px;
	width: 35px;
	height: 35px;
}
button {
  /* 基础属性 */
  width: 56px;          /* 标准尺寸 */
  height: 56px;         /* 保持宽高一致 */
  font-size: 24px;
  background: #229fff;  /* Material 蓝 */
  color: white;
  border: none;

  /* 圆形实现 */
  border-radius: 50%;   /* 替代 40px 更规范 */
  
  /* 阴影增强 */
  box-shadow: 0 6px 12px rgba(33,150,243,0.3); /* 带品牌色透明度[4,5](@ref) */

  /* 交互动效 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 内容居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 悬停状态 */
button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(33,150,243,0.4); 
}

/* 点击态优化 */
button:active {
	 animation: slideIn 0.5s ease-out;
  /* transition: all 1s ease 10s; */
  background: #6A95CC;
  box-shadow: 0 4px 8px rgba(33,150,243,0.2);
  
}

@keyframes slideIn {
  from { transform: translateX(-200%); }
  to { transform: translateX(0); }
}
button:checked{
	background: #6A95CC;
	
}

</style>
