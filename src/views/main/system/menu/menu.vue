<template>
  <div class="menu">
    <pageContent :contentTableConfig="contentTableConfig" pageName="menu">
    </pageContent>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
import pageContent from '@/components/page-content/src/page-content.vue'
</script>

<style scoped></style>
