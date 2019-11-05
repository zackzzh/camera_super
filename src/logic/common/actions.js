import * as types from './mutation-types';
import {
  api
} from '@/service/api'
export const actions = {
  /**
   * 改变头部选中状态
   */
  tabsActive({
    commit
  }, active) {
    commit(types.SET_TABS_STATE, active);
  },
  //语言切换
  language({
    commit
  }, lang) {
    commit(types.SET_LANG_STATE, lang);
  },
  //货币
  getRate({
    commit
  }) {
    api.home.getRate({})
      .then((res) => {
        commit(types.SET_RATE_STATE, res.exchangeRateList);
      })
  }
}
