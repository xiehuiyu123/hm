<template>
  <div class="business">
    <el-card>
      <el-form :model="form" ref="form" :inline="true" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+ 新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 企业列表 -->
    <el-card class="content">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="序号" width="120px">
          <template slot-scope="scope">{{(pagination.page-1) *pagination.pageSize + scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="120px"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status == 0}">{{scope.row.status == 1 ? "启用" : "禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="edit(scope.row)">编辑</el-link>
            <el-link
              class="link"
              :underline="false"
              type="primary"
              @click="status(scope.row.id)"
            >{{scope.row.status == 0 ? "启用" : "禁用"}}</el-link>
            <el-link :underline="false" type="danger" @click="remove(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <el-pagination
        class="page"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-card>
    <!-- 模态框 -->
    <mode ref="mode" :son="zhuangtai" @refresh="search" />
  </div>
</template>

<script>
import mode from "./mode.vue";
import { getBusinessList, setStatus, removeBusiness } from "@/api/business.js";
export default {
  components: {
    mode
  },
  data() {
    return {
      zhuangtai: "新增",
      list: [],
      pagination: {
        total: 10,
        page: 1,
        pageSize: 2
      },
      form: {
        eid: "",
        name: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    //编辑按钮
    edit(row) {
      this.zhuangtai = "编辑";
      this.$refs.mode.form = JSON.parse(JSON.stringify(row));
      this.$refs.mode.dialogFormVisible = true;
    },
    //新增按钮
    add() {
      this.zhuangtai = "新增";
      this.$refs.mode.dialogFormVisible = true;
      this.$refs.mode.form = {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
    },
    //分页按钮
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.search(); //当前页面必须变成1，在这个方法里定义了
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getData();
    },
    //删除企业
    remove(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          removeBusiness({ id }).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //改变状态
    status(id) {
      setStatus({ id }).then(() => {
        this.$message.success("状态改变成功");
        this.getData(); //改变成功刷新数据
      });
    },
    //清除搜索并重新搜索所有
    clear() {
      this.$refs.form.resetFields();
      this.search();
    },
    //搜索企业列表
    search() {
      // 改变页容量时将页码默认改为1，不然当前页无数据时请求两次体验不好
      this.pagination.page = 1;
      this.getData();
    },
    getData() {
      let _data = {
        page: this.pagination.page,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessList(_data).then(res => {
        //设置分页数据
        this.pagination.total = res.data.pagination.total;
        this.list = res.data.items;
      });
    }
  },
  //页面刷新加载数据
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.business {
  .content {
    .red {
      color: red;
    }
    margin-top: 30px;
    .link {
      margin: 0 10px;
    }
    .page {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>