<template>
  <div class="mode">
    <el-dialog :visible.sync="dialogFormVisible" width="600px">
      <div slot="title" class="title">{{son=="新增" ? "新增企业":"编辑企业"}}</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btn">
        <el-button @click="resetForm()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBusiness, editBusiness } from "@/api/business.js";
export default {
  props: ["son"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "必填", trigger: "blur" }],
        name: [{ required: true, message: "必填", trigger: "blur" }],
        short_name: [{ required: true, message: "必填", trigger: "blur" }],
        intro: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 模态确认按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.son == "新增") {
            addBusiness(this.form).then(() => {
              this.$message.success("新增成功");
              this.$emit("refresh");
              this.dialogFormVisible = false;
            });
          } else {
            editBusiness(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.dialogFormVisible = false;
            });
          }
        }
      });
    },
    //取消按钮
    resetForm() {
      this.dialogFormVisible = false;
    }
  },
  // 清空表单数据及提示
  watch: {
    dialogFormVisible(val) {
      if (val) {
        if (this.son == "新增") {
          this.$nextTick(() => {
            this.$refs.form.resetFields();
          });
        }
      }
    }
  }
};
</script>

<style lang="less">
.mode {
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    line-height: 53px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
  }
  .btn {
    text-align: center;
  }
}
</style>