import axios from '@/libs/api.request'
export const cart = {
  /**
   * 清空购物车
   */
  deleteAll: (params) => {
    return axios.request({
      url: '/api/tshoppingcar/deleteAll',
      data: params,
      method: 'post'
    })
  },
  /**
   * 购物车列表
   */
  save: (params) => {
    return axios.request({
      url: '/api/tshoppingcar/save',
      data: params,
      method: 'post'
    })
  },
  /**
   * 加入购物车
   */
  list: (params) => {
    return axios.request({
      url: '/api/tshoppingcar/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 删除购物车
   */
  delete: (params) => {
    return axios.request({
      url: '/api/tshoppingcar/delete',
      data: params,
      method: 'post'
    })
  },
  /**
   * 获取购物车数量和未读信息数量
   */
  getMsgNum: (params) => {
    return axios.request({
      url: '/api/tshoppingcar/getMsgNum',
      params: params,
      method: 'get'
    })
  },
  
}
