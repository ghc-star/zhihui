import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入小仓库
import user from './modules/user'
import cart from './modules/cart'
export default new Vuex.Store({
  getters: {
    token(state) {
      return state.user.userInfo.token
    }
  },
  //实现Vuex仓库模块式开发存储数据
  modules: {
    user,
    cart
  }
})