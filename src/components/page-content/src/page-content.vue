<template>
  <div class="page-content">
    <by-table
      v-bind="contentTableConfig"
      :listData="dataList"
      v-model:page="pageInfo"
      :listCount="listCount"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handleNewClick"
        >
          新建用户
        </el-button>
      </template>

      <!-- 格式化时间 -->
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          icon="el-icon-edit"
          size="small"
          type="text"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          icon="el-icon-delete"
          size="small"
          type="text"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
      <template
        v-for="item of otherPropSlots"
        #[item.slotName]="scope"
        :key="item.prop"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </by-table>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import { useStore } from '@/store'
import byTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

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
defineExpose({
  getPageData
})
const emit = defineEmits(['newBtnClick', 'editBtnClick'])
// 0.获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})
watch(pageInfo, () => getPageData())
const store = useStore()
function getPageData(data: any = {}) {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.pageSize * pageInfo.value.currentPage,
      size: pageInfo.value.pageSize,
      ...data
    }
  })
}
getPageData()

const dataList = computed(() =>
  store.getters['system/pageListData'](props.pageName)
)
const listCount = computed(() =>
  store.getters['system/pageListCount'](props.pageName)
)

const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

//删除操作
function handleDeleteClick(row: any) {
  const { id } = row
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id
  })
}

// 新建用户
function handleNewClick() {
  emit('newBtnClick')
}
function handleEditClick(value: any) {
  emit('editBtnClick', value)
}
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
