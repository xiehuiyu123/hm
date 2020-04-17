import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index.js"
import { Message } from 'element-ui';

//导航条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
  // mode: 'history',//改成history模式
  routes: [
    { path: '/', component: login, meta: { title: '登录页', rules: ["超级管理员", "初始超级管理员", "管理员", "老师", "学生"] } },
    {
      path: '/home',
      redirect: "/home/subject",//进入home后，重定向一个子路由
      component: home,
      meta: { title: '主页', rules: ["超级管理员", "初始超级管理员", "管理员", "老师", "学生"] },
      // 二级路由
      children: [
        {
          path: 'chart', component: chart,
          meta: { title: '数据概览', rules: ["超级管理员", "初始超级管理员", "管理员", "老师"], icon: 'el-icon-pie-chart' }
        },
        {
          path: 'business', component: business,
          meta: { title: '企业列表', rules: ["超级管理员", "初始超级管理员", "管理员", "老师"], icon: 'el-icon-office-building' }
        },
        {
          path: 'question', component: question,
          meta: { title: '题库列表', rules: ["超级管理员", "初始超级管理员", "管理员", "老师"], icon: 'el-icon-edit-outline' }
        },
        {
          path: 'subject', component: subject,
          meta: { title: '学科列表', rules: ["超级管理员", "初始超级管理员", "管理员", "老师", "学生"], icon: 'el-icon-notebook-2' }
        },
        {
          path: 'userList', component: userList,
          meta: { title: '用户列表', rules: ["超级管理员", "初始超级管理员", "管理员"], icon: 'el-icon-user' }
        }
      ]
    },
  ]
});

//导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  NProgress.start() //导航条开始
  document.title = to.meta.title //设置title标题


  if (to.meta.rules.includes(store.state.rules)) {
    next()
  } else {
    Message.warning("你没有权限访问该页面哦")
    next("/")
  }

})

router.afterEach(() => {
  NProgress.done()//导航条结束
})

//导出路由
export default router;