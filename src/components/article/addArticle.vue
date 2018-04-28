<template>
  <div>
    <a href="/#/management/2-2/">
      <h3>返回列表</h3>
    </a>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
      <el-form-item label="类型：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择文章类型" style="width: 200px;">
          <el-option label="新闻" value="xinwen"></el-option>
          <el-option label="资讯" value="zixun"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="显示时间：" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="图片地址:">
        <el-input v-model="ruleForm.address" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="有效"></el-radio>
          <el-radio label="无效"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容：" prop="desc">
        <div class="components-container">
          <div class="editor-container">
            <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
          </div>
        </div>
        <!--<el-input type="textarea" v-model="ruleForm.desc" style="width: 100%;"></el-input>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-form-item label="上传图片:">
        
        <el-upload action="http://wallet-api-test.launchain.org:50000/v1/file" list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :headers="bb" name="uploadfile">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <img :src="a" alt="选择的图片" style="height:145px;width:200px;display: block;margin-bottom: 10px" >
              <input style="width: 130px;" type="text"  :value="a" id="contents"/>
              <el-button style="width: 60px; padding: 10px 5px" type="primary" round @click="jsCopy">复制</el-button>
            </div>
          </el-col>
          <el-col :span="18">
            <ul>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
              <li style="display: inline-block;height: 145px;width: 200px">123123</li>
            </ul>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <form>
      <input type="file" name="uploadfile">
      <button @click="ccc">3453454</button>
    </form>
    
  </div>
</template>

<script>
import UE from "../../components/ue/ue.vue";
import axios from "axios";
import _ from "lodash";
export default {
  components: { UE },
  data() {
    return {
      bb:{
        "X-Access-Token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjU1MDk0NTIsInVzZXJfaWQiOiJPYmplY3RJZEhleChcIjVhYzlkZTBjNWRiZmMzMDAwMWQ1N2YyNFwiKSIsImRldmljZV9pZCI6IjY0ZmY4Zjg0LTRhYmYtMTFlOC05ZDEzLTAyNDJhYzExMDAwMyJ9.MUKh_h6XlaBcxoFv6JhsHwb4DV42OdkSFmyeaQXLy3I",
        'Content-Type':'multipart/form-data'
      },
      a: "http://cn.cdblockchain.io/static/img/2.7b2154d.jpg",
      ruleForm: {
        region: "",
        name: "",
        date: "",
        address: "",
        resource: "",
        delivery: false,
        desc: ""
      },
      rules: {
        region: [{ required: true, message: "请选择类型", trigger: "change" }],
        name: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    ccc(){
      axios({
        method: "post",
        url:"http://wallet-api-test.launchain.org:50000/v1/file",
        contentType: "multipart/form-data",
        headers:{
          "X-Access-Token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjU1MTU0NTIsInVzZXJfaWQiOiJPYmplY3RJZEhleChcIjVhYzlkZTBjNWRiZmMzMDAwMWQ1N2YyNFwiKSIsImRldmljZV9pZCI6IjVjZDA1NzZmLTRhY2QtMTFlOC05ZDEzLTAyNDJhYzExMDAwMyJ9.N3tjeaQMs-hcpaAQiyvYKlCZxBbSeMi1nRrsVld9l30",
        },
      }).then(res=>{
        console.log(res)
      })
    },
    submitForm(formName) {
      this.getUEContent();
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      this.ruleForm.desc = content;
      // this.$notify({
      //   title: "获取成功，可在控制台查看！",
      //   message: content,
      //   type: "success"
      // });
      console.log(this.ruleForm.desc);
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
  mounted(){
    // axios({
    //   method: "GET",
    //   url: "http://wallet-api-test.launchain.org:50000/v1/broadcast/search?type=show_type",
    //   headers:{
    //
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
  },
};
</script>

<style lang="stylus">
/*input[type=file] {
  display: none;
}*/
</style>
