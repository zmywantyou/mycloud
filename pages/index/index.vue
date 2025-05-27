<template>
  <view class="login-container">
    <!-- 标题区 -->
    <view class="logo-area">
      <image src="/static/logo.png" mode="aspectFit" class="logo" />
      <text class="title">欢迎登录</text>
    </view>

    <!-- 表单区 -->
    <view class="form-area">
      <view class="input-group">
        <input 
          type="text" 
          v-model="formState.username" 
          placeholder="请输入用户名/手机号"
          @confirm="handleLogin"
          :adjust-position="false"
        />
        <input 
          type="password" 
          v-model="formState.password" 
          placeholder="请输入密码"
          password
          @confirm="handleLogin"
          :adjust-position="false"
        />
      </view>

      <!-- 辅助功能 -->
      <view class="action-links">
        <text @click="navigateTo('forget')">忘记密码？</text>
        <text @click="navigateTo('register')">立即注册</text>
      </view>

      <!-- 登录按钮 -->
      <button 
        class="login-btn" 
        :loading="loading" 
        :disabled="!formValid"
        @click="handleLogin"
      >
        {{ loading ? '登录中...' : '立即登录' }}
      </button>     
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// 类型定义（网页7 类型安全强化）
interface FormState {
  username: string
  password: string
}

// 响应式数据
const formState = ref<FormState>({
  username: '',
  password: ''
})
const loading = ref(false)
const errorMessage = ref('')

// 登录逻辑（网页4 接口调用优化）
const handleLogin = async () => {
  if (!formValid.value) {
    errorMessage.value = '请填写完整信息'
    return
  }

  try {
    loading.value = true
    const { token, userInfo } = await login({
      account: formState.value.username,
      password: formState.value.password
    })
    
    // 状态管理（网页2 存储优化）
    uni.setStorageSync('token', token)
    uni.$emit('user-login', userInfo)
    
    uni.reLaunch({ url: '/pages/home/index' })
  } catch (error: any) {
    errorMessage.value = error.message || '登录失败'
  } finally {
    loading.value = false
  }
}

// 表单验证（网页3 逻辑强化）
const formValid = computed(() => 
  formState.value.username.length >= 3 && 
  formState.value.password.length >= 6
)

	function login(arg0: { account: string; password: string }): { token: any; userInfo: any } | PromiseLike<{ token: any; userInfo: any }> {
		throw new Error('Function not implemented.')
	}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 60rpx 40rpx;
  
  .logo-area {
    text-align: center;
    .logo {
      width: 200rpx;
      height: 200rpx;
    }
    .title {
      display: block;
      font-size: 48rpx;
      color: #333;
      margin: 30rpx 0;
    }
  }

  .form-area {
    .input-group {
      input {
        height: 100rpx;
        border-bottom: 1rpx solid #eee;
        margin-bottom: 40rpx;
        font-size: 32rpx;
      }
    }

    .action-links {
      display: flex;
      justify-content: space-between;
      margin: 40rpx 0;
      color: #666;
    }

    .login-btn {
      background: #007AFF;
      color: white;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 45rpx;
      font-size: 36rpx;
      
      &[disabled] {
        background: #ccc;
      }
    }

    .oauth-container {
      margin-top: 80rpx;
      .divider {
        color: #999;
        display: block;
        text-align: center;
        margin-bottom: 40rpx;
      }
      .oauth-icons {
        display: flex;
        justify-content: center;
        gap: 60rpx;
        image {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>