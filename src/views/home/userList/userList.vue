<template>
  <div class="userList">
    <el-card>
      <el-form :model="form" label-width="80px" :inline="true" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="(value,key) in $store.state.roleObj"
              :key="key"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remove">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="model">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="centent">
      <el-table :data="list" style="width: 100%" v-if="list" :border="true">
        <el-table-column label="序号" width="80px">
          <template
            slot-scope="scope"
          >{{(pagination.page - 1) * pagination.pageSize + scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注" width="300px"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="{red: scope.row.status != 1}">{{scope.row.status == 1 ? "启用" : "禁用"}}</span>
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
            >{{scope.row.status == 1 ? "禁用" : "启用"}}</el-link>
            <el-link :underline="false" type="primary" @click="removeID(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页按钮 -->
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增操作 -->
    <addUserList :data="mode" ref="addUserList" />
  </div>
</template>

<script>
import addUserList from "./addUserList.vue";

import { getToken } from "@/utils/token.js";
import { getUserList, setUser, removeUser } from "@/api/user.js";
export default {
  components: {
    addUserList
  },
  data() {
    return {
      mode: "新增",
      list: [],
      pagination: {
        page: 1, //当前页码
        pageSize: 2, //页容量
        total: 40 //总条数
      },
      form: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  methods: {
    //编辑操作
    edit(data) {
      this.mode = "编辑";
      this.$refs.addUserList.dialogFormVisible = true;
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(data));
    },
    //新增操作
    model() {
      this.mode = "新增";
      this.$refs.addUserList.dialogFormVisible = true;
      this.$refs.addUserList.form = {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      };
    },
    //删除操作
    removeID(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          removeUser({ id }).then(() => {
            this.$message.success("删除成功");
            this.search(); //删除操作后重新调用接口
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //设置状态
    status(id) {
      setUser({ id }).then(() => {
        this.$message.success("设置成功");
        this.search();
      });
    },
    //清除搜索选项,并搜索
    remove() {
      this.$refs.form.resetFields();
      this.search();
    },
    //搜索功能
    search() {
      this.pagination.page = 1;
      this.getData();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.search();
      //将当前页面改变为1
      // this.pagination.page = 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.page = val;
      this.getData();
    },
    //分页数据和列表数据
    getData() {
      let _page = {
        page: this.pagination.page,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserList(_page).then(res => {
        this.list = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    }
  },
  created() {
    //没有token就不调用接口
    if (!getToken()) {
      return this.$router.push("/");
    }
    this.getData();
  }
};
</script>

<style lang="less">
.userList {
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