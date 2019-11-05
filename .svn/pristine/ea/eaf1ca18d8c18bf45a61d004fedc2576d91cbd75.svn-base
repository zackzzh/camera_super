import * as types from './mutation-types';

export const mutations = {
  [types.SET_TABS_STATE](state, o) {
    state.active = o;
  },
  [types.SET_LANG_STATE](state, o) {
    state.lang = o;
  },
  [types.SET_RATE_STATE](state, o) {
    let ob = {};
    switch (state.lang) {
      case 'cn':
        state.rate = 1;
        state.currency = 'CNY';
        break;
      case 'en':
        ob = o.find(data => {
          return data.code === 'USD'
        })
        state.rate = ob.rate;
        state.currency = ob.code;
        break;
      case 'tc':
        ob = o.find(data => {
          return data.code === 'HKD'
        })
        state.rate = ob.rate;
        state.currency = ob.code;
        break
    }
  },
}
