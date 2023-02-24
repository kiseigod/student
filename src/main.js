import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import router from './router'
import service from './utils/service'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.prototype.service = service  //挂载到原型，可以全局使用
Vue.prototype.$echarts = echarts  //挂载到原型，可以全局使用
Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
      next('/login')
    }else next()
  } next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
