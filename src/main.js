import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'
// 加载动态设置REM基准值
import 'amfe-flexible'
// 加载dayjs初始化配置
import './utils/dayjs.js'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
