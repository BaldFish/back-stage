<template>
  <section>
    <el-row>
      <h3>分类管理</h3>
      <el-col :span="24">
        <!--表格-->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="essay_category_num" label="编号" width="120">
          </el-table-column>
          <el-table-column prop="category_name" label="分类名称" width="200">
          </el-table-column>
          <el-table-column prop="type_name" label="文章类型" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col style="margin-top: 20px">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button @click="dialogFormVisible = false">删除</el-button>
      </el-col>
    </el-row>
    <el-dialog title="修改类型信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.essay_category_num"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.category_name"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-input v-model="form.type_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
  import axios from "axios";
  import formatDate from "@/common/js/formatDate.js";
  import _ from "lodash";
  const ERR_OK = "000";
  export default {
    data() {
      return {
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          essay_category_num: "",
          category_name: "",
          type_name: ""
        },
        currentPage: 4,
        table_index: 999
      };
    },
    created() {
      axios({
        method: "GET",
        url:
          "http://wallet-api-test.launchain.org:50000/v1/essay-catg?page=0&limit=10"
      })
        .then(res => {
          this.tableData = res.data.info;
          console.log(this.tableData)
        })
        .catch(error => {
          this.tableData = [];
        });
    },
    methods: {
      onSubmit() {
        this.$message("模拟数据，这个方法并不管用哦~");
      },
      handleDelete(index, row) {
        console.log(index)
        console.log(row)
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: "success"
        });
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
      },
      handleSave() {
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel"
        })
          .then(() => {
            this.editLoading = true;
            let date = this.form.date;
            console.log(date);
            if (typeof date === "object") {
              date = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              ].join("-");
              this.form.date = date;
            }
            //          this.tableData[this.table_index] = this.form;
            this.tableData.splice(this.table_index, 1, this.form);
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.editLoading = false;
            this.dialogFormVisible = false;
          })
          .catch(() => {});
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style scoped lang="stylus">
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
</style>
