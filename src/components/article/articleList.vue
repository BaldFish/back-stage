<template>
  <div>
    <div>
      <h3>文章管理</h3>
      <span>分类：</span>
      <el-select v-model="select_value" clearable placeholder="请选择" @change="changeValue">
        <el-option v-for="item in selectData" :key="item.category_code" :label="item.category_name" :value="item.category_code">
        </el-option>
      </el-select>
      <span>名称：</span>
      <el-select v-model="value9" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="toggleSelection()">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="编号" width="180" style="text-align: center">
        <template slot-scope="scope">
          <span>{{ scope.row.essay_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章类型" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.show_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align:center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </div>
    <div style="margin-top: 20px">
      <a href="/#/management/2-3">
        <el-button type="primary">新增</el-button>
      </a>
      <el-button @click="handleDeletes">删除</el-button>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import formatDate from "@/common/js/formatDate.js";
  import _ from "lodash";
  import {baseURL} from '@/common/js/public.js';
  export default {
    name: "",
    data() {
      return {
        tableData: [],
        selectData: [],
        select_value: "",
        multipleSelection: [],
        multipleDelete: [],
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming"
        ],
        currentPage: 1,
        total: 20,
        page: 0,
        limit: 10
      };
    },
    mounted() {
      this.list = this.states.map(item => {
        return {value: item, label: item};
      });
      //获取下拉列表文章类型
      axios({
        method: "GET",
        url:`${baseURL}/v1/essay-catg/all`
      })
        .then(res => {
          this.selectData = res.data;
        })
        .catch(error => {
          this.selectData = [];
        });
      //获取文章列表
      this.getArticleList()
    },
    methods: {
      handleSizeChange(val) {
        this.limit=val
        this.getArticleList()
      },
      handleCurrentChange(val) {
        this.page=val-1
        this.getArticleList()
      },
      getArticleList() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/essay?page=${this.page}&limit=${this.limit}`
        })
          .then(res => {
            this.tableData = res.data.info;
            this.total = res.data.count
          })
          .catch(error => {
            this.tableData = [];
          });
      },
      changeValue() {
        console.log(this.select_value)
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        var token = JSON.parse(sessionStorage.myLogin).token;
        axios({
          method: "DELETE",
          url: `${baseURL}/v1/essay/${row._id}`,
          headers: {
            "X-Access-Token": token
          }
        }).then((res) => {
          this.tableData.splice(index, 1);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleDeletes() {
        var multipleDelete = _.map(this.multipleSelection, function (item) {
          return item._id
        });
        if (multipleDelete.length === 0) {
          return
        }
        var multipleData = JSON.stringify({ids: multipleDelete});
        var token = JSON.parse(sessionStorage.myLogin).token
        axios({
          method: "POST",
          url: `${baseURL}/v1/essay/delete-batch`,
          data: multipleData,
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          this.getArticleList()
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      remoteMethod(query) {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
</style>
