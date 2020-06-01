<template>
  <el-form ref="form" :model="form"  >
    <div style="width: 100%;height:8%;text-align: end;background-color: 	#00C5CD">
      <strong style="cursor: pointer" @click="denglutologin"><el-link id="denglu" :underline="false" style="font-size: 15px;cursor: pointer" :href=dengluurl></el-link>{{denglu}}</strong>
      <span style="cursor: pointer" @click="toMyZone"> | 我的空间</span>
      <span> | 退出</span>
    </div>
    <div style="height:92%;overflow: auto; ">
          <div :style="{backgroundImage:imageUrl}" class="picsize" style="text-align:left;position:relative;">
            <img class="touxiang" :src=form.userUrl alt="加载失败">
            <span class="title-config">{{form.title}}</span>

            <el-tooltip content="赞" placement="top" effect="light">
              <el-button  id="btnzan" class="iconfont icon-dianzan1" circle style=" width: 70px;height: 70px;
              margin-left: 1100px;bottom: 10px;position:absolute;font-size: 50px;color:
              dodgerblue; cursor: pointer" @click="dianzan">
              </el-button>
            </el-tooltip>

          </div>
      <!--背景图片下面的一行-->
      <div style="width: 100%;height: 50px;text-align:left; position: relative">
          <!--<img class="touxiang" src="http://127.0.0.1/touxiang.jpg">-->
        <div style="position: absolute;left: 300px;top: 10px;">
          <a style="color: dodgerblue;font-size: 10px" >{{form.username}} &nbsp;</a>
          <span style="font-size: 10px">创建于{{form.addTime.split(" ")[0]}}  |</span>
          <span style="font-size: 10px">浏览 {{form.looknum}}</span>

        </div>

      </div>

      <!--攻略的简要信息-->
      <div class="" style=" width:100%;height: 150px;text-align:left; position: relative" >

          <div class="" style=" width:680px;height: 100px; background-color:#F5F5F5;position: absolute;left: 300px; top: 10px;" >
            <div style="position: absolute;left: 10px; top: 10px;width:500px;height: 100px;">
              <i class="iconfont icon-icon-test1" style="font-size: 20px" > </i>
              <span>出发日期 /</span>
              <span class="fontcolor" >{{form.time}}</span>

              &nbsp;&nbsp;
              <span><i class="iconfont icon-icon-test" style="font-size: 20px"></i> 游玩天数 /</span>
              <span class="fontcolor" > {{form.daynum}}</span>
              <span>天</span>
              &nbsp;&nbsp;
              <span> <i class="iconfont icon-jinqian" style="font-size: 20px"></i>  人均 / </span>
              <span class="fontcolor" > {{form.pay}}</span>
              <span>元</span>
              <br><br>
              <span> <i class=" el-icon-position" style="font-size: 20px"></i> 玩法 /  </span>
              <span class="fontcolor" > {{form.speople}} &nbsp;{{form.sseason}} &nbsp;{{form.splay}}</span>
            </div>

          </div>
      </div>

      <div style="overflow:auto; text-align:center;"  >
          <!--显示html-->
          <div style="margin-left: 280px;"
               class="ql-editor" v-html="form.content">
          </div>
        </div>
      <br>
      <!--显示点赞-->
      <div >
        <i id="zan"
          class="iconfont icon-dianzan1"
             style=" width: 30px;height: 30px;font-size: 30px;color:
              dodgerblue; cursor: pointer;margin-left: -700px"
              @click="dianzan" ></i>
        <span>{{form.clicknum}}</span>
      </div>
      <div style=" text-align:left; margin-left: 300px ;">
        <span style="font-size: 20px">最新评论</span> <span>({{form.commentnum}})条</span>
      </div>
      <br>
      <!--显示发表评论-->
      <div style=" text-align:left; margin-left: 300px ;top: 20px;">

        <div style=" width:680px; background-color:#F5F5F5;left: 300px; top: 10px;">
          <div  name="touxiang" style="float: left;margin: 10px;margin-left: 30px">
            <img v-if="iflogin==1"   class="" :src=this.user.uPic @click="" style="cursor:pointer;width: 40px;height: 40px">
            <img v-else="iflogin==0"   class="" :src=youkeurl @click="" style="cursor:pointer;width: 40px;height: 40px">
           <br>
            <span  v-if="iflogin==1" style="width: 50px;font-size: 10px">{{user.uName}}</span>
            <span v-else="iflogin==0" style="width: 50px;font-size: 10px">游客</span>
          </div>
          <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-input
              id="replyInput"
              @focus="showReplyBtn"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4}"
              :show-word-limit="istrue"
              maxlength="100"
              placeholder="请输入评论内容"
              v-model="replyComment" style="width: 500px;margin-left: 60px;margin: 10px">
            </el-input>
            <br>
            <el-button type="warning" size="mini" style="margin-left: 560px" @click="sendComment" >发表</el-button>
          </div>


        </div>
        <!--显示已经发表的评论-->
        <div style="width: 680px;left: 300px;">

          <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
            <div class="author-info">
              <span class="author-name">{{item.name}}</span>
              <span class="author-time">{{item.time}}</span>
            </div>
            <div class="icon-btn">
              <span @click="showReplyInput(i,item.name,item.uId,item.id)"><i class="el-icon-chat-dot-square"></i>{{item.commentNum}}</span>
             &nbsp;<span v-if="item.uId==user.uId" @click="delectComment(item.id)"> <i class="el-icon-delete"></i></span>


            </div>
            <div class="talk-box">
              <p>
                <span class="reply">{{item.comment}}</span>
              </p>
            </div>
            <div class="reply-box">
              <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
                <div class="author-info">
                  <span class="author-name">{{reply.from}}</span>
                  <span class="author-time">{{reply.time}}</span>
                </div>
                <div class="icon-btn">
                  <span @click="SecondshowReplyInput(i,reply.from,reply.fromId,reply.ccId)"><i class="el-icon-chat-dot-square"></i>{{reply.commentNum}}</span>
                  &nbsp;<span v-if="reply.fromId==user.uId" @click="delectComment(reply.cId)"> <i class="el-icon-delete"></i></span>
                </div>
                <div class="talk-box">
                  <p>
                    <span>回复 {{reply.to}}:</span>
                    <span class="reply">{{reply.comment}}</span>
                  </p>
                </div>
                <div class="reply-box">
                </div>
              </div>
            </div>
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
              <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
              <div class="reply-info" >
                <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
              </div>
              <div class=" reply-btn-box">
                <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">发表评论</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </el-form>

</template>

<script>

  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
	import editor from '@/pages/edit/Editor'

  const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.vueClickOutside = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.vueClickOutside);
      delete el.vueClickOutside;
    },
  };
	export default{
		name:"StrategyEdit",
		props:['psMsg'],
		data(){
			return {

        btnShow: false,
        index:'0',
        replyComment:'',
        myName:'Lana Del Rey',
        myHeader:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        myId:19870621,
        to:'',
        toId:-1,
        comments:[],
        cId:-1,


        istrue:true,
			  iflogin:0,
			  youkeurl:'http://127.0.0.1/123.png',
        textarea: '',
        dengluurl:'',
        denglu:'',
          strategyId:1,
          imageUrl:'',
          dynamicTags: [],
          drawer: false,
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
            clicknum:'',
            commentnum:'',
            username:'',
            userUrl:'',
            speople:'',
            sseason:'',
            splay:'',
            smasterId:'',
          },
				  user:{},
			}
		},
    directives: {clickoutside},
		methods:{
      ...mapActions(['setUserInfo']),
      inputFocus(){
        var replyInput = document.getElementById('replyInput');
        replyInput.style.padding= "8px 8px"
        replyInput.style.border ="2px solid #409EFF"
        replyInput.focus()
      },
      showReplyBtn(){
        this.btnShow = true
      },
      hideReplyBtn(){
        this.btnShow = false
        replyInput.style.padding= "10px"
        replyInput.style.border ="none"
      },
      showReplyInput(i,name,id,cId){
        this.comments[this.index].inputShow = false
        this.index =i
        this.comments[i].inputShow = true
        this.to = name
        this.toId = id
        this.cId=cId
      },
      SecondshowReplyInput(i,name,id,cId){
        this.comments[this.index].inputShow = false
        this.index =i
        this.comments[i].inputShow = true
        this.to = name
        this.toId = id
        this.cId=cId
      },
      _inputShow(i){
        return this.comments[i].inputShow
      },
      sendComment(){
        if (this.iflogin==1) {
          if (!this.replyComment) {
            this.$message({
              showClose: true,
              type: 'warning',
              message: '评论不能为空'
            })
          } else {
            let a = {}
            let input = document.getElementById('replyInput')
            let timeNow = new Date().getTime();
            let time = this.dateStr(timeNow);
            a.name = this.myName
            a.comment = this.replyComment
            a.headImg = this.myHeader
            a.time = time
            a.commentNum = 0
            a.like = 0
            this.comments.push(a)

            input.innerHTML = '';
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();//获取系统时间
            var minute = date.getMinutes(); //分
            var second = date.getSeconds();//秒
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            if(hour<10){
              hour="0"+hour;
            }
            if (minute<10){
              minute="0"+minute;
            }
            if (second<10){
              second="0"+second;
            }
            var nowDate = year + "-" + month + "-" + day +" "+hour+":"+minute+":"+second ;

            var _vm=this;
            this.service.post("/manage/comment/insertComment.do",{
              //  params:
              "sId":this.strategyId,
              "cText":this.replyComment,
              "cTime":nowDate,
              "uId":this.form.smasterId,
              "cuId":this.user.uId,
              "ccId":0,

              //  }
            }).then(function (response) {
              console.log(response);
              if(response.data.status==0){
                _vm.replyComment = ''
                _vm.getCommentData()
              }else{

              }
            }).catch(function (error) {
              console.log(error);
            });


          }
        }else
          {
            this.$message({
              showClose: true,
              type: 'warning',
              message: '请先进行登录'
            })
          }

      },
      sendCommentReply(i,j){
        if(this.iflogin==1){
          if(!this.replyComment){
            this.$message({
              showClose: true,
              type:'warning',
              message:'评论不能为空'
            })
          }else{
            let a ={}
            let timeNow = new Date().getTime();
            let time= this.dateStr(timeNow);
            a.from= this.myName
            a.to = this.to
            a.fromHeadImg = this.myHeader
            a.comment =this.replyComment
            a.time = time
            a.commentNum = 0
            a.like = 0
            this.comments[i].reply.push(a)

            document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();//获取系统时间
            var minute = date.getMinutes(); //分
            var second = date.getSeconds();//秒
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            if(hour<10){
              hour="0"+hour;
            }
            if (minute<10){
              minute="0"+minute;
            }
            if (second<10){
              second="0"+second;
            }
            var nowDate = year + "-" + month + "-" + day +" "+hour+":"+minute+":"+second ;

            var _vm=this;
            this.service.post("/manage/comment/insertComment.do",{
              //  params:
              "sId":this.strategyId,
              "cText":this.replyComment,
              "cTime":nowDate,
              "uId":this.toId,
              "cuId":this.user.uId,
              "ccId":this.cId,

              //  }
            }).then(function (response) {
              console.log(response);
              if(response.data.status==0){
                _vm.replyComment = ''
                _vm.getCommentData()
              }else{

              }
            }).catch(function (error) {
              console.log(error);
            });



          }
        }else{
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请先进行登录'
          })
        }

      },
      onDivInput: function(e) {
        this.replyComment = e.target.innerHTML;
      },
      dateStr(date){
        //获取js 时间戳
        var time=new Date().getTime();
        //去掉 js 时间戳后三位，与php 时间戳保持一致
        time=parseInt((time-date)/1000);
        //存储转换值
        var s;
        if(time<60*10){//十分钟内
          return '刚刚';
        }else if((time<60*60)&&(time>=60*10)){
          //超过十分钟少于1小时
          s = Math.floor(time/60);
          return  s+"分钟前";
        }else if((time<60*60*24)&&(time>=60*60)){
          //超过1小时少于24小时
          s = Math.floor(time/60/60);
          return  s+"小时前";
        }else if((time<60*60*24*30)&&(time>=60*60*24)){
          //超过1天少于30天内
          s = Math.floor(time/60/60/24);
          return s+"天前";
        }else{
          //超过30天ddd
          var date= new Date(parseInt(date));
          return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
        }
      },
      getCommentData(){
        var _vm=this;
        this.service.post("/manage/comment/getComment.do",{
          //  params:
          "sId":this.strategyId,
          //  }
        }).then(function (response) {
          console.log(response);
          if(response.data.status==0){
            _vm.comments=response.data.data
          }else{
            console.log("=======aaaaaa=======")
          }
        }).catch(function (error) {
          console.log(error);
        });
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
           _vm.getCommentData()
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

      dianzan(){
        this.form.clicknum++;
        document.getElementById("zan").style.color="#409EFF";
        document.getElementById("btnzan").style.color="#409EFF";
        var _vm=this;
        this.service.post("/manage/strategy/updateClickNum.do",{
          "sId":this.strategyId,
        }).then(function (response) {
          console.log(response);
          if(response.data.status==0){
            _vm.clicknum++;
          }else{
            _vm.$message({
              type:"warning",
              message:"点赞失败"
            })
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
      },
		  togetUser(){
        var _vm=this;
        this.service.post("/manage/user/getUser.do",{

        }).then(function (response) {
          console.log(response);
          if(response.data.status==0){
            _vm.setUserInfo(response.data.data)
            _vm.user=response.data.data;
            _vm.denglu=_vm.user.uName
            _vm.iflogin=1;
            _vm.myName=_vm.user.uName
            _vm.myHeader = _vm.user.uPic
            _vm.myId = _vm.user.uId
            console.log("user======"+_vm.user);
          }else{
            console.log("=======aaaaaa=======")
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      mouseLeave(){
        document.getElementById("zan").style.color="black";
      },
      mouseOver(){
        document.getElementById("zan").style.color="#409EFF";
      },
		getData(){
		  var _vm=this;
      this.service.post("/manage/strategy/selectbyid.do",{
        //  params:
        "id":_vm.strategyId,
        //  }
      }).then(function (response) {
        console.log(response);
        if(response.data.status==0){
          _vm.form.title=response.data.data.data.sName;
          _vm.form.content=response.data.data.data.sText;
          _vm.form.time=response.data.data.data.sGotime;
          _vm.form.addTime=response.data.data.data.sTime;
          _vm.form.pay =response.data.data.data.sPay;
          _vm.form.daynum=response.data.data.data.sDay;
          _vm.form.looknum=response.data.data.data.sLookNum;
          _vm.imageUrl=response.data.data.data.sCover;
          _vm.imageUrl='url('+_vm.imageUrl+')';
          _vm.form.username=response.data.data.data.sMasterName;
          _vm.form.userUrl=response.data.data.data.sMasterUrl;
          _vm.form.speople=response.data.data.data.sPeople;
          _vm.form.splay=response.data.data.data.sPlay[0];
          _vm.form.sseason=response.data.data.data.sSeason;
          _vm.form.clicknum=response.data.data.data.sCliNum;
          _vm.form.commentnum=response.data.data.data.sComNum;
          _vm.form.smasterId=response.data.data.data.sMasterId;
        }else{
          console.log("=======aaaaaa=======")
        }
      }).catch(function (error) {
        console.log(error);
      });
		},
	},
		components:{
			editor
		},
		created() {
		  this.togetUser();
      this.strategyId=this.$route.params.id
			this.getData();
    this.getCommentData();
		},
    computed:{
      ...mapGetters(['getUser']),
    },
    mounted(){

      if(JSON.stringify( this.getUser)=='{}'){
        //未登录
        // this.$message("weidenglu")

     //   this.denglu="登录"
        this.denglu=this.user.uName
        this.dengluurl="http://127.0.0.1:8080/#/login"
      }else{
        //已登录
        //  this.$message("user=="+this.getUser)
        this.denglu=this.getUser.uName
        this.dengluurl="http://127.0.0.1:8080/#/main"
      }
    },
	}
</script>

<style  lang="stylus" >
  .my-reply
    padding 10px
    background-color #fafbfc
    .header-img
      display inline-block
      vertical-align top
    .reply-info
      display inline-block
      margin-left 5px
      width 90%
      @media screen and (max-width:1200px) {
        width 80%
      }
      .reply-input
        min-height 20px
        line-height 22px
        padding 10px 10px
        color #ccc
        background-color #fff
        border-radius 5px
        &:empty:before
          content attr(placeholder)
        &:focus:before
          content none
        &:focus
          padding 8px 8px
          border 2px solid blue
          box-shadow none
          outline none
    .reply-btn-box
      height 25px
      margin 10px 0
      .reply-btn
        position relative
        float right
        margin-right 15px
  .my-comment-reply
    margin-left 50px
    .reply-input
      width flex
  .author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
  .author-title
    padding 10px
    .header-img
      display inline-block
      vertical-align top
    .author-info
      display inline-block
      margin-left 5px
      width 60%
      height 40px
      line-height 20px
      >span
        display block
        cursor pointer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .author-name
        color #000
        font-size 18px
        font-weight bold
      .author-time
        font-size 14px
    .icon-btn
      width 30%
      padding 0 !important
      float right
      @media screen and (max-width : 1200px){
        width 20%
        padding 7px
      }
      >span
        cursor pointer
      .iconfont
        margin 0 5px
    .talk-box
      margin 0 50px
      >p
        margin 0
      .reply
        font-size 16px
        color #000
    .reply-box
      margin 10px 0 0 50px
      background-color #efefef



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
