import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system'
import { IRootState, IStoreType } from './type'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'bthyla',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})
store.dispatch('login/loadLoginCache')

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
