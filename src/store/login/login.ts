import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'
import { mapMenusToRouters } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
      //动态注册路由
      const routes = mapMenusToRouters(userMenus)
      // 将路由注册到main.chilren里面
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  getters: {},
  actions: {
    async loginAccountAction({ commit }, payload: IAccount) {
      //1.发送登录请求
      const result = await accountLoginRequest(payload)
      // console.log(result)
      const { id, token } = result.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.获取用户信息
      const userInfo = await requestUserInfoById(id)
      commit('changeUserInfo', userInfo.data)
      localCache.setCache('userInfo', userInfo.data)

      // 3.获取用户权限菜单
      const userMenus = await requestUserMenusByRoleId(id)
      commit('changeUserMenus', userMenus.data)
      localCache.setCache('userMenus', userMenus.data)

      // 4.跳到首页
      router.push('/main')
    },
    loadLoginCache({ commit }) {
      const token = localCache.getCache('token')
      if (token) commit('changeToken', token)
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) commit('changeUserInfo', userInfo)
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) commit('changeUserMenus', userMenus)
    }
  }
}
export default loginModule
