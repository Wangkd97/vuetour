<template>
  <div>
    <div class="top" style="width: 100%;height: 50px">

    </div>
    <div class=tole>

      <div class="login-box" >
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :model="ruleForm" :rules="Rules" ref="ruleForm"  label-position="right" label-width="auto" >
          <span class="login-title" >欢迎登录</span>
          <div style="margin-top: 50px"></div>

          <el-form-item label="用户名" prop="username" >
            <el-col :span="22">
              <el-input type="text"  v-model="ruleForm.username" ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="密码" prop="password" >
            <el-col :span="22">
              <el-input type="password" v-model="ruleForm.password" ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button style="width:175px;" type="primary"  @click="submitForm('ruleForm')"> 登录</el-button>
            <!--<el-button style="width:175px;" type="primary"  @click="userLogin"> 登录</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer" >

      <span>Copyright ©2019 Mr.Wang  &nbsp;&nbsp; 地址：河北省秦皇岛市河北大街西段438号 </span> <br>
      <span>Be Gradeful for Mr.Wang </span>



    </div>

  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    name:"UserLogin",
    data() {
      return {

        ruleForm: {
          username: '',
          password: ''
        },
        Rules: {
          username: [
            {required:true,message:'账号不可为空',trigger:'blur'},
            {min:3,max:20,message:'长度在3到20个字符',trigger:'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]

        }
      };
    },
    methods: {
      ...mapActions(['setUserInfo']),
      ...mapActions(['setUserName']),
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var _vm=this;
            //通过axios
            this.service.post("/manage/user/login.do",{
              //  params:
              "uEmail":this.ruleForm.username,
              "uPwd":this.ruleForm.password
              //  }
            },this.ruleForm,formName).then(function (response) {
              console.log(response);
              if(response.data.status==0&&response.data.msg==null){
                //当用户登录成功后，将用户信息保存到vuex中
                 _vm.setUserInfo(response.data.data)
                _vm.setUserName(response.data.data.uName)
                _vm.$router.push("/TestMain")

              }else{

                _vm.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }).catch(function (error) {
              console.log(error);
            });
            //如果通过验证 to do...
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      },
      userLogin:function () {

        if(this.ruleForm.username==''||this.ruleForm.password==''){
        alert("用户名不能为空")
        }else{
          console.log(this.ruleForm.username+"=======loginname=====")
          console.log(this.ruleForm.password+"====loginpwd========")
          var _vm=this;
          //通过axios
          this.service.post("/manage/user/login.do",{
            //  params:{

            "uName":this.ruleForm.username,
            "uPwd":this.ruleForm.password
            //  }
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0&&response.data.wrongMsg==null){
              //当用户登录成功后，将用户信息保存到vuex中
              sessionStorage.setItem("uName",response.data.data.uName)
              sessionStorage.setItem("userInfo",response.data.data)
              _vm.setUserInfo(response.data.data)

              console.log("getuser======"+_vm.getUser)
             _vm.$message("getuser===="+ _vm.getUser)
              _vm.$router.push("/main")
              // _vm.$router.push("/my")
            }else{

            }

          })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
    computed:{
      ...mapGetters(['getUser'])
    },
    mounted(){
      if(JSON.stringify( this.getUser)=='{}'){
    //未登录
    //this.$router.push("/login");
  }else{
    //已登录
    this.$router.push("/TestMain");
  }

  }

  }
</script>
<style scoped>
  .tole{
    width:100%;
    height:80%;
    background-size: 100% 100%;
    background-image: url("../images/denglujiemian.jpg");
    position: fixed;
    left:0px;

  }
  .login-box {
    background-color:White;
    border: 1px solid #DCDFE6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    margin: 10% 60%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px palegreen;
  }
  .login-title {

    text-align: center;
    margin: 0 auto 40px auto;
    color: #66CD00;
    font-size: 30px;
    font-weight: bold;
  }
  .footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 50px;


  }
</style>
