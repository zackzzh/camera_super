import axios from '@/libs/api.request'
export const manageOrder = {
  /**
   * 订单发货
   */
  shipment: (params) => {
    return axios.request({
      url: '/api/torderplatform/shipment',
      params: params,
      method: 'get'
    })
  },
  /**
   * 订单列表
   */
  list: (params) => {
    return axios.request({
      url: '/api/torderplatform/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 取消订单
   */
  cancel: (params) => {
    return axios.request({
      url: '/api/torderplatform/cancel',
      params: params,
      method: 'get'
    })
  },
  /**
   * 订单详情
   */
  info: (params) => {
    return axios.request({
      url: '/api/torderplatform/info',
      params: params,
      method: 'get'
    })
  },
}
