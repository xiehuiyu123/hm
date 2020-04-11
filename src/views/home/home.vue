<template>
  <el-container class="home">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="collapse = !collapse"></i>
        <img src="@/assets/images/11.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
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
          <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 二级路由区域 -->
        <router-view></router-view>
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
          this.$message.success("退出登录成功!");
          logOut().then(() => {
            //删除token，回到登录页
            removeToken();
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
      // 设置状态管理vuex里面的数据
      this.$store.commit("setUser", res.data);
      // this.user = res.data;
      // this.user.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
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