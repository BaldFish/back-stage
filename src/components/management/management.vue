<template>
  <el-row style="height:1000px">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark" style="height:100%">
        <el-container>
          <el-header class="el-header">
            <el-dropdown trigger="click" class="">
              <el-button type="primary">{{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
        </el-container>
        <el-container>
          <el-aside width="200px" class="">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="2-3" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                     unique-opened>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">系统管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                    <router-link to="/systemManagement/1-1">广告设置</router-link>
                  </el-menu-item>
                 <!-- <el-menu-item index="1-2">
                    <router-link to="/systemManagement/1-2">新增轮播</router-link>
                  </el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">文章管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">
                    <router-link to="/management/2-1">分类管理列表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/management/2-2">文章管理列表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <router-link to="/management/2-3">增加文章</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main class="">
            <router-view></router-view>
          </el-main>
        </el-container>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';

  export default {
    name: "management",
    data() {
      return {
        isCollapse: false,
        userName: "用户名",
      };
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        var user_id = JSON.parse(sessionStorage.getItem("myLogin")).user_id;
        var token = JSON.parse(sessionStorage.myLogin).token;
        axios({
          method: "GET",
          url: `${baseURL}/v1/mgt/user/${user_id}`,
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token
          }
        }).then((res) => {
          this.userName = res.data.user_name
        }).catch((err) => {
          console.log(err)
        })
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped lang="stylus">
  a {
    color #303133
  }

  a.router-link-active {
    color #409EFF
    text-decoration: none;
  }

  .el-header {
    text-align: right;
  }

  .el-dropdown {
    vertical-align: top;
    margin-top: 10px;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
