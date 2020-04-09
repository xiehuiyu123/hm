<template>
  <div class="model">
    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px">
      <div slot="title" class="title">用户注册</div>
      <!-- form表单 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="baseURL+'/uploads'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="test"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input clearable v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input clearable v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input clearable v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input clearable v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input clearable v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img @click="imgClick" class="img" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input clearable v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getCode" :disabled="timeCode != 20">
                <span v-if="timeCode !=20">{{timeCode}}秒后</span>
                <span v-else>获取用户验证码</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="submit">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPhoneCode, register } from "@/api/api.js";
// import func from "../../../vue-temp/vue-editor-bridge";
export default {
  name: "model",
  data() {
    return {
      timeCode: 20,
      baseURL: process.env.VUE_APP_URL,
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      form: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      imageUrl: "",
      dialogFormVisible: false,
      rules: {
        avatar: [
          { required: true, message: "头像要上传哦", targger: "change" }
        ],
        username: [{ required: true, message: "请输入昵称", targger: "blur" }],
        email: [
          // { required: true, message: "邮箱要填", targger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback("邮箱要填");
              }
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("格式不正确哦");
              }
            },
            targger: "change"
          }
        ],
        phone: [
          // { required: true, message: "请输入手机号码", targger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback("请输入手机号码");
              }
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("格式不正确哦");
              }
            },
            targger: "change"
          }
        ],
        password: [
          { required: true, message: "密码要填", targger: "blur" },
          { min: 6, max: 12, message: "长度6-12位", targger: "change" }
        ],
        code: [
          { required: true, message: "请输入图形验证码", targger: "blur" },
          { min: 4, max: 4, message: "请输入4位图形验证码", targger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", targger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", targger: "change" }
        ]
      }
    };
  },
  methods: {
    //获取短信验证
    getCode() {
      let flag = true;
      this.$refs.form.validateField(["phone", "code"], err => {
        if (err != "") {
          flag = false;
        }
      });
      if (flag === false) {
        return;
      } else {
        //调用接口
        getPhoneCode({ phone: this.form.phone, code: this.form.code }).then(
          res => {
            console.log(res);
            if (res.code) {
              this.$message.success(res.data.captcha + "");
              this.timeCode--;
              let time = setInterval(() => {
                this.timeCode--;
                if (this.timeCode <= 0) {
                  clearInterval(time);
                  this.timeCode = 20;
                }
              }, 1000);
            } else {
              this.$message(res.data.message);
            }
          }
        );
      }
    },
    //刷新图形验证码
    imgClick() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    test() {
      //主动触发验证，头像验证
      this.$refs.form.validateField("avatar");
    },
    //文件预览
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
    },
    //上传前判断
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //注册，全部验证
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          register(this.form).then(res => {
            console.log(res);
            this.$message.success("注册成功");
            this.dialogFormVisible = false;
          });
        } else {
          this.$message.error("白痴！");
        }
      });
    }
  },
  //清空表单
  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.$refs.form.resetFields();
        this.imageUrl = "";
      }
    }
  }
};
</script>

<style  lang="less" scoped>
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
  .submit {
    text-align: center;
  }
  .img {
    display: inline-block;
    height: 40px;
    border: 1px solid #ccc;
  }
}
</style>
<style  lang="less">
.model {
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>