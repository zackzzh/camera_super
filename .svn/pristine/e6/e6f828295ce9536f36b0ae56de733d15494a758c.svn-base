import * as types from './mutation-types';
import session from '@/libs/session';
import {
  api
} from '@/service/api'
export const actions = {
  /**
   * 登录
   * @param {} param0 
   * @param {*} o 
   */
  async login({
    commit
  }, o) {
    let res = await api.user.login(o)
    if (res.code == 200) {
      commit(types.SET_LOGIN_STATE, true);
      session.addHistory('token', res.token);
      session.addHistory('userType', res.userType);
      session.addHistory('email', res.email);
      session.addHistory('is_login', true);
      session.addHistory('username', res.username);
    }
    return res;
  },
  /**
   * 注册
   */
  async register({
    commit
  }, o) {
    let res = await api.user.register(o)
    if (res.code == 200) {
      commit(types.SET_LOGIN_STATE, true);
      session.addHistory('token', res.token);
      session.addHistory('userType', res.userType);
      session.addHistory('is_login', true);
      session.addHistory('username', o.username);
      session.addHistory('email', o.email);
    }
    return res
  },
  /**
   * 更新用户信息
   * @param {*} param0 
   * @param {*} o 
   */
  async updateUserInfo({}, o) {
    let res = await api.user.updateUserInfo(o)
    return res;
  },
  /**
   * 修改密码
   * @param {} param0 
   * @param {*} o 
   */
  async modifyPwd({}, o) {
    let res = await api.user.modifyPwd(o)
    return res;
  }
}
