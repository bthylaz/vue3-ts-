<template>
  <div class="main">
    <el-container class="main-content">
      <!-- <el-aside :width="'210px'"> -->
      <el-aside :width="!isCollapse ? '210px' : '60px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="page-header">
          <NavHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  console.log(isFold)
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-header {
  height: 40px;
}
.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.page-info {
  border-radius: 5px;
  background-color: #fff;
}
</style>
