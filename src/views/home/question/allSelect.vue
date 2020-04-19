<template>
  <div class="allSelect">
    <!-- 文本域 -->
    <el-input
      v-if="form.type == 3"
      type="textarea"
      v-model="form.short_answer"
      :rows="8"
      placeholder="请输入内容"
      @change="selectChange"
    ></el-input>
    <div v-else v-for="(item,index) in form.select_options" :key="index" class="item">
      <!-- 单选 -->
      <el-radio
        v-if="form.type==1"
        v-model="form.single_select_answer"
        :label="item.label"
        @change="selectChange"
      >{{item.label}}</el-radio>
      <!-- 多选 -->
      <el-checkbox
        v-else-if="form.type==2"
        v-model="form.multiple_select_answer"
        :label="item.label"
        @change="selectChange"
      >{{item.label}}</el-checkbox>
      <el-input v-model="item.text"></el-input>

      <!-- 图片上传，v-model绑定数据给子组件传值 -->
      <upload v-model="item.image"></upload>
    </div>
  </div>
</template>

<script>
import upload from "./upload.vue";

export default {
  props: ["form"],
  components: { upload },
  methods: {
    // 触发表单验证，子组件向父组件传值 $emit
    selectChange() {
      this.$emit("selectChange");
    }
  }
};
</script>

<style lang="less">
.allSelect {
  .el-checkbox:last-of-type {
    margin-right: 30px;
  }
  .item {
    display: flex;
    align-items: center;

    .el-input {
      margin-right: 30px;
    }
  }
}
</style>