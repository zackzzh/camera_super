import * as types from './mutation-types';
import {
  api
} from '@/service/api'
export const actions = {
  /**
   * 加入购物车
   * @param {*} param0 
   * @param {*} o 
   */
  async addCart({
    dispatch
  }, o) {
    let res = await api.cart.save(o)
    if (res.code == 200) {
      await dispatch('cartList')
    }
    return res;
  },
  /**
   * 获取购物车列表
   * @param {*} param0 
   * @param {*} o 
   */
  async cartList({
    commit
  }, o) {
    let res = await api.cart.list({})
    if (res.code == 200) {
      commit(types.INIT_CART_NUMBER, res.page.totalCount)
      commit(types.INIT_CART_LIST, res.page.list)
    }
  },
  async cartNumber({
    commit
  }, o) {
    commit(types.INIT_CART_NUMBER, o.length)
    commit(types.INIT_CART_LIST, o)
  },
  async getMsgNum({
    commit
  }, o) {
    let res = await api.cart.getMsgNum({})
    if (res.code === 200) {
      commit(types.INIT_CART_NUMBER, res.shoppingCarsNum)
      commit(types.INIT_MESSAGE_NUMBER, res.messageNum)
    }
  }
}
