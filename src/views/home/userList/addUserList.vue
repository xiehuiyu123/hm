<template>
  <div class="addUserList">
    <el-dialog :visible.sync="dialogFormVisible" width="602px">
      <div slot="title" class="title">{{data == "新增" ? "新增用户" : "编辑用户"}}</div>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="(value,key) in $store.state.roleObj"
              :key="key"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
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
import { addUser, editUser } from "@/api/user.js";
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
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("邮箱格式不正确");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("手机号码格式不正确");
              }
            },
            trigger: "change"
          }
        ],
        role_id: [{ required: true, message: "角色必选", trigger: "change" }]
      }
    };
  },
  methods: {
    //提交新增按钮
    submit() {
      this.$refs.form.validate(val => {
        if (val) {
          if (this.data == "新增") {
            addUser(this.form).then(() => {
              this.$message.success("新增成功");
              this.$parent.search(); //新增成功调用父子间的方法刷新数据
              this.dialogFormVisible = false; //关闭弹框
            });
          } else {
            editUser(this.form).then(() => {
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
      if (val) {
        if (this.data == "新增") {
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
.addUserList {
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