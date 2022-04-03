<template>
  <div class="user">
    <PageSearch
      :search-form-config="searchFormConfig"
      @query-btn-click="handleQuery"
      @reset-btn-click="handleReset"
    />
    <pageContent
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    >
      <template #status="scope">
        <el-button type="primary" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </pageContent>
    <PageModal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      pageName="users"
      ref="pageModalRef"
    ></PageModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'

const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item: any) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item: any) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)
//动态获取部门和角色数据
const store = useStore()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem.options = store.state.entireDepartment.map((item) => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})

const [pageContentRef, handleReset, handleQuery] = usePageSearch()
</script>

<style scoped></style>
