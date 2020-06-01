<template>
  <el-form ref="form" :model="form"  >
    <div style="width: 100%;height:8%;text-align: end;background-color: 	#00C5CD">

    </div>
    <div style="height:92%;overflow: auto; ">

      <div :style="{backgroundImage:imageUrl}" class="picsize" style="text-align:left;position:relative;">
        <img class="touxiang" :src=form.userUrl alt="加载失败">
        <span class="title-config">{{form.title}}</span>
      </div>
      <div style="width: 100%;height: 50px;text-align:left; position: relative">
        <!--<img class="touxiang" src="http://127.0.0.1/touxiang.jpg">-->
        <div style="position: absolute;left: 300px;top: 10px;">
          <a style="color: dodgerblue;font-size: 10px" >{{form.username}} &nbsp;</a>
          <span style="font-size: 10px">创建于{{form.addTime.split(" ")[0]}}  |</span>
          <span style="font-size: 10px">浏览 {{form.looknum}}</span>

        </div>

      </div>

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

          </div>

        </div>
      </div>

      <div style="overflow:auto; text-align:center;"  >
        <!--显示html-->
        <div style="margin-left: 280px;"
             class="ql-editor" v-html="form.content">
        </div>
      </div>
    </div>

    <div style="margin-left: 800px">
      <el-button type="danger " @click="btnclick(0)">驳回</el-button>
      <el-button type="success " @click="btnclick(1)">通过</el-button>

    </div>

  </el-form>
</template>

<script>
    export default {
        name: "StrategyShowAdmin",
      data(){
        return {
          loading: false,
          timer: null,
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
            username:'',
            userUrl:'',
          },

        }
      },
      methods:{
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
            }else{
              console.log("=======aaaaaa=======")
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        btnclick(value){
          if (value==1){
            let _vm=this
            this.service.post("/sys/strategy/sysUpdateStatus.do",{
              //  params:
              "strategyId":this.strategyId,
              //  }
            }).then(function (response) {
              console.log(response);
              if(response.data.status==0){
                _vm.$message({
                  message: '审核通过',
                  type: 'success'
                })
                _vm.timer = setTimeout(() => {
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    _vm.$router.push('/SysAdmin');
                    //window.opener=null;window.close()
                  }, 200);
                }, 500);
              }else{
                _vm.$message.error('失败');
              }
            }).catch(function (error) {
              console.log(error);
            });

          }else{
            this.$message.error('审核未通过');
            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
                this.$router.push('/SysAdmin');
                //window.opener=null;window.close()
              }, 200);
            }, 500);
          }
          }

      },
      created() {
        this.strategyId=this.$route.params.sId
        this.getData();

      },
    }
</script>

<style >
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
