<template>
	<view class="form-container">
		<view class="form-card">
			<form>
				<h6 class='form-title'>存盘服务选择</h6>
				<label>git设置：</label>
				<label for="key">密钥</label>
				<input name="key" v-model="keys" type="text"/>
				<label for="warehouse">仓库路径</label>
				<input name="warehouse" v-model="warehouse" type="text"/>
				<label for="isup" >是否开启git存盘</label>
				<radio-group @change="radiochange">
				<radio id="isup" value="1" v-bind:checked="isradio" />开启 <radio id="ison" value="0" v-bind:checked="noisradio"/>关闭
				</radio-group>
			    <button @click="savebth">保存</button>
			</form>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { defineComponent,ref , defineModel} from 'vue';
	import { Setting } from '../../setting/Setting';
	import{Stroemode} from '../../setting/Setting';
	//为保证封包，直接扩展基础模型
	interface Stroemodegit extends Stroemode{
		
	}
	let keys=defineModel<string>("keys",{default:""});
	let isradio:boolean=false;
	let warehouse:string;
	let setting=new Setting();
	try{
	
	let store:string|null=null;
	//从wx小程序中拿出值
	 store= setting.GetWxStore();
	 if(store!=null){
//		 console.log("no");
	   const json:any=JSON.parse(store);
	   keys.value=json["Key"] as string;
	   isradio=json["Isup"] as boolean;
	   warehouse=json["Warehouse"]as string;
	}
	//noisradio是关闭checked的值，它是开启的反值
	
}
catch(err)
{
	console.log(err);
}
 let noisradio:boolean=!isradio;
	function radiochange(e:Event){
		console.log("radiochange");
		if((e.target as HTMLInputElement).value=="1"){
			isradio=true;
			noisradio=!isradio;
		}
		else{
			isradio=false;
			noisradio=!isradio;
		}
	}
	function savebth(e:Event){
		try{
		const bth=e.target as HTMLButtonElement;
		bth.textContent="保存中...";
		let stroemode:Stroemodegit={
			Warehouse:warehouse,
			Key:keys.value,
			Isup:isradio
		}
		setting.OutStromode=stroemode;
		setting.Wxstore();
		bth.textContent="保存";
		}
		catch(err){
			console.log(err);
		}
		
	}	
</script>

<style>

	label {
	  display: block;
	  margin: 12px 0 6px;
	  color: #4a5568;
	  font-size: 14px;
	}
	
	/* 输入框样式 */
	input[type="text"] {
	  width: 100%;
	  padding: 5px 0px; 
	  border: 2px solid #e2e8f0;
	  border-radius: 8px; /* 圆角 */
	  background: rgba(255,255,255,0.9);
	  transition: all 0.3s ease;
	}
	button{
		margin-top: 10px;
	}
	input[type="text"]:focus {
	  border-color: #63b3ed;
	  box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.2);
	}
	
	/* 标题样式 */
	.form-title {
	  text-align: left;
	  color: #2d3748;
	  margin-bottom: 3px;
	  padding-bottom: 3px;
	 
	}
.form-container {
background-color: white;
  padding: 20px;
}

.form-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px); /* 磨砂效果核心 */
  border-radius: 12px; /* 圆角设置 */
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
</style>
