import axios from '@/libs/api.request'
export const order = {
  /**
   * 生成订单
   */
  createOrder: (params) => {
    return axios.request({
      url: '/api/tordercustomer/createOrder',
      data: params,
      method: 'post'
    })
  },
  /**
   * 订单列表
   */
  list: (params) => {
    return axios.request({
      url: '/api/tordercustomer/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 删除订单
   */
  delete: (params) => {
    return axios.request({
      url: '/api/tordercustomer/delete',
      params: params,
      method: 'get'
    })
  },
  /**
   * 确认收货
   */
  confirm: (params) => {
    return axios.request({
      url: '/api/tordercustomer/confirm',
      params: params,
      method: 'get'
    })
  },
  /**
   * 取消订单
   */
  cancel: (params) => {
    return axios.request({
      url: '/api/tordercustomer/cancel',
      params: params,
      method: 'get'
    })
  },
  /**
   * 订单详情
   */
  info: (params) => {
    return axios.request({
      url: '/api/tordercustomer/info',
      params: params,
      method: 'get'
    })
  },
  /**
   * 订单详情组
   */
  query: (params) => {
    return axios.request({
      url: '/api/tordercustomer/query',
      data: params,
      method: 'post'
    })
  },
  /**
   * 客户确认付款
   */
  confirmPayment: (params) => {
    return axios.request({
      url: '/api/tordercustomer/confirmPayment',
      params: params,
      method: 'get'
    })
  },
}
