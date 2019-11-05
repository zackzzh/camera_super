import Cookies from 'js-cookie';
import lockr from 'lockr';
export default {
  setToken: function (key, token) {
    Cookies.set(key, token);
  },
  clearToken: function (key) {
    Cookies.remove(key);
  },
  isLogin: function (key) {
    return Cookies.get(key);
  },
  getHistory: function (key) {
    return sessionStorage.getItem(key)
  },
  addHistory: function (key, value) {
    sessionStorage.setItem(key, value);
  },
  clearHistory: function (key) {
    sessionStorage.removeItem(key)
  },

  addlocalHistory: function (key, value) {
    lockr.set(key, value);
  },
  getlocalHistory: function (key) {
    return lockr.get(key)
  },
  clearlocalHistory: function (key) {
    lockr.rm(key)
  },
}
