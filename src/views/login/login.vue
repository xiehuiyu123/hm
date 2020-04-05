<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/images/11.png" alt />
        <span class="title_name1">黑马面面</span>
        <span class="title_cen">|</span>
        <span class="title_name2">用户登录</span>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/images/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>

<style lang="less" >
.login {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    .title {
      padding: 47px 41px 86px 43px;
      .title_name1 {
        margin: 0 8px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .title_cen {
        font-size: 24px;
        color: #ccc;
      }
      .title_name2 {
        margin: 0 8px;
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
  }
}
</style>