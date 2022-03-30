<template>
  <div class="page-search">
    <ByForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleReset"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </ByForm>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue'
import ByForm from '@/base-ui/form/src'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 优化点一：内部的formData根据外部的配置文件动态生成，不能写死
const searchFormData = props.searchFormConfig?.formItems ?? []

const fromDataOrigin: any = {}
for (const item of searchFormData) {
  fromDataOrigin[item.field] = ''
}
const formData = ref(fromDataOrigin)

// 优化点2：点击重置按钮，重置
const handleReset = () => {
  for (const key in fromDataOrigin) {
    formData.value[`${key}`] = fromDataOrigin[key]
  }
  emit('resetBtnClick')
}
// 搜索
const handleSearch = () => {
  emit('queryBtnClick', formData.value)
}
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
