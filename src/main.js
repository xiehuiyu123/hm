import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//vuex状态管理
import store from "@/store/index.js"

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,//将路由挂载到vue实例中
  store,  //将状态管理挂到vue实例中
}).$mount('#app')
