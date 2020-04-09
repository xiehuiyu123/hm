<template>
  <el-container class="home">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="@/assets/images/11.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userImg" alt />
        <span>{{user.username}}，你好</span>
        <el-button type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo } from "@/api/home.js";
export default {
  data() {
    return {
      user: "",
      userImg: ""
    };
  },
  created() {
    getInfo().then(res => {
      this.user = res.data;
      this.userImg = process.env.VUE_APP_URL + "/" + res.data.avatar;
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
  }
}
</style>