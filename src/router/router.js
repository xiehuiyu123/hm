import Vue from 'vue';
import VueRouter from 'vue-router';
// import login from '@/views/login/login.vue'
// import home from "@/views/home/home.vue"

//路由懒加载
const login = () => import("@/views/login/login.vue")
const home = () => import("@/views/home/home.vue")
const chart = () => import("@/views/home/chart/chart.vue")
const business = () => import("@/views/home/business/business.vue")
const question = () => import("@/views/home/question/question.vue")
const subject = () => import("@/views/home/subject/subject.vue")
const userList = () => import("@/views/home/userList/userList.vue")
//
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: login },
    {
      path: '/home',
      component: home,
      // 二级路由
      children: [
        { path: 'chart', component: chart },
        { path: 'business', component: business },
        { path: 'question', component: question },
        { path: 'subject', component: subject },
        { path: 'userList', component: userList }
      ]
    },
  ]
});
//导出路由
export default router;