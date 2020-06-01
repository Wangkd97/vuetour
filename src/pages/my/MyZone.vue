<template>
    <div>
      <div style="width: 100%;height:8%;text-align: end;background-color: #00C5CD;">
        <strong><el-link id="denglu" :underline="false" style="font-size: 15px" :href=dengluurl></el-link>{{denglu}}</strong>
        <span> | 我的空间</span>
        <span> | 退出</span>
      </div>
      <div name="backg" style="width: 100%;height: 250px;background-color:bisque">
          <img src="http://127.0.0.1/taohua2.jpg" style="width: 100%;height: 250px">
      </div>

      <div name="menu" style="width: 100%;height: 50px;background-color: #e7dfe2"  align="left">
        <!--@tab-click="handleClick"-->
        <el-tabs  v-model="activeName"  @tab-click="handleClick"  style="margin-left: 300px">
          <el-tab-pane    label="首页"   name="first" >
            <div name="showstrategy" v-for="(strategy,index) in strategylist">
              <div style="width: 650px;height: 480px;background-color: #F5F5F5;margin-top: 15px">
                <span style="margin-left: 15px;width: 250px;">发布时间：{{strategy.sTime}} </span>

                <el-dropdown @command="handleCommand">
                   <span class="el-dropdown-link" style="margin-left: 360px">
                   <i class="el-icon-arrow-down el-icon--right" style="font-size: 25px;cursor: pointer" ></i>
                   </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command=strategy.sId>编辑</el-dropdown-item>
                    <el-dropdown-item :command=strategy>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <br>
                <span :id="index" class="titlecss" :style="titlefontcolor"
                      @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"
                      @click="toMain(strategy.sId)"> {{strategy.sName}}</span>  &nbsp;&nbsp;
                <el-tooltip content="未审核" placement="top" effect="light">
                  <i v-if="strategy.sStatus==0" class="el-icon-warning" style="cursor: pointer;font-size: 20px"></i>
                </el-tooltip>

                <img :src=strategy.sCover style="width: 600px;height: 400px;margin-left: 15px;cursor:pointer;"
                     @click="toMain(strategy.sId)">

              </div>


            </div>
            <!--分页-->
            <div class="block" style="float: left;margin-left: 400px" >
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page=this.currentpage
                :total="this.pagetotal">
              </el-pagination>
            </div>

          </el-tab-pane>
          <el-tab-pane label="已发布" name="second">
            <div name="showstrategy" v-for="(strategy,index) in strategylist">
              <div style="width: 650px;height: 480px;background-color: #F5F5F5;margin-top: 15px">
                <span style="margin-left: 15px;width: 230px;">发布时间：{{strategy.sTime}} </span>

                <el-dropdown @command="handleCommand">
                   <span class="el-dropdown-link" style="margin-left: 360px">
                   <i class="el-icon-arrow-down el-icon--right" style="font-size: 25px;cursor: pointer" ></i>
                   </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command=strategy.sId>编辑</el-dropdown-item>
                    <el-dropdown-item :command=strategy>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <br>
                <span :id="index" class="titlecss" :style="titlefontcolor"
                      @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"
                      @click="toMain(strategy.sId)"> {{strategy.sName}}</span>
                <img :src=strategy.sCover style="width: 600px;height: 400px;margin-left: 15px;cursor:pointer;"
                     @click="toMain(strategy.sId)">

              </div>


            </div>
            <!--分页-->
            <div class="block" style="float: left;margin-left: 400px" >
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page=this.currentpage
                :total="this.pagetotal">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未审核" name="third">
            <div name="showstrategy" v-for="(strategy,index) in strategylist">
              <div style="width: 650px;height: 480px;background-color: #F5F5F5;margin-top: 15px">
                <span style="margin-left: 15px;width: 230px;">发布时间：{{strategy.sTime}} </span>

                <el-dropdown @command="handleCommand">
                   <span class="el-dropdown-link" style="margin-left: 360px">
                   <i class="el-icon-arrow-down el-icon--right" style="font-size: 25px;cursor: pointer" ></i>
                   </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command=strategy.sId>编辑</el-dropdown-item>
                    <el-dropdown-item :command=strategy>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <br>
                <span :id="index" class="titlecss" :style="titlefontcolor"
                      @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"
                      @click="toMain(strategy.sId)"> {{strategy.sName}}</span>
                &nbsp;&nbsp;
                <el-tooltip content="未审核" placement="top" effect="light">
                  <i  class="el-icon-warning" style="cursor: pointer;font-size: 20px"></i>
                </el-tooltip>

                <img :src=strategy.sCover style="width: 600px;height: 400px;margin-left: 15px;cursor:pointer;"
                     @click="toMain(strategy.sId)">

              </div>


            </div>
            <!--分页-->
            <div class="block" style="float: left;margin-left: 400px" >
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page=this.currentpage
                :total="this.pagetotal">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人信息" name="fourth">

            <el-avatar shape="square" :size="100"  :src="user.uPic"></el-avatar>
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              name="uploadfile"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->

              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <el-button size="small" type="primary">更换头像</el-button>
            </el-upload>
            <el-button size="small" type="primary" @click="centerDialogVisible = true">修改密码</el-button>
            <div style="margin-left: 80px" >
              <span>昵称：</span>
              <el-input v-model="user.uName" style="width: 300px" placeholder="请输入内容"></el-input>
              <br>  <br>
              <span>账号：</span>
              <el-input v-model="user.uEmail" style="width: 300px;" placeholder="请输入内容" disabled></el-input>
              <br>  <br>
              <span>性别：</span>

              <el-radio v-model="user.uGender" label='1'>男</el-radio>
              <el-radio v-model="user.uGender" label='0'>女</el-radio>
            </div>
            <br><br>
            <el-button type="success" round style="margin-left: 140px" @click="saveUserInfo">保存</el-button>

          </el-tab-pane>
        </el-tabs>

      </div>

      <el-dialog
        title="修改密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>原密码：</span>
        <el-input v-model="oldPwd" placeholder="请输入原密码" show-password @blur="judgeOldPwd" @focus="towarning2"></el-input>
        <p style="font-size: 10px;color: red;" >{{warning2}}</p>
        <span>新密码：</span>
        <el-input v-model="newPwd" placeholder="请输入新密码" show-password @focus="towarning"> </el-input>
        <span>新密码：</span>
        <el-input v-model="newPwd2" placeholder="请重新输入新密码" show-password @blur="judgePwd" @focus="towarning"></el-input>
        <p style="font-size: 10px;color: red;" >{{warning}}</p>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatePwd">确 定</el-button>
  </span>
      </el-dialog>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "MyZone",
        data(){
          return {
            ifPwd:false,
            ifPwdEqual:false,
            warning2:'',
            warning:'',
            oldPwd:'',
            newPwd:'',
            newPwd2:'',
            centerDialogVisible: false,
            serverUrl:'http://localhost:8888/manage/pic/upload.do',
          // serverUrl:'',
            radio:'1',
            imageUrl: '',
            activeName: 'first',
            dengluurl:'',
            denglu:'',
            strategylist:[],
            pagetotal:1,
            currentpage:1,
            start:'',
            titlefontcolor:'color:black',
            user:{
              "uId": '',
              "uStatus": '',
              "uName": "",
              "uEmail": "",
              "uPwd": "",
              "uGender": '',
              "uAge": '',
              "uPic": "http://127.0.0.1/touxiang.jpg"

            },
            uupic:'',
          }
        },
      computed:{
        ...mapGetters(['getUser']),
      },
      methods:{
        ...mapActions(['setUserInfo']),
        updatePwd(){
          var _vm=this;
          this.service.post("/manage/user/updatePwd.do ",{
            "uId": this.user.uId,
            "uStatus": this.user.uStatus,
            "uName": this.user.uName,
            "uEmail": this.user.uEmail,
            "uGender": this.user.uGender,
            "uAge": this.user.uAge,
            "uPic": this.user.uPic,
            "uPwd":this.newPwd
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){
              _vm.$message({
                showClose: true,
                message: '恭喜你，修改成功',
                type: 'success'
              })
              _vm.setUserInfo({})
              _vm.centerDialogVisible=true;
              _vm.$router.push("/login");

            }else{
              _vm.$message({
                showClose: true,
                message: '警告，修改失败',
                type: 'error'
              })
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        towarning2(){
          this.warning2=''
        },
        judgeOldPwd(){
          if(this.oldPwd==this.user.uPwd){
            this.ifPwd=true
          }else{
            this.warning2="密码错误"
            this.ifPwd=false
          }
        },
        towarning(){
          this.warning=''
        },
        judgePwd(){
          if (this.newPwd==this.newPwd2){
              this.ifPwdEqual=true
          } else{
            this.warning="两次密码输入不一致"
            this.ifPwdEqual=false
           // this.$message("两次密码输入不一致！")
          }
        },
        saveUserInfo(){
          var _vm=this;
          this.service.post("/manage/user/update.do ",{
            "uId": this.user.uId,
            "uStatus": this.user.uStatus,
            "uName": this.user.uName,
            "uEmail": this.user.uEmail,
            "uGender": this.user.uGender,
            "uAge": this.user.uAge,
            "uPic": this.user.uPic,
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){
              _vm.$message({
                showClose: true,
                message: '恭喜你，修改成功',
                type: 'success'
              })
              _vm.setUserInfo(response.data.data)
            }else{
              _vm.$message({
                showClose: true,
                message: '警告，修改失败',
                type: 'error'
              })
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getUserInfo(){
          this.user.uPic=this.getUser.uPic
          this.user.uName=this.getUser.uName
          this.user.uEmail=this.getUser.uEmail
          this.user.uAge=this.getUser.uAge
          this.user.uGender=this.getUser.uGender+''
          this.user.uId=this.getUser.uId
          this.user.uStatus=this.getUser.uStatus
          this.user.uPwd=this.getUser.uPwd


        },
        beforeAvatarUpload (file) {
          // const isJPG = file.type === 'image/jpeg'
          // const isLt2M = (file.size / 1024 / 1024) < 2
          //
          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!')
          // }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!')
          // }
          // return isJPG && isLt2M
          var _vm=this
          this.service.post("/manage/pic/upload.do ",{
          "uploadfile":file,
          }).then(function (response) {
            console.log("图片===="+response);
            if(response.data.status==0){

            }else{
              _vm.$message({
                showClose: true,
                message: '警告，修改失败',
                type: 'error'
              })
            }
          }).catch(function (error) {
            console.log(error);
          });



        },
        handleAvatarSuccess(res, file) {
          //this.imageUrl = URL.createObjectURL(file.raw);
          let url="http://127.0.0.1/"+URL.createObjectURL(file.raw).substring(27,200)+".jpg";

          console.log("url===="+url);
          this.uupic=url;
          this.user.uPic=  URL.createObjectURL(file.raw);

        },
        handleCommand(command) {
          if (typeof command!="object"){
            this.$router.push('/StrategyUpdate/'+command)
          } else{
            var _vm=this
              this.service.post("/manage/strategy/updateStatus.do",{
               "strategyId":command.sId
              }).then(function (response) {
                console.log(response)
                if(response.status==200){
                  _vm.$message("删除成功");
                  _vm.getData(_vm.currentpage)
                }else{
                  _vm.$message("失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
          }
        },
        getData(currentpage){
            var _vm=this
            var start = (currentpage-1)*10;
            if (this.activeName=="first"){
              this.getnumbyuser();
              this.service.post("/manage/strategy/byuser.do",{
                "userId":this.getUser.uId,
                "start":start
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            } else if(this.activeName=="second"){
              this.getdonumbyuser();
              this.service.post("/manage/strategy/dobyuser.do",{
                "userId":this.getUser.uId,
                "start":start
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            }else if(this.activeName=="third"){
              this.getundonumbyuser();
              this.service.post("/manage/strategy/undobyuser.do",{
                "userId":this.getUser.uId,
                "start":start
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            }

          },
        handleClick(tab, event){
            if (tab.label=="首页"){
              var _vm=this
              this.service.post("/manage/strategy/byuser.do",{
                "userId":this.getUser.uId,
                "start":0
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            } else if(tab.label=="已发布"){
              this.getdonumbyuser()
              var _vm=this
              this.service.post("/manage/strategy/dobyuser.do",{
                "userId":this.getUser.uId,
                "start":0
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            } else if(tab.label=="未审核"){
              this.getundonumbyuser()
              var _vm=this
              this.service.post("/manage/strategy/undobyuser.do",{
                "userId":this.getUser.uId,
                "start":0
              }).then(function (response) {
                if(response.status==200){
                  _vm.strategylist=response.data.data;
                }else{
                  this.$message("获取数据失败")
                }
              }).catch(function (error) {
                console.log(error);
              });
            }else if (tab.label=="个人信息"){
              this.getUserInfo();
            }
          },
        handleCurrentChange: function(currentPage) {
          this.currentpage = currentPage;
          console.log(this.currentpage); //点击第几页
            this.getData(currentPage);
        },
        getnumbyuser(){
          var _vm=this;
          this.service.post("/manage/strategy/countbyuser.do ",{
            "userId":this.getUser.uId,

          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.pagetotal=response.data.data;
            }else{
             this.$message("失败")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        mouseLeave(index){
          document.getElementById(index).style.color="black";
        },
        mouseOver(index){
          document.getElementById(index).style.color="#409EFF";
        },
        toMain(strategyId){
          let routeData = this.$router.resolve({
            path:'/show/'+strategyId,
          });
          window.open(routeData.href, '_blank');
        },
        getdonumbyuser(){
          var _vm=this;
          this.service.post("/manage/strategy/countIfDobyuser.do",{
            "userId":this.getUser.uId,
            "status":1

          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.pagetotal=response.data.data;

            }else{
              this.$message("失败")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getundonumbyuser(){
          var _vm=this;
          this.service.post("/manage/strategy/countIfDobyuser.do ",{
            "userId":this.getUser.uId,
            "status":0
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.pagetotal=response.data.data;

            }else{
              this.$message("失败")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        iflogin(){
          if(JSON.stringify( this.getUser)=='{}'){
            //未登录
            this.$router.push("/login");
          }
        },
      },
      created(){
        this.iflogin();
        this.getData(this.currentpage);
        this.getnumbyuser();


      },
      mounted() {
        if(JSON.stringify( this.getUser)=='{}'){
          //未登录
          this.denglu="登录"
          this.dengluurl="http://127.0.0.1:8080/#/login"
        }else{
          //已登录
          //  this.$message("user=="+this.getUser)
          this.denglu=this.getUser.uName
          this.dengluurl="http://127.0.0.1:8080/#/main"
        }
      }
    }
</script>

<style >
  *{margin:0; padding:0;}
  .titlecss{
    cursor:pointer;width: 680px; overflow-wrap:break-word;
    font-size: 20px;margin-left: 15px;font-weight: bold
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
