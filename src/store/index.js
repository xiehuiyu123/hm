import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

//实例化vuex
const store = new Vuex.Store({
  state: {//状态管理
    user: "",
    roleObj: {
      1: "超级管理员",
      2: "管理员",
      3: "老师",
      4: "学生"
    },
    rules: "超级管理员"// 先给个通用身份先进页面，在重新赋值身份判断权限
  },
  mutations: {
    setUser(data, res) {//初始化用户信息
      data.user = res;
      data.user.avatar = process.env.VUE_APP_URL + "/" + res.avatar;
    },
    setRules(data, res) {
      data.rules = res
    }
  }
})

//导出
export default store