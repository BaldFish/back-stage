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
        <el-button type="primary" @click="addType">新增</el-button>
        <el-button @click="">删除</el-button>
      </el-col>
    </el-row>
    <el-dialog title="修改类型信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.category_name"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="form.type_name" placeholder="请选择文章类型" style="width: 200px;" @change="changeValue">
            <el-option v-for="(item,index) of selectData" :label=item.Name :value=item.Name :key="item.Code" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editHandleSave" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增类型信息" :visible.sync="addFormVisible">
      <el-form ref="form_add" :model="form_add" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form_add.category_name"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="form_add.type_name" placeholder="请选择文章类型" style="width: 200px;" @change="addChangeValue">
            <el-option v-for="(item,index) of selectData" :label=item.Name :value=item.Name :key="item.Code" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addHandleSave" :loading="editLoading">确定</el-button>
          <el-button @click="addFormVisible = false">取消</el-button>
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
        selectData:[],
        options: [],
        places: [],
        dialogFormVisible: false,
        addFormVisible:false,
        editLoading: false,
        form: {
          category_name:"",
          category_code:"",
          type_name:"",
          type_code:"",
          catg_status:"",
        },
        form_add: {
          category_name:"",
          type_name:"",
          type_code:"",
        },
        table_index: 999
      };
    },
    created() {
      //获取分类列表
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
      //获取新增、编辑弹出框下拉列表
      axios({
        method: "GET",
        url:
          "http://wallet-api-test.launchain.org:50000/v1/resource/search?type=essay_type"
      })
        .then(res => {
          this.selectData = res.data.info;
        })
        .catch(error => {
          this.selectData = [];
        });
    },
    methods: {
      addType(){
        this.form_add= {
          category_name: "",
            type_name: "",
            type_code: ""
        };
        this.addFormVisible = true;
      },
      addHandleSave(){
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel"
        })
          .then(() => {
            this.editLoading = true;
            var token=JSON.parse(sessionStorage.myLogin).token
            var data="category_name="+this.form_add.category_name+"&type_name="+this.form_add.type_name+"&type_code="+this.form_add.type_code
            console.log(data)
            axios({
              method: "POST",
              url:
              "http://wallet-api-test.launchain.org:50000/v1/essay-catg",
              data:data,
              headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "X-Access-Token":token
              }
            }).then((res)=>{
              console.log(res)
              // this.tableData.splice(this.table_index, 1, this.form);
              // this.editLoading = false;
              // this.addFormVisible = false;
              // this.$message({
              //   message: "操作成功！",
              //   type: "success"
              // });
            }).catch(err=>{
              console.log(err)
            });
          })
          .catch(() => {});
      },
      addChangeValue(){
        var that=this;
        var addSelect=_.find(this.selectData,function (o) {
          return o.Name===that.form_add.type_name
        });
        this.form_add.type_code=addSelect.Code;
        console.log(this.form_add)
      },
      handleDelete(index, row) {
        axios({}).then().catch()
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
      changeValue(){
        var that=this;
        var editSelect=_.find(this.selectData,function (o) {
          return o.Name===that.form.type_name
        });
        this.form.type_code=editSelect.Code;
      },
      editHandleSave() {
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel"
        })
          .then(() => {
            this.editLoading = true;
            var id=this.form._id;
            var token=JSON.parse(sessionStorage.myLogin).token
            var data={}
            data.category_name=this.form.category_name
            data.category_code=this.form.category_code
            data.type_name=this.form.type_name
            data.type_code=this.form.type_code
            data.catg_status=this.form.catg_status
            axios({
              method: "PUT",
              url:
                "http://wallet-api-test.launchain.org:50000/v1/essay-catg/"+id,
              data:data,
              headers:{
                "Content-Type":"application/json",
                "X-Access-Token":token
              }
            }).then((res)=>{
              this.tableData.splice(this.table_index, 1, this.form);
              this.editLoading = false;
              this.dialogFormVisible = false;
              this.$message({
                message: "操作成功！",
                type: "success"
              });
            });
          })
          .catch(() => {});
      },
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
