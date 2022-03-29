<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">VUE3+TS</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      :collapse="collapse"
      class="el-menu-vertical"
      :default-active="defaultValue"
      text-color="#fff"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="children in item.children" :key="children.id">
              <el-menu-item
                :index="children.id + ''"
                @click="handleClickJump(children)"
              >
                <i v-if="children.icon" :class="children.icon"></i>
                <span>{{ children.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const store = useStore()
const router = useRouter()
const route = useRoute()
const userMenus = computed(() => store.state.login.userMenus)
//1.获取当前url的id
const currentMenu = pathMapToMenu(userMenus.value, route.path)
const defaultValue = ref(currentMenu.id + '')

const handleClickJump = (route: any) => {
  // router.push(route.url)
  router.push({ path: route.url ?? '/not-found' })
}
</script>

<style lang="less" scoped>
.nav-menu {
  height: 60px;
  background-color: #001529;
  .logo {
    height: 28px;
    display: flex;
    align-items: center;
    padding: 12px 10px 8px 10px;
    justify-content: center;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
