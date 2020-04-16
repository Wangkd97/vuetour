<template>

  <div name="main">
    <div style="width: 100%;height:8%;text-align: end;background-color: #00C5CD;">
      <strong><el-link id="denglu" :underline="false" style="font-size: 15px" :href=dengluurl></el-link>{{denglu}}</strong>
      <span> | 我的空间</span>
      <span> | 退出</span>
    </div>
    <!--菜单栏-->
    <div style="width: 100%;height: 60px;background-color: dodgerblue">
      <el-input v-model="inputvalue"
                prefix-icon="el-icon-search"
                placeholder="请输入内容"
                @change="fuzzyselect"
                style="position: absolute;top: 21px; left: 550px;width: 250px"
      >
      </el-input>
      <el-radio-group v-model="tabPosition" style="position:absolute;left: 100px;top: 21px;">
        <el-radio-button label="首页"><p id="shouye" @click="toshouye">攻略首页</p></el-radio-button>
        <el-radio-button label="攻略库">攻略库</el-radio-button>
        <el-radio-button label="发布攻略" ><p id="fabu" @click="toLogin">发布攻略</p></el-radio-button>
      </el-radio-group>
    </div>


    <div name="classify" style="">
      <!--月份-->
      <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 35px">
        <div style="float: left;width: 60px;">
          <span class="tag-group__title">月份</span>
        </div>
        <div style="float: left;width: 500px;" align="left" >
          <el-tag
            style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
            size="mini"
            v-for="item in monthitems"
            :key="item.label"
            :type="item.type"
            :color="item.color"
            @click="monthtagclick(item)"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </div>
      <br>
      <!--天数-->
      <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 15px">
        <div style="float: left;width: 60px;">
          <span class="tag-group__title">天数</span>
        </div>
        <div style="float: left;width: 500px;" align="left" >
          <el-tag
            style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
            size="mini"
            v-for="item in daysitems"
            :key="item.label"
            :type="item.type"
            :color="item.color"
            @click="daytagclick(item)"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </div>
      <br>
      <!--费用-->
      <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 15px">
        <div style="float: left;width: 60px;">
          <span class="tag-group__title">费用</span>
        </div>
        <div style="float: left;width: 500px;" align="left" >
          <el-tag
            style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
            size="mini"
            v-for="item in payitems"
            :key="item.label"
            :type="item.type"
            :color="item.color"
            @click="paytagclick(item)"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </div>
      <br>
      <!--人物-->
      <div class="tag-group"  style="width: 560px; margin-left: 400px;margin-top: 15px;">
        <div style="float: left;width: 60px;">
          <span class="tag-group__title" style="margin-left: 0px;">人物</span>
        </div>
        <div style="float: left;width: 500px;" align="left" >
          <el-tag
            style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
            size="mini"
            v-for="item in peopletagitems"
            :key="item.label"
            :type="item.type"
            :color="item.color"
            @click="peopletagclick(item)"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </div>
      <br><br><br>
      <!--玩法-->
      <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 15px">
        <div style="float: left;width: 60px;">
          <span class="tag-group__title">玩法</span>
        </div>
        <div style="float: left;width: 500px;" align="left" >
          <el-tag
            style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
            size="mini"
            v-for="item in playtagitems"
            :key="item.label"
            :type="item.type"
            :color="item.color"
            @click="playtagclick(item)"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </div>

    </div>

    <!--显示攻略-->
    <div name="showstrategy" style="position: absolute;top: 450px;width: 960px">

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
            <span>人均{{strategy.sPay}}元 |</span>
            <span>{{strategy.sPeople}} |</span>
            <span>{{strategy.sPlay[0]}} </span>

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



</template>


<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "StrategyStore",
        data(){
          return {
            inputvalue:'',
            dengluurl:'',
            denglu:'',
            tabPosition: 'left',
            monthtagId:'0',
            daytagId:'0',
            paytagId:'0',
            peopletagId:'-1',
            playtagId:'-1',
            tagcolor:'',
            monthitems:[],
            daysitems:[],
            payitems:[],
            peopletagitems: [],
            playtagitems: [],

            titlefontcolor:'color:black',
            strategylist:[],
            pagetotal:0,
            currentpage:1,
            start:1,

          }

        },
      methods:{
        geifenleinum(){
           var _vm=this;
           this.service.post("/manage/strategy/countfenleiall.do",{
             "month":this.monthtagId,
             "day":this.daytagId,
             "pay":this.paytagId,
             "people":this.peopletagId,
             "play":this.playtagId,
           }).then(function (response) {
             if(response.status==200){
               _vm.pagetotal=response.data.data;
             }else{
               console.log("=======aaaaaa=======")
             }
           }).catch(function (error) {
             console.log(error);
           });
         },
        fenleiselect(currentPage){
          this.geifenleinum();
          var start = (currentPage-1)*10;
          var _vm=this;
          this.service.post("/manage/strategy/fenleiselect.do",{
            "month":this.monthtagId,
            "day":this.daytagId,
            "pay":this.paytagId,
            "people":this.peopletagId,
            "play":this.playtagId,
            "start":start
          }).then(function (response) {
              console.log(response)
            if(response.status==200){
                console.log("分类===="+response.data.data)
              _vm.strategylist=response.data.data;
            }else{
            }
          }).catch(function (error) {
            console.log(error);
          });
          },
        fuzzyselect(){
          this.chongzhitag();
          this.getfuzzynum();
          var start = (this.currentpage-1)*10;
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
        iflogin(){
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
          },
        toshouye(){
            this.$router.push("/StrategyMain")
          },
        test(){
          this.$message("11");
        },
        toMain(strategyId){
          let routeData = this.$router.resolve({
            path:'/show/'+strategyId,
          });
          window.open(routeData.href, '_blank');
        },
        getmonth(){
          this.monthitems=[ { type: '', label: '全部',id:0,color:'#efd576' },
            { type: '', label: '1-3月',id:1,color:'' },
            { type: '', label: '4-6月' ,id:2,color:''},
            { type: '', label: '7-9月' ,id:3,color:''},
            { type: '', label: '10-12月', id:4,color:''}]
        },
        getday(){
          this.daysitems=[{ type: '', label: '全部',id:0,color:'#efd576' },
            { type: '', label: '1-3天',id:1 ,color:''},
            { type: '', label: '4-7天' ,id:2,color:''},
            { type: '', label: '8-10天' ,id:3,color:''},
            { type: '', label: '11-15天', id:4,color:''},
            { type: '', label: '15天以上', id:5,color:''}]
        },
        getpay(){
          this.payitems=[{ type: '', label: '全部',id:0 ,color:'#efd576'},
            { type: '', label: '1-999',id:1 ,color:''},
            { type: '', label: '1000-2999' ,id:2,color:''},
            { type: '', label: '3000-4999' ,id:3,color:''},
            { type: '', label: '5000-9999', id:4,color:''},
            { type: '', label: '10000以上', id:5,color:''}]
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
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage); //点击第几页
          if(this.monthtagId!='0'||this.daytagId!='0'||this.paytagId!='0'||this.peopletagId!='-1'||this.playtagId!='-1'){
            this.fenleiselect(currentPage);
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
        toLogin(){
          if(JSON.stringify( this.getUser)=='{}'){
            //未登录
            this.$router.push("/login");
          }else{
            //已登录
            this.$router.push("/edit");
          }

        },
        getplay(){
          var _vm=this
          this.service.post("/manage/strategy/play/getmodifyplay.do",{
          }).then(function (response) {
            console.log("playresponse==="+response);
            if(response.data.status==0&&response.data.wrongMsg==null){

              _vm.playtagitems=response.data.data
            }else{

            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        getpeople(){
          var _vm=this
          this.service.post("/manage/strategy/people/getmodifypeople.do",{
          }).then(function (response) {
            if(response.data.status==0&&response.data.wrongMsg==null){
              _vm.peopletagitems=response.data.data
            }else{
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        monthtagclick(item){
          for( let i=0;i< this.monthitems.length;i++){
            this.monthitems[i].color=''
          }
          item.color="#efd576"
          this.monthtagId=item.id
          this.fenleiselect(this.currentpage);
        },
        daytagclick(item){
          for( let i=0;i< this.daysitems.length;i++){
            this.daysitems[i].color=''
          }
          item.color="#efd576"
          this.daytagId=item.id
          this.fenleiselect(this.currentpage);
        },
        paytagclick(item){
          for( let i=0;i< this.payitems.length;i++){
            this.payitems[i].color=''
          }
          item.color="#efd576"
          this.paytagId=item.id
          this.fenleiselect(this.currentpage);
        },
        peopletagclick(item){
          for( let i=0;i< this.peopletagitems.length;i++){
            this.peopletagitems[i].color=''
          }
          item.color="#efd576"
          this.peopletagId=item.id
          this.fenleiselect(this.currentpage);
        },
        playtagclick(item){
          for( let i=0;i< this.playtagitems.length;i++){
            this.playtagitems[i].color=''
          }
          item.color="#efd576"
          this.playtagId=item.id
          this.fenleiselect(this.currentpage);
        },
        chongzhitag(){
          for( let i=0;i< this.playtagitems.length;i++){
            this.playtagitems[i].color=''
          }
          this.playtagitems[0].color="#efd576"
          for( let i=0;i< this.peopletagitems.length;i++){
            this.peopletagitems[i].color=''
          }
          this.peopletagitems[0].color="#efd576"
          for( let i=0;i< this.payitems.length;i++){
            this.payitems[i].color=''
          }
          this.payitems[0].color="#efd576"
          for( let i=0;i< this.daysitems.length;i++){
            this.daysitems[i].color=''
          }
          this.daysitems[0].color="#efd576"
          for( let i=0;i< this.monthitems.length;i++){
            this.monthitems[i].color=''
          }
          this.monthitems[0].color="#efd576"
        },

      },
      mounted(){
          this.getday(),
          this.getpay(),
          this.getmonth(),
        this.iflogin()
      },
      created(){
        this.getplay(),
          this.getpeople(),
        this.getData(this.currentpage);
        this.getstragetynum();

      },
      computed:{
        ...mapGetters(['getUser']),
        ...mapGetters(['getFuzzyName']),
      },
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
</style>
