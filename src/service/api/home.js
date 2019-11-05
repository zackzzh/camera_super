import axios from '@/libs/api.request'
export const home = {
  /**
   * 供应商
   */
  supplier: (params) => {
    return axios.request({
      url: '/api/homePage/supplier',
      data: params,
      method: 'post'
    })
  },
   /**
   * 游客
   */
  customer: (params) => {
    return axios.request({
      url: '/api/homePage/customer',
      data: params,
      method: 'post'
    })
  },
  /**
   * 游客
   */
  getRate: (params) => {
    return axios.request({
      url: '/api/homePage/getRate',
      params: params,
      method: 'get'
    })
  },
  /**
   * 公共底部
   */
  getFooterPicList: (params) => {
    return axios.request({
      url: '/api/homePage/getFooterPicList',
      params: params,
      method: 'get'
    })
  },
}
