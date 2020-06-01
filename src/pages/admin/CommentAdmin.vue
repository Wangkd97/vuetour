<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds=defaltOpen :default-active="activeIndex">
          <el-submenu index="1">
            <template slot="title">攻略管理</template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="1-1" @click="toAll">全部攻略</el-menu-item>
              <el-menu-item index="1-2" @click="toNot">未审核攻略</el-menu-item>
              <el-menu-item index="1-3" @click="toYes">已审核攻略</el-menu-item>
              <el-menu-item index="1-4" @click="toRecommend">攻略推荐</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">用户管理</template>
            <el-menu-item index="2-1" @click="toUser">正常用户</el-menu-item>
            <el-menu-item index="2-2" @click="toNotUser">封号用户</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">评论管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">查看评论</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
          <span>{{sysusername}}</span>
        </el-header>

        <el-main>
          <div v-show="activeIndex=='3-1'">
            <div v-show="activeIndex=='3-1'">
              <!--搜索-->
              <el-input v-model="inputvalue"
                        prefix-icon="el-icon-search"
                        placeholder="请输入攻略名称"
                        @change="fuzzyselect(currentpage)"
                        style="position: absolute;top: 22px; left: 580px;width: 250px"
              >
              </el-input>
              <!--内容显示-->
              <el-collapse v-model="activeName" accordion >
                <el-collapse-item    v-for="(item, index) in commentList" :title=item.strategyName  :name=index >

                  <div v-for="innermain in item.list" style="text-align: left;">
                    <span> {{innermain.time}}</span>
                        <span>{{innermain.fromName}}</span>
                        <span>评论</span>
                        <span>{{innermain.toName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                   <i class="el-icon-delete" style="cursor: pointer" @click="delectComment(innermain.cId)"> </i>
                    <br>
                    <span>{{innermain.comment}}</span>
                    <el-divider></el-divider>


                  </div>

                </el-collapse-item>

              </el-collapse>
              <!--分页-->
              <div class="block" style="float: left;margin-left: 400px" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="CommhandleCurrentChange"
                  :current-page=this.currentpage
                  :total="this.pagetotal">
                </el-pagination>
              </div>
            </div>

          </div>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "CommentAdmin",
      data() {
        return {
          sysusername:'',
          inputvalue:'',
          fuzzycurrentpage:1,
          defaltOpen:['1'],
          dengluurl:'',
          denglu:'',
          strategyId:1,
          imageUrl:'',
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          form:{
            id:'',
            title: '',
            time: '',
            addTime:'',
            isDel:1,
            content:'',
            image:'',
            pay:'',
            daynum:'',
            looknum:'',
            username:'',
            userUrl:'',
          },
          drawer: false,
          pagetotal:1,
          currentpage:1,
          start:'',
          activeIndex:'',

          activeName:'1',
          commentList:[],
        }
      },
      methods:{
        ...mapActions(['setsysOption']),
        fuzzyselect(currentpage){
          this.getfuzzynum();
          var start = (currentpage-1)*10;
          var _vm=this;
          this.service.post("/manage/comment/sysFuzzyGetComment.do",{
            //  params:
            "name":this.inputvalue,
            "start":start,
            //  }
          }).then(function (response) {
            console.log("获取攻略======"+response);
            if(response.status==200){

              _vm.commentList=response.data.data;

            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getfuzzynum(){
          var _vm=this;
          this.service.post("/sys/strategy/syscountfuzzyall.do",{
            "name":this.inputvalue,
            "status":1,
          }).then(function (response) {
            console.log("获取数量======"+response);
            if(response.status==200){
              _vm.pagetotal=response.data.data;
              console.log("====response.pagenum.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        toAll(){

          this.activeIndex='1-1'
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysMain");

        },
        toNot(){
          this.activeIndex='1-2'
          this.setsysOption(this.activeIndex);

          this.$router.push("/SysMain");
        },
        toYes(){
          this.activeIndex='1-3'
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysMain");
        },
        toUser(){
          this.defaltOpen=['2']
          this.activeIndex='2-1';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysMain");
        },
        toRecommend(){
          this.activeIndex='1-4';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysRecommend");
        },
        toNotUser(){
          this.defaltOpen=['2']
          this.activeIndex='2-1';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysMain");
        },
        getAllStrategyNum(){
          var _vm=this;
          this.service.post("/sys/strategy/selectcountall.do",{
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.pagetotal=response.data.data;
              console.log("====response.pagenum.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        sysgetComment(currentpage){
          this.getAllStrategyNum();
          let _vm=this;
          let start = (currentpage-1)*10;
          this.service.post("/manage/comment/sysGetComment.do ",{
            "start":start,
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){
              _vm.commentList=response.data.data
            }else{
              _vm.$message({
                showClose: true,
                message: '警告，失败',
                type: 'error'
              })
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        CommhandleCurrentChange: function(currentPage) {
          this.currentpage = currentPage;
          console.log(this.currentpage); //点击第几页
          this.sysgetComment(currentPage)

        },
        delectComment(cId){
          console.log("cId====="+cId);
          var _vm=this;
          this.service.post("/manage/comment/delectComment.do",{
            //  params:
            "cId":cId,
            //  }
          }).then(function (response) {
            console.log(response);
            if(response.data.date!=0){
              if (_vm.inputvalue!=''){
                _vm.fuzzyselect(_vm.currentpage);
              } else{
                _vm.sysgetComment(_vm.currentpage)
              }

            }else{
              _vm.$message({
                type:"warning",
                message:"删除失败"
              })
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
      created(){
        this.activeIndex='3-1'
       this.sysgetComment(this.currentpage);

      },
      computed:{
        ...mapGetters(['getsysOption']),
        ...mapGetters(['getsysUserInfo']),

      },
      mounted(){
        this.activeIndex='3-1'
        this.sysusername=this.getsysUserInfo.uName
      }
    }
</script>

<style >
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    height:100vh;
  }
  .el-main .el-footer{
    height: 100%;
  }
  .touxiang{
    width: 80px;
    height: 80px;
    margin-left: 200px;
    position:absolute;
    bottom:-40px;
  }
  .title-config{
    width: 600px;
    color: azure;
    font-weight: bold;
    font-size:28px;
    left: 300px;
    position:absolute;
    bottom:20px;
    overflow-wrap:break-word;
  }
  .picsize{
    width: 100%;
    height: 360px;
    background-size: cover;

  }
  *{margin:0; padding:0;}
  .fontcolor{
    color: darksalmon;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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
    width: 1346px;
    height: 360px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1346px;
    height: 360px;
    line-height: 250px;
    text-align: center;
  }
  .avatar {
    width: 1346px;
    height: 360px;
    display: block;
  }
</style>
