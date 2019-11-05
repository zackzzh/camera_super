import axios from '@/libs/api.request'
export const sendCode = {
  /**
   * 注册短信
   */
  sendRegisterCode: (params) => {
    return axios.request({
      url: '/api/sendRegisterCode',
      params: params,
      method: 'get'
    })
  },
  /**
   * 重置密码短信
   */
  sendResetPwdCode: (params) => {
    return axios.request({
      url: '/api/sendResetPwdCode',
      params: params,
      method: 'get'
    })
  }
}
