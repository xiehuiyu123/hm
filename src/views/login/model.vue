<template>
  <div class="model">
    <el-dialog :visible.sync="dialogFormVisible" :show-close="false">
      <div slot="title" class="title">用户注册</div>
      <el-form :model="form">
        <el-form-item label="头像">
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="baseURL+'/uploads'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "model",
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
      form: {
        avatar: ""
      },
      imageUrl: "",
      dialogFormVisible: true
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
    },
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