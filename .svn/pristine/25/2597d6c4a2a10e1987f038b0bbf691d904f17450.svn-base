import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/config/routes'
Vue.use(Router)
export const router = new Router({
  routes,
  /**
   * 
   * @param {*} to 到那个页面
   * @param {*} from 从哪个页面
   * @param {*} savedPosition 跳转返回顶部
   */
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
