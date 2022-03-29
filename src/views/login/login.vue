<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import loginPanel from './cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/login-bg.svg);
}
</style>
