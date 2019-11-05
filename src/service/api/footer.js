import axios from '@/libs/api.request'
export const footer = {
  /**
   * 关于我们
   */
  getAboutUs: (params) => {
    return axios.request({
      url: '/api/pageFooter/getAboutUs',
      params: params,
      method: 'get'
    })
  },
  /**
   * 联系我们
   */
  getContactUs: (params) => {
    return axios.request({
      url: '/api/pageFooter/getContactUs',
      params: params,
      method: 'get'
    })
  },
  /**
   * 常见问题
   */
  getFAQ: (params) => {
    return axios.request({
      url: '/api/pageFooter/getFAQ',
      params: params,
      method: 'get'
    })
  },
  /**
   * 发票信息
   */
  getInvoice: (params) => {
    return axios.request({
      url: '/api/pageFooter/getInvoice',
      params: params,
      method: 'get'
    })
  },
   /**
   * 友情链接
   */
  getLinks: (params) => {
    return axios.request({
      url: '/api/pageFooter/getLinks',
      params: params,
      method: 'get'
    })
  },
   /**
   * 服务协议
   */
  getProtocol: (params) => {
    return axios.request({
      url: '/api/pageFooter/getProtocol',
      params: params,
      method: 'get'
    })
  },
  /**
   * 隐私政策
   */
  getRules: (params) => {
    return axios.request({
      url: '/api/pageFooter/getRules',
      params: params,
      method: 'get'
    })
  },
   /**
   * 购物流程
   */
  getShoppingProcess: (params) => {
    return axios.request({
      url: '/api/pageFooter/getShoppingProcess',
      params: params,
      method: 'get'
    })
  },
}
