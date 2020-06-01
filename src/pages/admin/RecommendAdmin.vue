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
              <el-menu-item index="1-4" >攻略推荐</el-menu-item>
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
          <div v-show="activeIndex=='1-4'">
            <div >
              <!--内容显示-->
              <el-tabs v-model="inneractiveName" type="card" >
                <el-tab-pane label="热度推荐" name="first" style="text-align: left">

                  <div style="float: left">
                    <div>
                      <span>设置权重：</span><br>
                      <span>浏览：</span>
                      <el-select v-model="setlookvalue" placeholder="1" style="width: 80px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                      <span>点赞：</span>
                      <el-select v-model="setclickvalue" placeholder="3" style="width: 80px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                      <span>评论：</span>
                      <el-select v-model="setcommentvalue" placeholder="5" style="width: 80px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                      <el-button type="primary">确定修改</el-button>
                    </div>
                    <div>
                      <span>热度前十攻略：</span>
                      <br>
                      <br>
                      <el-transfer v-model="value"
                                   :titles="['推荐列表', '未显示列表']"
                                   :data="data"
                                   @change="handleChange"

                      ></el-transfer>
                    </div>

                  </div>

                  <div style="width: 500px ; float: left">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="label"
                        label="攻略名称"
                        width="450px">

                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="50px">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="标签管理" name="second" style="text-align: left">
                  <div style="height: 350px">
                    <div style="float: left">
                      <b>人物标签管理：</b>
                      <el-transfer v-model="Peoplevalue"
                                   :titles="['显示列表', '未显示列表']"
                                   :data="AllPeople"
                                   @change="PeoplehandleChange"></el-transfer>
                    </div>
                    <div style="float: left">
                      <el-input v-model="peopleinput" placeholder="请输入内容" style="width: 200px;margin-left: 100px"></el-input>
                      <el-button type="primary" @click="peopleinsert">添加人物</el-button>
                    </div>
                  </div>
                  <el-divider></el-divider>
                  <div style="height: 350px">
                    <div style="float: left">
                      <b>玩法标签管理：</b>
                      <el-transfer v-model="Playvalue"
                                   :titles="['显示列表', '未显示列表']"
                                   :data="AllPlay"></el-transfer>
                    </div>
                    <div style="float: left">
                      <el-input v-model="playinput" placeholder="请输入内容" style="width: 200px;margin-left: 100px"></el-input>
                      <el-button type="primary">添加玩法</el-button>
                    </div>
                  </div>
                  <el-divider></el-divider>
                  <div style="height: 350px">
                    <div style="float: left">
                      <b>时节标签管理：</b>
                      <el-transfer v-model="Seasonvalue"
                                   :titles="['显示列表', '未显示列表']"
                                   :data="AllSeason"></el-transfer>
                    </div>
                    <div style="float: left">
                      <el-input v-model="seasoninput" placeholder="请输入内容" style="width: 200px;margin-left: 100px"></el-input>
                      <el-button type="primary">添加时节</el-button>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
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
        name: "RecommendAdmin",
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        const setData = _ => {
          const data = [];
          for (let i = 1; i <= 10; i++) {
            data.push({
              value:i,
              label:i ,
            });
          }
          return data;
        };

        return {
          peopleinput:'',
          AllPeople:[],
          Peoplevalue:[],
          playinput:'',
          AllPlay:[],
          Playvalue:[],
          seasoninput:'',
          AllSeason:[],
          Seasonvalue:[],
          options: setData(),
          setlookvalue: '',
          setclickvalue:'',
          setcommentvalue:'',
          tableData: [],
          data: generateData(),
          inneractiveName:'first',
          value: [5,2,4],
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
        peopleinsert(){
          let _vm=this
          this.service.post("/sys/tags/peopleinsert.do",{
          "peoName":this.peopleinput
          }).then(function (response) {
            if(response.data.status==0){
              _vm.peopleinput=''
              _vm.getAllPeople()
              _vm.getPeopleValue()

            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },


        getAllPeople(){
          let _vm=this
          this.service.post("/sys/tags/peopleselectAll.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.AllPeople=response.data.data
              console.log("allpeople"+_vm.AllPeople)
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getAllPlay(){
          let _vm=this
          this.service.post("/sys/tags/playselectAll.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.AllPlay=response.data.data

            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getAllSeason(){
          let _vm=this
          this.service.post("/sys/tags/seaseonselectAll.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.AllSeason=response.data.data

            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        handleChange(value, direction, movedKeys) {
          let _vm=this
          this.service.post("/manage/active/sysUpdateStatus.do",{
            "movelist":movedKeys.toString(),
            "direction":direction,
          }).then(function (response) {
            if(response.data.status==0){
             _vm.getValue();
             _vm.getActive();
            }else{
             _vm.$message("失败");
            }
          }).catch(function (error) {
            console.log(error);
          });



          console.log(value, direction, movedKeys);
          let a=movedKeys.toString();
          console.log("a=="+a)
        },
        PeoplehandleChange(value, direction, movedKeys){
          let _vm=this
          this.service.post("/sys/tags/peopleupdatestatus.do",{
            "movelist":movedKeys.toString(),
            "direction":direction,
          }).then(function (response) {
            if(response.data.status==0){
              _vm.getPeopleValue();
              _vm.getAllPeople();
            }else{
              _vm.$message("失败");
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        PlayhandleChange(value, direction, movedKeys){
          let _vm=this
          this.service.post("/manage/active/sysUpdateStatus.do",{
            "movelist":movedKeys.toString(),
            "direction":direction,
          }).then(function (response) {
            if(response.data.status==0){
              _vm.getValue();
              _vm.getActive();
            }else{
              _vm.$message("失败");
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        SeasonhandleChange(value, direction, movedKeys){
          let _vm=this
          this.service.post("/manage/active/sysUpdateStatus.do",{
            "movelist":movedKeys.toString(),
            "direction":direction,
          }).then(function (response) {
            if(response.data.status==0){
              _vm.getValue();
              _vm.getActive();
            }else{
              _vm.$message("失败");
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        handleClick(row) {
          this.setsysOption(this.activeIndex);
          this.$router.push('/SysStrategyShow/'+row.sId);
        },
        getValue(){
          let _vm=this
          this.service.post("/manage/active/sysGetValue.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.value=response.data.data
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });


        },
        getPeopleValue(){
          let _vm=this
          this.service.post("/sys/tags/peoplegetvalue.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.Peoplevalue=response.data.data
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getActive(){
          let _vm=this
          this.service.post("/manage/active/sysActive.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.data=response.data.data
              _vm.tableData=response.data.data
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
        toNotUser(){
          this.defaltOpen=['2']
          this.activeIndex='2-1';
          this.setsysOption(this.activeIndex);
          this.$router.push("/SysMain");
        },
        getStrategy(){
          let _vm=this
          this.service.post("/manage/active/sysActive.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.data=response.data.data
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
      created(){
        this.activeIndex='1-4'
        this.getActive();
        this.getValue();
        this.getAllPeople();
        this.getAllPlay();
        this.getAllSeason();
        this.getPeopleValue();
      },
      computed:{
        ...mapGetters(['getsysOption']),
        ...mapGetters(['getsysUserInfo']),

      },
      mounted(){
        this.activeIndex='1-4'
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
