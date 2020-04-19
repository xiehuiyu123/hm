<template>
  <div class="questionModel">
    <!-- 模态框 -->
    <el-dialog :visible.sync="dialogFormVisible" fullscreen>
      <!-- 标题 -->
      <div slot="title" class="title">{{type == "新增"?"新增题库测试":"编辑题库测试"}}</div>

      <!-- form表单 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="left">
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject">
            <el-option
              v-for="(item) in subjectList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
              v-show="item.status==1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="form.step">
            <el-option v-for="(value,key) in stepObj" :key="key" :value="+key" :label="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="form.enterprise">
            <el-option
              v-for="(item) in businessList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
              v-show="item.status==1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            clearable
            filterable
            :options="options"
            v-model="form.city"
            :props="{value:'label'}"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio v-for="(value,key) in typeObj" :key="key" :label="+key">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio v-for="(value,key) in difficultyObj" :key="key" :label="+key">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 水平线 -->
        <el-divider></el-divider>
        <!-- 富文本 -->
        <el-form-item class="futext" label="试题标题" prop="title">
          <quillEditor
            v-model="form.title"
            :options="{placeholder:'请输入内容'}"
            @change="editorChange('title')"
          ></quillEditor>
        </el-form-item>
        <el-form-item :label="typeObj[form.type]" :prop="answerObj[form.type]">
          <!-- 单选多选组件抽离 ，selectChange自定义表单验证，子组件$emit发射出来的-->
          <allSelect :form="form" @selectChange="selectChange"></allSelect>
        </el-form-item>
        <!-- 水平线 -->
        <el-divider></el-divider>
        <el-form-item label="解析视频">
          <upload v-model="form.video" type="video"></upload>
        </el-form-item>
        <!-- 水平线 -->
        <el-divider></el-divider>
        <!-- 富文本 -->
        <el-form-item class="futext" label="答案解析" prop="answer_analyze">
          <quillEditor
            v-model="form.answer_analyze"
            :options="{placeholder:'请输入内容'}"
            @change="editorChange('answer_analyze')"
          ></quillEditor>
        </el-form-item>
        <!-- 水平线 -->
        <el-divider></el-divider>
        <el-form-item class="futext" label="试题备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import allSelect from "./allSelect.vue";
import upload from "./upload.vue";

import { addQuestion, editQuestion } from "@/api/question.js";

//省市区地名
import { regionData } from "element-china-area-data";

// 富文本
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  components: { quillEditor, allSelect, upload },
  props: [
    "type", //判断是新增还是编辑
    "subjectList",
    "stepObj",
    "businessList",
    "typeObj",
    "difficultyObj"
  ],
  data() {
    return {
      options: regionData,
      dialogFormVisible: false,
      answerObj: {
        1: "single_select_answer",
        2: "multiple_select_answer",
        3: "short_answer"
      },
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: 1,
        difficulty: 1,
        title: "",
        single_select_answer: "", //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        // 题目选项
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        title: [{ required: true, message: "请选输入标题", trigger: "change" }],
        single_select_answer: [
          { required: true, message: "请输入单选答案", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "请输入多选答案", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "请输入简答答案", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "请选输入答案解析", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请选输入试题备注", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //抽离组件的单多选表单验证
    selectChange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    //富文本验证,传递不同的值，验证不同的富文本
    editorChange(data) {
      this.$refs.form.validateField(data);
    },
    //城市选中文本
    handleChange() {
      console.log(this.form.city);
    },
    // 提交按钮
    submitForm() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.type == "新增") {
            addQuestion(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          } else {
            // 接口参数类型 ，转换
            let _data = JSON.parse(JSON.stringify(this.form));
            _data.city = _data.city.join(",");
            editQuestion(_data).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }
        } else {
          this.$message.warning("白痴！");
        }
      });
    },
    //重置按钮
    resetForm() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.form = {
          subject: "",
          step: "",
          enterprise: "",
          city: [],
          type: 1,
          difficulty: 1,
          title: "",
          single_select_answer: "", //单选答案
          multiple_select_answer: [], //多选答案
          short_answer: "",
          video: "",
          answer_analyze: "",
          remark: "",
          // 题目选项
          select_options: [
            {
              label: "A",
              text: "狗不理",
              image: ""
            },
            {
              label: "B",
              text: "猫不理",
              image: ""
            },
            {
              label: "C",
              text: "麻花",
              image: ""
            },
            {
              label: "D",
              text: "炸酱面",
              image: ""
            }
          ]
        };
        this.$refs.form.resetFields();
        this.selectChange();
      }
    }
  }
};
</script>

<style lang="less">
.questionModel {
  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  .title {
    height: 54px;
    line-height: 54px;
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

  .dialog-footer {
    text-align: center;
  }

  .el-form {
    max-width: 832px;
    margin: 0 auto;
  }

  .el-divider {
    background-color: #aaa;
  }
  .futext {
    .el-form-item__content {
      margin-left: 0 !important;
      margin-top: 50px;

      .ql-video {
        display: none;
      }
    }
  }
}
</style>