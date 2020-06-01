<template>
  <el-card class="box-card" style="width: 600px;margin-left: 400px">
    <div slot="header" class="clearfix" >
      <span>用户注册</span>
    </div>
    <div>
      <div class="userContent">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item prop="name" label="用户昵称">
            <el-input v-model="form.name" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item prop="account" label="账号(邮箱)">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="pass" label="密码">
            <el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" label="确认密码">
            <el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
            <el-button @click="onCancle()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>


</template>

<script>
    export default {
        name: "UserSign",
      data() {
        var validatePass = (rule, value, callback) => { // 验证密码
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.form.checkPass !== '') {
              this.$refs.form.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => { // 验证确认密码
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.pass) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        };
        var validateEmail = (rule, value, callback) => { // 验证邮箱
          if (value === '') {
            callback(new Error('请输入邮箱'));
          } else if (!Util.emailReg.test(this.form.email)) {
            callback(new Error('请输入正确的邮箱'));
          } else {
            callback();
          }
        };
        var validatePhone = (rule, value, callback) => { // 验证手机号
          if (value === '') {
            callback(new Error('请输入手机号'));
          } else if (!Util.phoneReg.test(this.form.phone)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        };
        var validateCard = (rule, value, callback) => { // 验证身份证号
          if (value === '') {
            callback(new Error('请输入身份证号'));
          } else if (!Util.idCardReg.test(this.form.card)) {
            callback(new Error('请输入正确的身份证号'));
          } else {
            callback();
          }
        };
        return {
          form: { // 表单内容
            name: '',
            account: '',
            pass: '',
            checkPass: '',
            email: '',
            phone: '',
            card: '',
            birth: '',
            sex: ''
          },
          rules: { // 表单校验规则
            name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }],
            account: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            }],
            pass: [{
              validator: validatePass,
              trigger: 'blur'
            }],
            checkPass: [{
              validator: validatePass2,
              trigger: 'blur'
            }],
            email: [{
              validator: validateEmail,
              trigger: 'blur'
            }],
            phone: [{
              validator: validatePhone,
              trigger: 'blur'
            }],
            card: [{
              validator: validateCard,
              trigger: 'blur'
            }],
            birth: [{
              required: true,
              message: '请输入出生日期',
              trigger: 'blur'
            }],
            sex: [{
              required: true,
              message: '请输入性别',
              trigger: 'blur'
            }]
          }
        }
      },
      methods: {
        onSubmit(formName) { // 点击注册
          const self = this;
          self.form.birth=this.timestampToTime(self.form.birth)
          console.log(self.form.birth)
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self.$http.post('/api/user/addUser',self.form).then(function(response) {
                console.log(response);
                self.$router.push('/register-success');
              }).then(function(error) {
                console.log(error);
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        timestampToTime(timestamp) {
          var date = new Date(timestamp);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          return Y + M + D ;
        },
        onCancle() { // 取消登录
          this.$router.push('/login');
        },
        getDateTimes(str) {
          var str = new Date(str);
          return str;
        }
      }


    }
</script>

<style scoped>
  .crumbs-register {
    background-color: #324157;
    height: 50px;
    line-height: 50px;
  }
  .register-title {
    line-height: 50px;
    margin: 0 auto;
    width: 50px;
    font-size: 16px;
  }
  .userContent {
    width: 400px;
    margin: 0 auto;
  }
  .select-sex {
    width: 300px;
  }
</style>
