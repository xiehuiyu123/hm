<template>
  <div class="subject">
    <el-card>
      <el-form :model="form" label-width="80px" :inline="true">
        <el-form-item label="学科编号">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="centent">
      <el-table :data="list" style="width: 100%" v-if="list">
        <el-table-column label="序号" width="80px">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="300px"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="{red: scope.row.scope != 1}">{{scope.row.scope == 1 ? "启用" : "禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary">编辑</el-link>
            <el-link class="link" v-if="scope.row.scope" :underline="false" type="primary">启用</el-link>
            <el-link class="link" v-else :underline="false" type="primary">禁用</el-link>
            <el-link :underline="false" type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          background
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
export default {
  data() {
    return {
      list: [],
      form: {
        c: "",
        name: "",
        username: "",
        status: ""
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    getSubjectData().then(res => {
      // console.log(res);
      this.list = res.data.items;
    });
  }
};
</script>

<style lang="less">
.subject {
  .centent {
    margin-top: 20px;
    .link {
      margin: 0 15px;
    }
    span.red {
      color: #ff3d3d;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>