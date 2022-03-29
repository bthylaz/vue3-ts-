<template>
  <div class="page-search">
    <ByForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </ByForm>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import ByForm from '@/base-ui/form/src'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
