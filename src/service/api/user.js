import axios from '@/libs/api.request'
export const user = {
  /**
   * 登录
   */
  login: (params) => {
    return axios.request({
      url: '/api/login',
      data: params,
      method: 'post'
    })
  },
  /**
   * 注册
   */
  register: (params) => {
    return axios.request({
      url: '/api/register',
      data: params,
      method: 'post'
    })
  },
  /**
   * 更新用户信息
   */
  updateUserInfo: (params) => {
    return axios.request({
      url: '/api/tuserdetails/update',
      data: params,
      method: 'post'
    })
  },
  /**
   * 修改密码
   */
  modifyPwd: (params) => {
    return axios.request({
      url: '/api/modifyPwd',
      data: params,
      method: 'post'
    })
  },
  /**
   * 重置密码
   */
  resetPassword: (params) => {
    return axios.request({
      url: '/api/resetPassword',
      data: params,
      method: 'post'
    })
  }
}
