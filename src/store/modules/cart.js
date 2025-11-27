import { getCartList, changeCount, deleteCartList } from "@/api/cart.js";
import { Toast } from "vant";

export default {
  namespaced: true,
  state() {
    return {
      cartList: []
    }
  },
  mutations: {
    //提供一个设置cartList的mutation
    setCartList(state, newList) {
      state.cartList = newList
    },
    toggleCheck(state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck(state, flag) {
      //让所有的小选框，同步设置
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount(state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartList(context) {
      const { data } = await getCartList();
      console.log(data);
      data.list.forEach(item => {
        item.isChecked = true
      });
      context.commit('setCartList', data.list)
    },
    async changeCountAction(context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await changeCount(goodsId, value, skuId)
    },
    async deleteCartList(context) {
      const setCartList = context.getters.setCartList
      const cartIds = setCartList.map(item => item.id)
      console.log(cartIds);
      await deleteCartList(cartIds)
      //重新拉取最新的购物车数据（重新渲染）
      context.dispatch('getCartList')
      Toast('删除成功')
    }
  },
  getters: {
    //求所有的商品累加总数
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    //选中的商品项
    setCartList(state) {
      return state.cartList.filter(item => item.isChecked)
    },
    //选中的总数
    setCount(state, getters) {
      return getters.setCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    //选中的总价
    setPrice(state, getters) {
      return getters.setCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    //是否全选
    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}