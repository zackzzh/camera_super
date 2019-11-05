import axios from '@/libs/api.request'
export const product = {
  /**
   * 产品列表
   */
  list: (params) => {
    return axios.request({
      url: '/api/tgoodsinfo/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 产品详情
   */
  info: (params) => {
    return axios.request({
      url: '/api/tgoodsinfo/info',
      params: params,
      method: 'get'
    })
  },
}
