// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  api
} from '@/service/api'
import './assets/font/iconfont.css';
import store from '@/logic'
import qs from 'qs';
import VDistpicker from 'v-distpicker'
// import VueAMap from 'vue-amap';
import 'swiper/dist/css/swiper.css';
import {
  router
} from '@/router';
import i18n from './i18n/i18n';
// extends
import '@/extends'
import animated from 'animate.css'
Vue.component('v-distpicker', VDistpicker)
Vue.prototype.qs = qs;
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$Axios = Axios;
Vue.use(ElementUI);
Vue.use(animated)
// Vue.use(VueAMap);
/* eslint-disable no-new */
// VueAMap.initAMapApiLoader({
//   key: 'ddb760eccb37663cf34371ee79158b06',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
