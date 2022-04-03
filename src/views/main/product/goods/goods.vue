<template>
  <div class="goods">
    <pageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #status="scope">
        <el-button type="primary" plain>{{
          scope.row.status ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
    </pageContent>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
import pageContent from '@/components/page-content/src/page-content.vue'
</script>

<style scoped></style>
