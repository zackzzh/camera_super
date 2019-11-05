import Axios from 'axios'
import store from '@/logic/common/index'
import {
  router
} from '@/router';
import session from '@/libs/session';
import {
  Message
} from 'element-ui';
class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
  }
  //请求拦截
  interceptors(instance, url) {
    //添加请求拦截
    instance.interceptors.request.use(config => {
      let token = session.getHistory('token');
      config.headers = {
        'Content-Type': 'application/json',
      }
      if (token && token.length > 0) {
        config.headers = {
          'Content-Type': 'application/json',
          'token': token,
        }
      }
      return config;
    }, error => {
      return Promise.reject(error);
    })
    instance.interceptors.response.use((res) => {
      if (res.data.code == 503) {
        router.push({
          path: "login",
          name: 'login'
        })
        session.clearHistory("username");
        session.clearHistory("is_login");
        session.clearHistory("userType");
        session.clearHistory("token");
        let message;
        switch (store.state.lang) {
          case 'cn':
            message = "登录已失效，请重新登录";
            break;
          case 'en':
            message = "Login has expired, please login again";
            break;
          default:
            message = "登录已失效，请重新登录";
            break;
        }
        Message({
          message: message,
          type: 'error'
        });
        return false;
      }
      return res.data;
    }, error => {
      return Promise.reject(error)
    })
  }
  create() {
    let conf = {
      baseURL: 'http://47.75.4.115/mall', //生产环境
      // baseURL: 'http://localhost:8080', // 开发环境
      //172.31.160.253
      //47.75.4.115
      timeout: 5000,
    }
    return Axios.create(conf)
  }
  request(options) {
    var instance = this.create()
    this.interceptors(instance)
    options = Object.assign({}, options)
    return instance(options)
  }
}
export default httpRequest
