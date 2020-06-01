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
              <el-menu-item index="3-1" @click="toComment">查看评论</el-menu-item>
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
          <div v-show="activeIndex=='1-1'">
            <div v-show="activeIndex=='1-1'">
              <el-table
                :data="AllStrategy"
                style="width: 100%"
                :default-sort = "{prop: 'sTime', order: 'descending'}"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="sTime"
                  sortable
                  label="发布时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="uEmail"
                  label="用户账号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="sName"
                  label="攻略标题"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick2(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block" style="float: left;margin-left: 400px" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :current-page=this.currentpage
                  :total="this.pagetotal">
                </el-pagination>
              </div>

            </div>

          </div>
          <div v-show="activeIndex=='1-2'">
            <div v-show="activeIndex=='1-2'">
              <el-input v-model="inputvalue"
                        prefix-icon="el-icon-search"
                        placeholder="请攻略名称"
                        @change="fuzzyselect(fuzzycurrentpage)"
                        style="position: absolute;top: 22px; left: 580px;width: 250px"
              >
              </el-input>
              <el-table
                :data="NotCheckStrategy"
                style="width: 100%"
                :default-sort = "{prop: 'sTime', order: 'descending'}"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="sTime"
                  sortable
                  label="发布时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="uEmail"
                  label="用户账号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="sName"
                  label="攻略标题"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick2(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block" style="float: left;margin-left: 400px" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="NothandleCurrentChange"
                  :current-page=this.NotCheckCurrentPage
                  :total="this.NotCheckPageTotal">
                </el-pagination>
              </div>
            </div>

          </div>
          <div v-show="activeIndex=='1-3'">
            <div v-show="activeIndex=='1-3'">
              <el-table
                :data="CheckStrategy"
                style="width: 100%"
                :default-sort = "{prop: 'uEmail', order: 'descending'}"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="sTime"
                  label="发布时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="uEmail"
                  sortable
                  label="用户账号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="sName"
                  label="攻略标题"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick2(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block" style="float: left;margin-left: 400px" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="YeshandleCurrentChange"
                  :current-page=this.CheckCurrentPage
                  :total="this.CheckPageTotal">
                </el-pagination>
              </div>
            </div>

          </div>
          <div v-show="activeIndex=='2-1'">
            <div v-show="activeIndex=='2-1'">
              <el-input v-model="uEmailinputvalue"
                        prefix-icon="el-icon-search"
                        placeholder="请输入用户账号"
                        @change="uEmailselect()"
                        style="position: absolute;top: 22px; left: 580px;width: 250px"
              >
              </el-input>
              <el-table
                :data="userInfoList"
                style="width: 100%">
                <el-table-column
                  label="头像"
                  width="100">
                  <template slot-scope="scope">
                    <div class="block"  ><el-avatar shape="square" :size="80" :src=scope.row.uPic ></el-avatar></div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="uEmail"
                  label="账号"
                  width="330">
                </el-table-column>
                <el-table-column
                  prop="uName"
                  label="昵称"
                  width="330">
                </el-table-column>
                <el-table-column
                  prop="uGender"
                  label="性别"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="uAge"
                  label="年龄"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="uStatus"
                  label="状态"
                ></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="UserhandleClick1(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="UserhandleClick2(scope.row)" type="text" size="small">封号</el-button>
                    <!--<el-button @click="UserhandleClick3(scope.row)" type="text" size="small">解封</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="block" style="float: left;margin-left: 400px" >
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="UserhandleCurrentChange"
                  :current-page=this.UserCurrentPage
                  :total="this.UserPageTotal">
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
        name: "Main",
      data() {
        return {
          sysusername:'',

          uEmailinputvalue:'',
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
          AllStrategy:[],
          NotCheckStrategy:[],
          CheckStrategy:[],
          NotCheckPageTotal:1,
          NotCheckCurrentPage:1,
          CheckPageTotal:1,
          CheckCurrentPage:1,
          userInfoList:[],
          UserPageTotal:1,
          UserCurrentPage:1,

        }
      },
      methods:{
        ...mapActions(['setsysOption']),
        updateStrategyStatus(sId){
          var _vm=this
          this.service.post("/manage/strategy/updateStatus.do",{
            "strategyId":sId
          }).then(function (response) {
            console.log(response)
            if(response.status==200){

              _vm.$message({
                type: 'success',
                message: '删除成功!'
              });
              _vm.getAllStrategy(_vm.currentpage)
              _vm.getNotStrategy(_vm.NotCheckCurrentPage)
              _vm.getYesStrategy(_vm.CheckCurrentPage)
            }else{
              _vm.$message({
                type: 'info',
                message: '已取消删除'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        updateUserStatus(user,status){
          var _vm=this;
          this.service.post("/sys/user/sysupdateStatus.do",{
            //  params:
            "status":status,
            "uId":user.uId
            //  }
          }).then(function (response) {
            if(response.status==200){
              _vm.getUserList(_vm.UserCurrentPage);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        uEmailselect(){
          var _vm=this;
          this.service.post("/sys/user/sysselectByEmail.do",{
            //  params:
            "uEmail":this.uEmailinputvalue,
            //  }
          }).then(function (response) {
            if(response.status==200){
              _vm.userInfoList=response.data.data;
              _vm.UserPageTotal=1;
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        fuzzyselect(currentpage){
          this.getfuzzynum();
          var start = (currentpage-1)*10;
          var _vm=this;
          this.service.post("/sys/strategy/sysFuzzySelect.do",{
            //  params:
            "name":this.inputvalue,
            "start":start,
            "status":0,
            //  }
          }).then(function (response) {
            console.log("获取攻略======"+response);
            if(response.status==200){
           //   _vm.strategylist=response.data.data;
              _vm.NotCheckStrategy=response.data.data;
            //  console.log("====response.data.data="+response.data.data);
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
            "status":0,
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
        tableRowClassName({row, rowIndex}) {

          if (row.sStatus === 0) {
            return 'warning-row';
          } else if (row.sStatus=== 1) {
            return 'success-row';
          }
          return '';
        },
        toAll(){

          this.activeIndex='1-1'
          this.setsysOption(this.activeIndex);
          this.getAllStrategyNum();
          this.getAllStrategy(this.currentpage);

          },
        toNot(){
          this.activeIndex='1-2'
          this.setsysOption(this.activeIndex);
          this.getNotStrategyNum();
          this.getNotStrategy(1)
          this.inputvalue='';
         // this.$router.push("/SysUserAdmin");
        },
        toYes(){
          this.activeIndex='1-3'
          this.setsysOption(this.activeIndex);
          this.getYesStrategyNum();
          this.getYesStrategy(1)
        },
        toUser(){
          this.defaltOpen=['2']
          this.activeIndex='2-1';
          this.setsysOption(this.activeIndex);
          this.getUserNum();
          this.getUserList(this.UserCurrentPage);

        },
        toNotUser(){

        },
        toComment(){
          this.defaltOpen=['3']
          this.activeIndex='3-1';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysComment");
        },
        toRecommend(){
          this.activeIndex='1-4';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysRecommend");
        },
        getAllStrategy(currentpage){
          this.getAllStrategyNum()
          let _vm=this;
          var start = (currentpage-1)*10;
          this.service.post("/sys/strategy/sysSelectAll.do ",{
           "start":start
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){

              _vm.AllStrategy=response.data.data
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
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage); //点击第几页
         this.getAllStrategy(currentPage)

        },
        handleClick(row) {
          this.setsysOption(this.activeIndex);
         this.$router.push('/SysStrategyShow/'+row.sId);
        },
        handleClick2(row){
          this.$confirm('是否将此攻略删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.updateStrategyStatus(row.sId);
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },
        UserhandleClick1(row){
          console.log(row)
        },
        UserhandleClick2(row){
          this.$confirm('是否将此用户进行封号管理?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateUserStatus(row,2);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },
        UserhandleClick3(row){
          console.log(row)
        },
        getNotStrategy(currentpage){
          this.getNotStrategyNum()
          let _vm=this;
          var start = (currentpage-1)*10;
          this.service.post("/sys/strategy/sysSelectIfNotAll.do ",{
            "start":start,
            "status":0,
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){

              _vm.NotCheckStrategy=response.data.data
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
        getNotStrategyNum(){
          var _vm=this;
          this.service.post("/sys/strategy/selectIfNotcountall.do",{
            "status":0,
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.NotCheckPageTotal=response.data.data;
              console.log("====response.pagenum.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        NothandleCurrentChange: function(currentPage) {
          if(this.inputvalue!=''){
            this.fuzzycurrentpage=currentPage;
            this.fuzzyselect(currentPage)
          }else{
            this.NotCheckCurrentPage = currentPage;
            console.log(this.NotCheckCurrentPage); //点击第几页

            this.getNotStrategy(currentPage)
          }


        },
        getYesStrategy(currentpage){
          this.getYesStrategyNum()
          let _vm=this;
          var start = (currentpage-1)*10;
          this.service.post("/sys/strategy/sysSelectIfNotAll.do ",{
            "start":start,
            "status":1,
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){

              _vm.CheckStrategy=response.data.data
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
        getYesStrategyNum(){
          var _vm=this;
          this.service.post("/sys/strategy/selectIfNotcountall.do",{
            "status":1,
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.CheckPageTotal=response.data.data;
              console.log("====response.pagenum.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        YeshandleCurrentChange: function(currentPage) {
          this.CheckCurrentPage = currentPage;
        //点击第几页
          this.getYesStrategy(currentPage)

        },
        getUserList(currentpage){
          this.getUserNum();
          let _vm=this;
          var start = (currentpage-1)*10;
          this.service.post("/sys/user/sysfenyeselectAll.do ",{
            "start":start,
          }).then(function (response) {
            console.log(response);
            if(response.data.status==0){
              _vm.userInfoList=response.data.data
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
        getUserNum(){
          var _vm=this;
          this.service.post("/sys/user/sysfenyeselectAllCount.do",{
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.UserPageTotal=response.data.data;
              console.log("====response.pagenum.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        UserhandleCurrentChange: function(currentPage) {
          this.UserCurrentPage = currentPage;
          //点击第几页
          this.getUserList(currentPage)

        },
      },
      created(){
        this.activeIndex=this.getsysOption;
          if(this.activeIndex=='1-1'){
            this.getAllStrategy(this.currentpage);
            this.getAllStrategyNum();
          }else if (this.activeIndex=='1-2') {
            this.getNotStrategy(this.NotCheckCurrentPage);
            this.getNotStrategyNum();
          }else if(this.activeIndex=='2-1'){
            this.getUserNum();
            this.getUserList(this.UserCurrentPage);
          }else if (this.activeIndex=='1-3') {
            this.getYesStrategyNum();
            this.getYesStrategy(1)
          }

      },
      computed:{
        ...mapGetters(['getsysOption']),
        ...mapGetters(['getsysUserInfo']),
      },
      mounted(){
        this.activeIndex=this.getsysOption,
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
