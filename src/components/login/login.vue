<template>
  <el-row class="login">
    <el-col :xs="{span: 24}" :sm="{span: 18, offset: 3}" :md="{span: 12, offset: 6}">
      <p>后台管理系统</p>
      <div class="grid-content bg-purple-light">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名：">
            <el-input v-model="formLabelAlign.name" placeholder="用户名" type="text" data-name="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="formLabelAlign.pass" placeholder="密码" type="password" data-name="密码"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="18">
              <el-form-item label="验证码：">
                <el-input v-model="formLabelAlign.code" placeholder="验证码" type="text" data-name="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="getCode">获取验证码</el-button>
            </el-col>
            <el-col :sm="{span: 18, offset: 3}">
              <div class="base" style="text-align: center;cursor: pointer;width: 250px;height: 80px;margin: 0 auto;">
                <img :src="pngInfo" alt="" @click="getCode">
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" style="margin: 0 auto; display: block" @click="register">登录</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import _ from "lodash";

var codeURL = "http://wallet-api-test.launchain.org:50000/v1/captcha";
var registerURL = "http://wallet-api-test.launchain.org:50000/v1/mgt/session";
export default {
  name: "login",
  data() {
    return {
      labelPosition: "right",
      pngInfo: "",
      pngSize: {
        digits: 6,
        width: 240,
        height: 80
      },
      formLabelAlign: {
        name: "",
        pass: "",
        code: "",
        pngId: ""
      },
      loginInfo: ""
    };
  },
  mounted: function() {
    this.getCode();
  },
  methods: {
    getCode: function() {
      axios({
        method: "post",
        url: codeURL,
        data: this.pngSize
      }).then(res => {
        this.pngInfo = "data:image/png;base64," + res.data.png;
        this.formLabelAlign.pngId = res.data.captcha_id;
        console.log(this.formLabelAlign.pngId);
      });
    },
    register: function() {
      var num = 0;
      var str = "";
      var that = this;
      $("input[type$='text'],input[type$='password']").each(function(n) {
        if ($(this).val() == "") {
          that.$layer.alert(
            (str += "" + $(this).attr("data-name") + "不能为空！\r\n"),
            {
              shadeClose: false,
              title: "提示框"
            }
          );
          num++;
          return false;
        }
      });
      if (num > 0) {
        return false;
      } else {
        // var registerInfo = $.param(that.formLabelAlign)
        var registerInfo =
          "username=" +
          that.formLabelAlign.name +
          "&password=" +
          that.formLabelAlign.pass +
          "&captcha_id=" +
          that.formLabelAlign.pngId +
          "&captcha_number=" +
          that.formLabelAlign.code;
        axios({
          method: "post",
          url: registerURL,
          contentType: "application/x-www-form-urlencoded",
          data: registerInfo
        })
          .then(res => {
            that.loginInfo = res.data;
            localStorage.setItem("myLogin", JSON.stringify(res.data));
            that.$layer.alert("登陆成功！", {
              shadeClose: false,
              title: "提示框"
            });
            _.forEach(this.formLabelAlign, function(val, key) {
              val = "";
            });
            location.href = "/#/management";
            console.log(that.loginInfo);
            console.log(localStorage.myLogin);
          })
          .catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.log(typeof error.response.data);
              that.$layer.alert(error.response.data.code, {
                shadeClose: false,
                title: "提示框"
              });
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            // console.log(error.config);
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.login {
  color: black;
  padding: 40px 0;
  font-size: 20px;
}

.el-col {
  border-radius: 4px;

  p {
    text-align: center;
    margin-bottom: 50px;
  }
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 40px 40px 40px 0;
}

.a {
  margin: 0 auto;
}
</style>
