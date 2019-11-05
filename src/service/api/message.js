import axios from '@/libs/api.request'
export const message = {
  /**
   * 通知信息接口
   */
  list: (params) => {
    return axios.request({
      url: '/api/message/list',
      params: params,
      method: 'get'
    })
  },
  /**
   * 更新信息接口
   */
  update: (params) => {
    return axios.request({
      url: '/api/message/update',
      params: params,
      method: 'get'
    })
  },
   /**
   * 清空信息接口
   */
  updateAll: (params) => {
    return axios.request({
      url: '/api/message/updateAll  ',
      params: params,
      method: 'get'
    })
  },
}
