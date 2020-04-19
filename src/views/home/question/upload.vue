<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :action="baseURL+'/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="type == 'video'">
        <video v-if="value" :src="baseURL+'/'+value" class="avatar" controls></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <img v-if="value" :src="baseURL+'/'+value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["value", "type"],
  data() {
    return {
      baseURL: process.env.VUE_APP_URL
    };
  },
  methods: {
    //上传成功后
    handleAvatarSuccess(res) {
      //将上传成功后返回的数据，发射出去
      this.$emit("input", res.data.url);
    },
    //上传前
    beforeAvatarUpload(file) {
      // if (this.type == "video") {
      //   return console.log("video");
      // }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style lang="less">
.upload {
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>