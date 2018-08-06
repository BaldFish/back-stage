<template>
  <div>
    <a href="/#/systemManagement/1-1">
      <h3>返回列表</h3><br>
    </a>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="ruleForm.title" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="显示类型：" prop="show_type_code">
        <el-select v-model="ruleForm.show_type_code" placeholder="请选择类型" style="width: 200px;" @change="changeValue">
          <el-option v-for="(item,index) of article_type" :label=item.Name :value=item.Code :key="item.Code" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址:" prop="picture_url">
        <el-input v-model="ruleForm.picture_url" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="链接地址:" prop="link_url">
        <el-input v-model="ruleForm.link_url" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="排序:" prop="rank">
        <el-input v-model="ruleForm.rank" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="bc_status">
        <el-radio-group v-model="ruleForm.bc_status">
          <el-radio :label=1>有效</el-radio>
          <el-radio :label=2>无效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="!$route.query.id" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="primary" v-if="$route.query.id" @click="modifyForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <h3>显示图片</h3><br>
      <el-form-item label="上传图片:">
        <el-upload action="http://wallet-api-test.launchain.org:50000/v1/file" list-type="picture-card" :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove" name="uploadfile">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <img :src="select_imgUrl" alt="" style="height:145px;width:200px;display: block;margin-bottom: 10px;border: 1px solid #c0ccda">
              <input style="width: 130px;" type="text" id="contents" class="copy_btn" v-model=select_imgUrl />
              <el-button style="width: 60px; padding: 10px 5px" type="primary" round @click="jsCopy">复制</el-button>
            </div>
          </el-col>
          <el-col :span="18">
            <ul>
              <li style="display: inline-block;height: 145px;width: 200px" v-for="(item,index) of img_list" :key="index">
                <img :src="'http://'+item.furl" alt="" style="display: inline-block;height: 145px;width: 200px;cursor:pointer "
                     @click="getImgUrl($event)">
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import UE from "../../components/ue/ue.vue";
  import axios from "axios";
  import formatDate from "@/common/js/formatDate.js";
  import _ from "lodash";
  import {baseURL} from '@/common/js/public.js';
  const querystring = require('querystring');

  export default {
    components: { UE },
    data() {
      return {
        token:"",
        headers:{
          'Content-Type':'multipart/form-data',
          'X-Access-Token':this.token
        },
        select_imgUrl: "",
        img_list: [],
        article_type: [],
        ruleForm: {
          show_type_value: "",
          show_type_code: "",
          title: "",
          picture_url: "",
          rank:"",//排序
          link_url:"",//链接地址
          bc_status: 0,//状态
        },
        rules: {
          title: [
            { required: true, message: "请输入文章标题", trigger: "blur" },
            { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
          ],
          show_type_code: [{ required: true, message: "请选择类型", trigger: "change" }],
          picture_url: [
            { required: true, message: "请输入图片地址", trigger: "blur" },
          ],
          link_url: [
            { required: true, message: "请输入链接地址", trigger: "blur" },
          ],
          rank: [
            { required: true, message: "请输入排序值", trigger: "blur" },
          ],
          bc_status: [
            { required: true, message: "请选择状态", trigger: "change" }
          ],
        },
        dialogImageUrl: "",
        dialogVisible: false,
      };
    },
    methods: {
      changeValue(){
        var that=this;
        var select_article_type=_.find(this.article_type,function (o) {
          return o.Code===that.ruleForm.show_type_code
        });
        this.ruleForm.show_type_value=select_article_type.Name;
      },
      getImgUrl() {
        this.select_imgUrl = event.target.src;
      },
      //新增表格
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var data = {
              show_type_value: this.ruleForm.show_type_value,
              show_type_code: this.ruleForm.show_type_code,
              title: this.ruleForm.title,
              picture_url: this.ruleForm.picture_url,
              link_url: this.ruleForm.link_url,
              rank: this.ruleForm.rank,
              bc_status: this.ruleForm.bc_status,
            };

            axios({
              method:'post',
              url: `${baseURL}/v1/broadcast`,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Access-Token':this.token,
              },
              data: querystring.stringify(data),
            }).then(res=>{
              this.$layer.alert("新增成功！", {
                shadeClose: false,
                title: "提示框"
              });
            }).catch(err=>{
              console.log(err)
            })
          } else {
            this.$layer.alert("新增失败！", {
              shadeClose: false,
              title: "提示框"
            });
            return false;
          }
        });
      },
      //修改表格
      modifyForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var data = {
              show_type_value: this.ruleForm.show_type_value,
              show_type_code: this.ruleForm.show_type_code,
              title: this.ruleForm.title,
              picture_url: this.ruleForm.picture_url,
              link_url: this.ruleForm.link_url,
              rank: Number(this.ruleForm.rank),
              bc_status: this.ruleForm.bc_status,
            };

            axios({
              method:'PUT',
              url: `${baseURL}/v1/broadcast/${this.$route.query.id}`,
              headers:{
                'Content-Type': 'application/json',
                'X-Access-Token':this.token,
              },
              data: data,
            }).then(res=>{
              this.$layer.alert("修改成功！", {
                shadeClose: false,
                title: "提示框"
              });
            }).catch(err=>{
              console.log(err)
            })
          } else {
            this.$layer.alert("修改失败！", {
              shadeClose: false,
              title: "提示框"
            });
            return false;
          }
        });
      },
      //清除表单数据
      resetForm() {
        this.ruleForm.show_type_value="";
        this.ruleForm.show_type_code="";
        this.ruleForm.title="";
        this.ruleForm.picture_url="";
        this.ruleForm.link_url="";
        this.ruleForm.rank="";
        this.ruleForm.bc_status=0;

        if (this.$route.query.id){
          this.$route.query.id = !this.$route.query.id
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      jsCopy() {
        var e = document.getElementById("contents"); //对象是contents
        e.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
      }
    },
    mounted() {
      //编辑页面--赋值
      if (this.$route.query.id){
        axios({
          method: "GET",
          url: `${baseURL}/v1/broadcast/${this.$route.query.id}`
        }).then(res => {
          this.ruleForm = res.data
        }).catch(error => {
          console.log(error)
        });
      }

      this.token=JSON.parse(sessionStorage.myLogin).token;
      //获取下拉列表类型
      axios({
        method: "GET",
        url:
          `${baseURL}/v1/resource/search?type=show_type`
      })
        .then(res => {
          this.article_type = res.data.info;
        })
        .catch(error => {
          this.article_type = [];
        });
      //获取服务器图片列表
      axios({
        method: "GET",
        url: `${baseURL}/v1/file/search?type=1`
      })
        .then(res => {
          this.img_list = res.data.info;
        })
        .catch(error => {
          this.img_list = [];
        });
    }
  };
</script>

<style lang="stylus">
  input[type=file] {
    display: none;
  }
  .copy_btn{
    display: inline-block;
    outline:none
  }
</style>
