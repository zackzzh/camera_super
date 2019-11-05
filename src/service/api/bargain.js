import axios from '@/libs/api.request'
export const bargain = {
  /**
   * 生成议价单
   */
  createOrder: (params) => {
    return axios.request({
      url: '/api/torderbargain/createOrder',
      data: params,
      method: 'post'
    })
  },
  /**
   * 议价单列表
   */
  list: (params) => {
    return axios.request({
      url: '/api/torderbargain/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 删除议价单
   */
  delete: (params) => {
    return axios.request({
      url: '/api/torderbargain/delete',
      params: params,
      method: 'get'
    })
  },
  /**
   * 议价单详情
   */
  info: (params) => {
    return axios.request({
      url: '/api/torderbargain/info',
      params: params,
      method: 'get'
    })
  },
  /**
   * 取消议价单
   */
  cancel: (params) => {
    return axios.request({
      url: '/api/torderbargain/cancel',
      params: params,
      method: 'get'
    })
  },
  /**
   * 再次议价单
   */
  update: (params) => {
    return axios.request({
      url: '/api/torderbargain/update',
      data: params,
      method: 'post'
    })
  },
  /**
   * 确认议价并生成代付款的订单
   */
  confirm: (params) => {
    return axios.request({
      url: '/api/torderbargain/confirm',
      data: params,
      method: 'post'
    })
  },
}
