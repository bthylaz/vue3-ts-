<template>
  <div class="page-content">
    <by-table v-bind="contentTableConfig" :listData="dataList">
      <template #headerHandler>
        <el-button size="medium" type="primary"> 新建用户 </el-button>
      </template>
      <template #status="scope">
        <el-button type="primary" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <!-- 格式化时间 -->
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <el-button icon="el-icon-edit" size="small" type="text">编辑</el-button>
        <el-button icon="el-icon-delete" size="small" type="text"
          >删除</el-button
        >
      </template>
    </by-table>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useStore } from '@/store'
import byTable from '@/base-ui/table'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const store = useStore()
store.dispatch('system/getPageListAction', {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const dataList = computed(() =>
  store.getters['system/pageListData'](props.pageName)
)
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
