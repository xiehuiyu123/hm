import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/views/login/login.vue'
import home from "@/views/home/home.vue"
//
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: login },
    { path: '/home', component: home },
  ]
});
//导出路由
export default router;