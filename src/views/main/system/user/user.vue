<template>
  <div class="user">
    <PageSearch
      :search-form-config="searchFormConfig"
      @query-btn-click="handleQuery"
      @reset-btn-click="handleReset"
    />
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    />
  </div>
</template>

<script lang="ts" setup>
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

import { usePageSearch } from '@/hooks/use-page-search'

//这种setup形式的ref调用方法会有点问题？？？？  因为setup模式默认不暴露，需要使用defineExpose
const [pageContentRef, handleReset, handleQuery] = usePageSearch()
</script>

<style scoped></style>
