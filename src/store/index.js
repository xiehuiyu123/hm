import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

//实例化vuex
const store = new Vuex.Store({
  state: {//状态管理
    user: ""
  },
  mutations: {
    setUser(data, res) {//初始化用户信息
      data.user = res;
      data.user.avatar = process.env.VUE_APP_URL + "/" + res.avatar;
    }
  }
})

//导出
export default store