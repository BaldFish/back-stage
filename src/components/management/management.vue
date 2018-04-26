<template>
  <el-row style="height:1000px">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark" style="height:100%">
        <el-container>
          <el-header class="el-header">
            <el-dropdown trigger="click" class="">
              <el-button type="primary">用户名
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
            <el-menu default-active="2-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">系统管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">广告设置</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">文章管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">
                    <router-link to="/management/categoryList">分类管理列表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/management/articleList">文章管理列表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <router-link to="/management/">增加文章</router-link>
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
export default {
  name: "management",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="stylus">
  a{
  
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
