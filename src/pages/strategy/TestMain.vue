<template xmlns="http://www.w3.org/1999/html">
  <div >
    <!--头部-->
    <div style="width: 100%;height:8%;text-align: end;background-color: #00C5CD;">
      <strong style="cursor: pointer" @click="denglutologin"><el-link id="denglu" :underline="false" style="font-size: 15px;cursor: pointer" :href=dengluurl></el-link>{{denglu}}</strong>
      <span style="cursor: pointer" @click="toMyZone"> | 我的空间</span>
      <span @click="usertoexit" style="cursor: pointer"> | 退出</span>
    </div>
    <!--菜单栏-->
    <div style="width: 100%;height: 60px;background-color: #F5F5F5">

      <br>
      <div name="left" style="width: 380px;" >
          <el-tabs v-model="activeName" @tab-click="handleClick"  style="margin-left: 100px;" >
            <el-tab-pane label="首页" name="first" style="margin-left: 20px">
            </el-tab-pane>
            <el-tab-pane label="攻略库" name="second">
            </el-tab-pane>
            <el-tab-pane label="发布攻略" name="third">
            </el-tab-pane>
          </el-tabs >
      </div>
      <div name="right" >
        <el-input v-model="inputvalue"
        prefix-icon="el-icon-search"
        placeholder="请输入内容"
        @change="fuzzyselect(currentpage)"
        style="position: absolute;top: 21px; left: 550px;width: 250px;margin-top: 10px;margin-left: 300px"
        >
        </el-input>
      </div>
      <!--<el-radio-group v-model="tabPosition" style="position:absolute;left: 100px;top: 21px;">-->
        <!--<el-radio-button label="首页">攻略首页</el-radio-button>-->
        <!--<el-radio-button label="攻略库"><p id="gonglueku" @click="togonglue">攻略库</p></el-radio-button>-->
        <!--<el-radio-button label="发布攻略" ><p id="fabu" @click="toLogin">发布攻略</p></el-radio-button>-->
      <!--</el-radio-group>-->
    </div>
    <div>
      <!--推荐-->
      <!--<el-tabs tab-position="left" style="height: 200px;background-color: #fff;position:absolute;top: 100px;">-->
        <!--<el-tab-pane label="当季推荐">-->
          <!--<div style="background-color: dodgerblue;width: 200px;height: 200px;float: left">-->
            <!--<span>这里是图片 </span>-->
          <!--</div>-->
          <!--<div style="background-color: darksalmon;width:400px;height: 200px;float: left">-->
            <!--<span>这里是图片</span>-->
          <!--</div>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label=国内游>还没想好怎么弄这里</el-tab-pane>-->
        <!--<el-tab-pane label="国外游">还没想好怎么弄这里</el-tab-pane>-->
      <!--</el-tabs>-->

      <!--轮播图-->
      <el-carousel :interval="4000" type="card" height="300px" style="position:absolute;top: 80px;width: 100%">
        <el-carousel-item v-for="item in imagebox" :key="item.sId">
          <img :src="item.sCover" style=" width:100%;height:100%;display:block;" @click="toMain(item.sId)">
          <!--<img :src="item.src" style=" width:100%;height:100%;display:block;" >-->
          <!--<span>chuntianhenmei</span>-->
        </el-carousel-item>
      </el-carousel>

      <!--显示攻略-->
      <div name="showstrategy" style="position: absolute;top: 410px;width: 960px">

        <!--循环显示-->
        <div style="margin-left:200px " v-for="(strategy,index) in strategylist">
          <!--显示头像-->
          <div  name="touxiang" style="float: left">
            <img class="touxiang" :src=strategy.sMasterUrl @click="test" style="cursor:pointer">
          </div>

          <!--显示标题-->
          <div name="maininfo"  style="float: left;width: 650px;">
            <div style="text-align: left" >
              <span  :id="index" class="titlecss" :style="titlefontcolor"
                     @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"
                     @click="toMain(strategy.sId)">
                {{strategy.sName}}</span>
              <!--<a :id="index" class="titlecss" :style="titlefontcolor"-->
              <!--@mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"-->
              <!--@click="toMain(strategy.sId)">-->
              <!--{{strategy.sName}}-->
              <!--</a>-->

            </div>
          </div>
          <!--显示标题下一行-->
          <div style="text-align: left;float: left;width: 670px;height: 20px;font-size: 10px;margin-top: 5px">
            <div style="float: left;">
              <!--<span style="margin-left: 15px;">唐伯虎2012 &nbsp;</span>-->
              <el-link type="primary" style="margin-left: 15px;font-size: 10px">{{strategy.sMasterName}}</el-link>
              <span>{{strategy.sGotime}}出发&nbsp;|&nbsp;</span>
              <span>共{{strategy.sDay}}天&nbsp;|&nbsp;</span>
              <span>人均{{strategy.sPay}}元</span>
            </div>
            <div style="float: right">
              <span class="el-icon-view">{{strategy.sLookNum}}</span>
              <span class="el-icon-magic-stick">{{strategy.sCliNum}}</span>
            </div>
          </div>
          <!--显示攻略的四张图片-->
          <div name="pic" style="width: 700px;float: left;margin-left: 70px;">
            <img alt="加载失败" :src=strategy.sPics[0]
                 style="cursor:pointer;width: 160px;height: 122px" @click="toMain(strategy.sId)">
            <img alt="加载失败" :src=strategy.sPics[1]
                 style="cursor:pointer;width: 160px;height: 122px" @click="toMain(strategy.sId)">
            <img alt="加载失败"  :src=strategy.sPics[2]
                 style="cursor:pointer;width: 160px;height: 122px" @click="toMain(strategy.sId)">
            <img alt="加载失败" :src=strategy.sPics[3]
                 style="cursor:pointer;width: 160px;height: 122px" @click="toMain(strategy.sId)">
            <el-divider></el-divider>

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
      </div>

    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "TestMain",
      data(){
        return{
          activeName:'first',
          inputvalue:'',
          dengluurl:'/login',
          denglu:'',
          titlefontcolor:'color:black',
          strategylist:[],
          tabPosition: 'left',
          status:'',
          pagetotal:1,
          currentpage:1,
          start:'',
          imagebox:[{id:0,src:'http://127.0.0.1/fbb6f7de-e510-4861-b639-53331d4943a8.png'},
            {id:1,src:'http://127.0.0.1/22ccce8a-d4cb-43ca-9794-da981b011289.jpg'},
            {id:2,src:'http://127.0.0.1/10b68f1f-9fd8-435b-adfc-8cbdae99eb4d.png'}]

        }
      },
      computed:{
        ...mapGetters(['getUser']),
        ...mapGetters(['getFuzzyName']),
      },

      methods:{
        ...mapActions(['setFuzzyName']),

        getActive(){
          let _vm=this
          this.service.post("/manage/active/selectChecked.do",{

          }).then(function (response) {
            if(response.data.status==0){
            _vm.imagebox=response.data.data
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        usertoexit(){
          let _vm=this
          this.service.post("/manage/user/exit.do",{

          }).then(function (response) {
            if(response.data.status==0){
              _vm.$message({
                type:"success",
                message:"退出成功"
              })
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        AddLookNum(sId){
          console.log("nimabide")
          this.service.post("/manage/strategy/updateLookNum.do",{
            //  params:
            "sId":sId
            //  }
          }).then(function (response) {
            if(response.status==200){

            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        handleClick(tab, event) {

          if(tab.label=="首页"){

          }else if (tab.label=="攻略库"){
            this.$router.push("/TestStore");
          }else if(tab.label=="发布攻略"){
            this.$router.push("/edit");
          }

        },
        fuzzyselect(currentpage){
          this.getfuzzynum();
          var start = (currentpage-1)*10;
          var _vm=this;
          this.service.post("/manage/strategy/fuzzyselect.do",{
            //  params:
            "name":this.inputvalue,
            "start":start
            //  }
          }).then(function (response) {
            console.log("获取攻略======"+response);
            if(response.status==200){
              _vm.strategylist=response.data.data;
              console.log("====response.data.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },

        togonglue(){
          this.$router.push("/StrategyStore")
        },
        toLogin(){
          if(JSON.stringify( this.getUser)=='{}'){
            //未登录
            this.$router.push("/login");
          }else{
            //已登录
            this.$router.push("/edit");
          }

        },
        toMain(strategyId){
          this.AddLookNum(strategyId);
          let routeData = this.$router.resolve({
            path:'/show/'+strategyId,
          });
          window.open(routeData.href, '_blank');
        },
        handleCurrentChange: function(currentPage) {
          this.currentpage = currentPage;
          console.log(this.currentpage); //点击第几页
          if(this.getFuzzyName!=''){
            this.fuzzyselect(currentPage);
          }else{
            this.getData(currentPage);
          }

        },
        mouseLeave(index){
          document.getElementById(index).style.color="black";
        },
        mouseOver(index){
          document.getElementById(index).style.color="#409EFF";
        },
        test(){
          this.$message("11");
        },
        getData( currentpage){
          var _vm=this;
          var start = (currentpage-1)*10;
          this.service.post("/manage/strategy/fenyeselect.do",{
            //  params:
            "start":start,
            //  }
          }).then(function (response) {
            console.log(response);
            if(response.status==200){
              _vm.strategylist=response.data.data;
              console.log("====response.data.data="+response.data.data);
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getstragetynum(){
          var _vm=this;
          this.service.post("/manage/strategy/selectcountall.do",{
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
        getfuzzynum(){
          var _vm=this;
          this.service.post("/manage/strategy/countfuzzyselect.do",{
            "name":this.inputvalue
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
        toMyZone(){
          if(JSON.stringify( this.getUser)=='{}'){
            //未登录
            this.$router.push("/login");
          }else{
            //已登录
            this.$router.push("/MyZone");
          }
        },
        denglutologin(){
          if(JSON.stringify( this.getUser)=='{}' &&this.denglu=="登录"){
            //未登录
            this.$router.push("/login");
          }
        }
      },
      created(){
        this.getData(this.currentpage);
        this.getstragetynum();
        this.getActive();

      },
      mounted() {
        if(JSON.stringify( this.getUser)=='{}'){
          //未登录
          // this.$message("weidenglu")

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
  .titlecss{
    cursor:pointer;width: 680px; overflow-wrap:break-word;
    font-size: 20px;margin-left: 15px;font-weight: bold
  }
  .touxiang{
    width: 80px;
    height: 80px;

  }
  *{margin:0; padding:0;}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-tabs__item {
    font-size: 18px !important;
  }


</style>
