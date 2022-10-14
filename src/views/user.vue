<template>
  <div class="user">
    <el-dialog
      :title="dialogName === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <UserForm
        :formInfo="opertateFormLabel"
        :userInfo="userInfo"
        :inline="true"
      ></UserForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="submit()">确定</el-button>
      </div>
    </el-dialog>
    <div class="userHeader">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <UserForm :formInfo="formLabel" :userInfo="searchFrom" :inline="true">
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </UserForm>
    </div>
    <UserTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></UserTable>
  </div>
</template>
<script>
import UserForm from "../components/form.vue";
import UserTable from "../components/table.vue";
import { getUser } from "../api/data.js";
export default {
  data() {
    return {
      dialogName: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      userInfo: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  components: {
    UserForm,
    UserTable,
  },
  methods: {
    addUser() {
      this.dialogName = "add";
      this.isShow = true;
      this.userInfo = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
      this.getList();
    },
    submit() {
      if (this.dialogName === "update") {
        this.$axios.post("/user/edit", this.userInfo).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$axios.post("/user/add", this.userInfo).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        // console.log(res, "res");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editUser(row) {
      this.dialogName = "edit";
      this.isShow = true;
      this.userInfo = row;
      // console.log(row)
      this.getList();
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row.id;
          this.$axios.post("/user/del", {
            params: { id },
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        });
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scope>
.userHeader {
  display: flex;
  justify-content: space-between;
  height: 40px;
}
</style>