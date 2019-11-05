import axios from '@/libs/api.request'
export const address = {
  /**
   * 新增地址
   */
  save: (params) => {
    return axios.request({
      url: '/api/tuseraddress/save',
      data: params,
      method: 'post'
    })
  },
  /**
   * 编辑地址
   */
  update: (params) => {
    return axios.request({
      url: '/api/tuseraddress/update',
      data: params,
      method: 'post'
    })
  },
  /**
   * 删除地址
   */
  delete: (params) => {
    return axios.request({
      url: '/api/tuseraddress/delete',
      data: params,
      method: 'post'
    })
  },

  /**
   * 地址列表
   */
  list: (params) => {
    return axios.request({
      url: '/api/tuseraddress/list',
      data: params,
      method: 'post'
    })
  },
  /**
   * 银行信息
   */
  info: (params) => {
    return axios.request({
      url: '/api/tplatformbankinfo/info',
      data: params,
      method: 'post'
    })
  },
}
