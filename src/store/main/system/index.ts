import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersCount: 0,
      usersList: [],
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // console.log('payload', payload)
      // 发送请求
      // 1.对页面发送请求
      const pageResult = await getPageListData(
        `/${payload.pageName}/list`,
        payload.queryInfo
      )
      // console.log(pageResult)

      const { list, totalCount } = pageResult.data
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}
export default systemModule
