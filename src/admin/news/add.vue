<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formNode" status-icon label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model.trim="formData.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="none-line-height" label="正文" prop="content">
        <ueditor v-model.trim="formData.content" :options="options" id="news-add" ref="ueditor"></ueditor>
      </el-form-item>
      <el-form-item class="news-add">
        <el-button @click="$router.back();">返回</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import { postNewsAdd } from '@/api/news'

export default {
  data () {
    return {
      formData: {
        title: '',
        content: '',
      },

      options: {
        UEDITOR_HOME_URL: '/static/ueditor/',
        initialFrameWidth: '100%',
      },

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入正文', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submit(){
      this.$refs.formNode.validate((valid) => {
        if(valid){
          this.postNewsAdd();
        }
      });
    },
    postNewsAdd(){
      var data = this.formData;
      postNewsAdd({
        data
      }).then(res =>{
        var code = res.data.code;
        if(code == 0){//成功
          this.$message({
            message: res.data.msg,
            type: 'success'
          });

          this.formData = {//清空数据
            title: '',
            content: '',
          };
          this.$router.push('/admin/news');//跳转到列表页面
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err =>{
        this.$message({
          message: 'Error',
          type: 'error'
        });
      });
    }
  },
  watch: {
    ['formData.content'](newval,oldval){
      this.$refs.formNode.validateField('content');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-header{
  text-align: right;
  margin-bottom: 10px;
}
.news-add{
  text-align: right;
}
/deep/.none-line-height .el-form-item__content{
  line-height: inherit;
}
</style>
