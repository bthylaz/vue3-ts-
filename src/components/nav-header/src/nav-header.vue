<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <BreadCrumb :breadcrumbs="breadCrumbData" />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import UserInfo from './user-info.vue'
import BreadCrumb, { IBreadcrumb } from '@/base-ui/breadcrumb/src'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

const isFold = ref(false)

const store = useStore()

//面包屑数据
// 1.获取面包屑的数据
const breadCrumbData = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const emit = defineEmits(['foldChange'])
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
}
.fold-menu {
  font-size: 30px;
  cursor: pointer;
  padding-right: 10px;
}
.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
