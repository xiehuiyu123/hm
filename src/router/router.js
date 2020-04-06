import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/views/login/login.vue'
//
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: login }
  ]
});
//导出路由
export default router;