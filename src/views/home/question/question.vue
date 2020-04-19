<template>
  <div class="question">
    <!-- 头部搜索模块 -->
    <el-card>
      <el-form :model="form" ref="form" label-width="60px">
        <!-- 删栏第一行 -->
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择学科">
                <el-option
                  v-for="(item) in subjectList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step" placeholder="请选择阶段">
                <el-option v-for="(value,key) in stepObj" :key="key" :value="+key" :label="value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="form.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="(item) in businessList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option v-for="(value,key) in typeObj" :key="key" :value="+key" :label="value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 删栏第二行 -->
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,key) in difficultyObj"
                  :key="key"
                  :value="+key"
                  :label="value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input class="input" v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option :value="0" label="禁用"></el-option>
                <el-option :value="1" label="启用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 删栏第三行 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="add">+新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 列表卡片 -->
    <el-card class="content">
      <!-- 数据列表 -->
      <el-table :data="questionList" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">{{(form.page-1)*form.limit+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目" width="300px">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status == 0? "禁用":"启用"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="info"
              @click="status(scope.row.id)"
            >{{scope.row.status == 1? "禁用":"启用"}}</el-button>
            <el-button size="mini" type="danger" @click="removeQuestion(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页按钮 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
        background
      ></el-pagination>
    </el-card>

    <!-- 模态框 -->
    <questionModel
      :subjectList="subjectList"
      :stepObj="stepObj"
      :businessList="businessList"
      ref="model"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
      :type="type"
    />
  </div>
</template>

<script>
import questionModel from "@/views/home/question/questionModel.vue";

import { getSubjectData } from "@/api/subject.js";
import { getBusinessList } from "@/api/business.js";
import { getQuestion, setStatus, removeQuestion } from "@/api/question.js";

export default {
  components: {
    questionModel
  },
  data() {
    return {
      type: "新增",
      form: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1, //页码 默认为1
        limit: 10, //	页尺寸 默认为10
        total: 40
      },
      subjectList: [],
      businessList: [],
      questionList: [],
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }
    };
  },
  methods: {
    //删除
    removeQuestion(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeQuestion({ id }).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //新增
    add() {
      this.type = "新增";
      this.$refs.model.dialogFormVisible = true;
    },
    //编辑
    edit(row) {
      this.type = "编辑";
      this.$refs.model.dialogFormVisible = true;
      this.$refs.model.form = JSON.parse(JSON.stringify(row));
    },
    //设置状态
    status(id) {
      setStatus({ id }).then(() => {
        this.$message.success("状态改变成功");
        this.search();
      });
    },
    //清除按钮
    clear() {
      this.$refs.form.resetFields();
      this.search();
    },
    //分页按钮
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.form.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.form.page = val;
      this.getQuestion();
    },
    //搜索按钮
    search() {
      this.form.page = 1;
      this.getQuestion();
    },
    //获取题目列表数据
    getQuestion() {
      getQuestion(this.form).then(res => {
        this.form.total = res.data.pagination.total;
        this.questionList = res.data.items;
        // 接口参数类型不正确，要转换
        this.questionList.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
      });
    }
  },
  created() {
    getSubjectData({ limit: 1000 }).then(res => {
      // console.log(res);
      this.subjectList = res.data.items;
    });
    getBusinessList({ limit: 1000 }).then(res => {
      // console.log(res);
      this.businessList = res.data.items;
    });
    //获取题目列表数据
    this.getQuestion();
  }
};
</script>

<style lang="less">
.question {
  .input {
    max-width: 217px;
  }
  .content {
    margin-top: 20px;
  }
  .red {
    color: red;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>