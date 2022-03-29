<template>
  <div class="user">
    <PageSearch :search-form-config="searchFormConfig" />
    <pageContent :contentTableConfig="contentTableConfig" pageName="users" />
  </div>
</template>

<script lang="ts" setup>
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
</script>

<style scoped></style>
