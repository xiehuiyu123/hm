<template>
  <div class="addSubject">
    <el-dialog :visible.sync="dialogFormVisible" width="602px">
      <div slot="title" class="title">{{data == "新增" ? "新增学科" : "编辑学科"}}</div>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: {
    data: {
      type: String,
      default: "新增"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名", trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交新增按钮
    submit() {
      this.$refs.form.validate(val => {
        if (val) {
          if (this.data == "新增") {
            addSubject(this.form).then(() => {
              this.$message.success("新增成功");
              this.$parent.search(); //新增成功调用父子间的方法刷新数据
              this.dialogFormVisible = false; //关闭弹框
            });
          } else {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$parent.search(); //新增成功调用父子间的方法刷新数据
              this.dialogFormVisible = false; //关闭弹框
            });
          }
        } else {
          this.$message.warning("白痴！有必填项");
        }
      });
    },
    //取消按钮
    cancel() {
      this.dialogFormVisible = false;
    }
  },
  // 清空表单数据及提示
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.$refs.form.resetFields();
      }
    }
  }
};
</script>

<style lang="less">
.addSubject {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
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