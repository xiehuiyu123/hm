<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="model">
    <div slot="title" class="title">用户注册</div>
  </el-dialog>
</template>

<script>
export default {
  name: "model",
  data() {
    return {
      dialogFormVisible: true
    };
  }
};
</script>

<style  lang="less">
.model {
  .title {
    height: 53px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    line-height: 53px;
    color: rgba(254, 254, 254, 1);
    background-color: rgba(40, 145, 255, 1);
  }
  .el-dialog__header {
    padding: 0px;
  }
}
</style>