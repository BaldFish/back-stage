<template>
  <div>
    <a href="/#/management/2-2/">
      <h3>返回列表</h3>
    </a>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
    </el-form>
  </div>
</template>

<script>
import UE from "../../components/ue/ue.vue";

export default {
  components: { UE },
  data() {
    return {
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
      }
    };
  },
  methods: {
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
    }
  }
};
</script>

<style scoped lang="stylus">
</style>
