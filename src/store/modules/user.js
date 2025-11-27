import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state() {
    return {
      //个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    //所有的mutations的第一个参数，都是state
    setUserInfo(state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout(context) {
      //重置个人信息
      context.commit('setUserInfo', {})
      //重置购物车信息（跨模块调用mutation）  cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}