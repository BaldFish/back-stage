<template>
  <section>
    <el-row>
      <h3>分类管理</h3>
      <el-col :span="24">
        <!--表格-->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="Num" label="编号" width="120">
          </el-table-column>
          <el-table-column prop="Name" label="分类名称" width="200">
          </el-table-column>
          <el-table-column prop="TypeName" label="文章类型" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="block">-->
          <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">-->
          <!--</el-pagination>-->
        <!--</div>-->
      </el-col>
      <el-col style="margin-top: 20px">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button @click="dialogFormVisible = false">删除</el-button>
      </el-col>
    </el-row>
    <el-dialog title="修改类型信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.Num"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-input v-model="form.TypeName"></el-input>
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
          Num: "",
          Name: "",
          TypeName: ""
        },
        currentPage: 4,
        table_index: 999
      };
    },
    created() {
      axios({
        method: "GET",
        url:
          "http://wallet-api-test.launchain.org:50000/v1/resource/search?type=essay_type"
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
