import Vue from 'vue';
import VueRouter from 'vue-router';

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
  mode: 'history',//改成history模式
  routes: [
    { path: '/', component: login, meta: { title: '登录页' } },
    {
      path: '/home',
      redirect: "/home/subject",//进入home后，重定向一个子路由
      component: home,
      meta: { title: '主页' },
      // 二级路由
      children: [
        { path: 'chart', component: chart, meta: { title: '数据概览' } },
        { path: 'business', component: business, meta: { title: '企业列表' } },
        { path: 'question', component: question, meta: { title: '题库列表' } },
        { path: 'subject', component: subject, meta: { title: '学科列表' } },
        { path: 'userList', component: userList, meta: { title: '用户列表' } }
      ]
    },
  ]
});

//导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  NProgress.start() //导航条开始
  document.title = to.meta.title //设置title标题
  next()
})

router.afterEach(() => {
  NProgress.done()//导航条结束
})

//导出路由
export default router;