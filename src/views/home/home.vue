<template>
  <el-container class="home">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="collapse = !collapse"></i>
        <img src="@/assets/images/11.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right" v-if="$store.state.user">
        <img :src="$store.state.user.avatar" alt />
        <span>{{$store.state.user.username}}，你好</span>
        <el-button type="primary" size="mini" @click="out">退出</el-button>
      </div>
    </el-header>
    <!-- 左侧列表 -->
    <el-container>
      <el-aside width="auto" class="aside">
        <el-menu
          :default-active="$route.fullPath"
          class="el-menu-vertical-demo"
          :collapse="collapse"
          :router="true"
        >
          <el-menu-item
            :index="'/home/'+item.path"
            v-for="(item,index) in $router.options.routes[1].children"
            :key="index"
            v-show="item.meta.rules.includes($store.state.rules)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main class="main">
        <!-- 二级路由区域 -->
        <!-- keep-alive，缓存组件不重新刷新组件，保留组件的状态 -->
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, logOut } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      // user: "",
      collapse: false
    };
  },
  methods: {
    out() {
      this.$confirm("您确定要退出登录吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          logOut().then(() => {
            //删除token，回到登录页
            removeToken();
            this.$message.success("退出登录成功!");
            this.$router.push("/");
          });
        })
        .catch(() => {
          this.$message.info("已取消退出登录");
        });
    }
  },
  created() {
    //没有token就不调用接口
    if (!getToken()) {
      return this.$router.push("/");
    }

    getInfo().then(res => {
      //设置 账号身份
      this.$store.commit("setRules", res.data.role);
      // 设置状态管理vuex里面的数据
      this.$store.commit("setUser", res.data);
      //账号身份权限管理

      if (!this.$route.meta.rules.includes(res.data.role)) {
        this.$message.warning("你没有权限访问该页面哦");
      }
      if (res.data.status == 0) {
        //状态管理判断，没有权限进不去
        this.$message.warning("您账号已被禁用，请联系管理员");
        removeToken();
        this.$router.push("/");
      }
    });
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  .header {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      i {
        font-size: 30px;
        vertical-align: middle;
      }
      img {
        margin: 0 15px;
        width: 33px;
        height: 28px;
      }
      span {
        font-size: 22px;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        vertical-align: middle;
      }
    }
    .right {
      img {
        width: 43px;
        height: 43px;
      }
      span {
        margin: 0 15px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
      .main {
        background-color: #e8e9ec;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    // 过度动画效果
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}
</style>