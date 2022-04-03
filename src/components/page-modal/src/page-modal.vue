<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, defineExpose } from 'vue'
import { useStore } from '@/store'
import HyForm from '@/base-ui/form/src'
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})
const dialogVisible = ref(false)
defineExpose({ dialogVisible })
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)
const formData = ref<any>({})

// 点击确定区分是编辑请求还是新建请求
const store = useStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value }
    })
  }
}
</script>

<style scoped></style>
