<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTag">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </span>
        </template>
        <loginPhone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="checkbox">
      <el-checkbox v-model="isKeepPassword" label="记住密码" />
      <el-link>找到密码</el-link>
    </div>
    <el-button type="primary" class="login" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
// import { Calendar } from '@element-plus/icons-vue'
import { ref } from 'vue'
import loginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

const isKeepPassword = ref(true)
const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
const loginPhoneRef = ref<InstanceType<typeof loginPhone>>()

const currentTag = ref('account')

const handleLogin = () => {
  if (currentTag.value === 'account') {
    loginAccountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // loginPhoneRef.value?
    console.log('phoneRef调用方法！')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 360px;
}
.title {
  text-align: center;
}
.checkbox {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}
.login {
  width: 100%;
  margin-top: 5px;
}
</style>
