<template>
	<el-form ref="form" :model="form"  >
    <div style="width: 100%;height: 25px;text-align: end;background-color: 	#00C5CD">

        <strong>{{this.getUser.uName}}</strong>
      <span> | 我的空间</span>
      <span> | 退出</span>
    </div>
		<div style="height: 100%;overflow: auto;">
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="changeImg"
         >
          <img v-if="imageUrl" :src="imageUrl"   class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: small">请添加封面图片</i>
        </el-upload>
      </el-form-item>
      <el-form-item >
        <el-input v-model="form.title"  placeholder="为攻略起个好听的名字" style="width: 60%;"></el-input>
      </el-form-item>
      <el-form-item >
          <div style="overflow:auto; text-align:center"  >
            <!-- 图片上传组件辅助-->
            <el-upload
              id="Pic"
              class="avatar-uploader"
              :action="serverUrl"
              name="uploadfile"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
            </el-upload>
            <!--富文本编辑器组件-->
            <el-row v-loading="quillUpdateImg">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                style="width:80%; margin-left: 10%;margin-right: 10%"
              >
              </quill-editor>
            </el-row>
            <!--<el-button type="primary" @click="submit">保存</el-button>-->
          </div>
      </el-form-item>
      <el-divider><i class="el-icon-arrow-right">&nbsp; 添加基本信息</i> &nbsp;<i class="el-icon-arrow-left"></i></el-divider>
      <div class="" >
        <!--选择出发时间-->
        <el-form-item >
          <div class="" >
            <i class="iconfont icon-icon-test1" style="font-size: 20px" > </i>
            <span>时间</span>
            <el-date-picker
              style="width: 150px;"
              class="data-size"
              v-model="form.time"
              @change="getrecommtags()"
              align="right"
              type="date"
              placeholder="选择出发日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>

            &nbsp;&nbsp;
            <span>游玩天数</span>
            <el-input v-model="form.daynum"   style="width: 50px;height: 43px"></el-input>
            <span>天</span>

            &nbsp;&nbsp;
            <span> <i class="iconfont icon-jinqian" style="font-size: 20px"></i>  人均  </span>
            <el-input v-model="form.pay"   style="width: 100px;height: 43px"></el-input>
            <span>元</span>
          </div>
        </el-form-item>
      </div>
      <!--推荐标签-->
      <div >
        <div align="left" style="width: 560px; margin-left: 400px;margin-top: 5px;">
          <p style="font-size: 10px;" >已为小主推荐攻略标签：</p>
        </div>

        <div class="tag-group"  style="width: 560px; margin-left: 400px;margin-top: 5px;">
          <div style="float: left;width: 60px;">
            <span class="tag-group__title" style="margin-left: 0px;"><i class="el-icon-user"></i>人物</span>
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

        <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 5px">
          <div style="float: left;width: 60px;">
            <span class="tag-group__title"> <i class="el-icon-magic-stick"></i> 玩法</span>
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
        <div class="tag-group" style="width: 560px; margin-left: 400px;margin-top: 5px">
          <div style="float: left;width: 60px;">
            <span class="tag-group__title"><i class="el-icon-cloudy-and-sunny"></i>时节</span>
          </div>
          <div style="float: left;width: 500px;" align="left" >
            <el-tag
              style=" margin-top: 5px;margin-left: 0px;margin-right: 10px;cursor:pointer"
              size="mini"
              v-for="item in seasontagitems"
              :key="item.label"
              :type="item.type"
              :color="item.color"

              @click="seasontagclick(item)"
              effect="plain">
              {{ item.label }}
            </el-tag>
          </div>
        </div>
      </div>
		</div>
    <el-form-item >
      <el-button type="primary" style="margin-top: 25px"   @click="submit">提交</el-button>
    </el-form-item>

    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :full="option.full"
            :enlarge="option.enlarge"
            :mode="option.mode"
          >
          </vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>

	</el-form>

</template>

<script>

	//import editor from '@/pages/edit/Editor'
  import { quillEditor,Quill } from "vue-quill-editor"; //调用编辑器
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  import editor from '@/pages/test/quillPic'
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { VueCropper }  from 'vue-cropper'
  import {mapGetters} from 'vuex'
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]

	export default{
		name:"StrategyEdit",

    components: {
      quillEditor,editor, VueCropper,
    },
    props:['psMsg'],
		data(){
			return {
			  //tags
        peopletagId:'',
        playtagId:'',
        seasontagId:'',
        tagcolor:'',
        peopletagitems: [],
        playtagitems: [],
        seasontagitems: [],
        dialogVisible: false,
        // 裁剪组件的基础配置option
        option: {
          img: '', // 裁剪图片的地址
          outputSize: 0.8, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          info: true, // 裁剪框的大小信息
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 1000, // 默认生成截图框宽度
          autoCropHeight: 360, // 默认生成截图框高度
          fixedBox: true, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [25, 9], // 截图框的宽高比例
          canMove: true, // 上传图片是否可以移动
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          full: false, // 是否输出原图比例的截图
          enlarge: '1', // 图片根据截图框输出比例倍数
          mode: 'contain' // 图片默认渲染方式
        },
        // 防止重复提交
        loading: false,
        first:'true',
        fileName: "", //本机文件地址
        downImg: "#",
        imgFile: "",
        uploadImgRelaPath: "" ,//上传后的图片的地址（不带服务器域名）
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
          cover:'',
          daynum:'1',
          pay:'',
          month:'',
				},
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: 'http://localhost:8888/manage/pic/upload.do',  // 这里写你要上传的图片服务器地址
        header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
        content: '', // 富文本内容
        editorOption: {
          placeholder: '请在此进行编辑',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    // document.querySelector('.avatar-uploader input').click()
                    document.querySelector('#Pic input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              },

            }
          }
        }  // 富文本编辑器配置
				
			}
		},
		methods:{
		  getrecommtags(){
		    //获取富文本框中文本
        var text= this.$refs.myQuillEditor.quill.getText();
        var content =this.form.title+text;
		    //这个触发在点击添加日期的时候
        var _vm=this
        this.service.post("/manage/strategy/recommTags.do",{
          "content":content,
        }).then(function (response) {
          console.log("playresponse==="+response);
          if(response.data.status==0&&response.data.wrongMsg==null){
            //返回数据，season,play,people
            _vm.seasontagId=response.data.data[0].id;
            _vm.playtagId=response.data.data[1].id;
            _vm.peopletagId=response.data.data[2].id;
            _vm.seasontagitems[response.data.data[0].id-1].color="#efd576"
            _vm.playtagitems[response.data.data[1].id-1].color="#efd576"
            _vm.peopletagitems[response.data.data[2].id-1].color="#efd576"
            // _vm.seasontagclick(response.data.data[0])
            // _vm.playtagclick(response.data.data[1])
            // _vm.peopletagclick(response.data.data[2])
          }else{

          }
        }).catch(function (error) {
          console.log(error);
        });



      },
		  getplay(){
		    var _vm=this
        this.service.post("/manage/strategy/play/getallplay.do",{
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
        this.service.post("/manage/strategy/people/getallpeople.do",{
        }).then(function (response) {
          if(response.data.status==0&&response.data.wrongMsg==null){
            _vm.peopletagitems=response.data.data
          }else{
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
		  getseason(){
        var _vm=this
        this.service.post("/manage/strategy/season/getallseason.do",{
        }).then(function (response) {
          if(response.data.status==0&&response.data.wrongMsg==null){
            _vm.seasontagitems=response.data.data
          }else{

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
		  peopletagclick(item){
        for( var i=0;i< this.peopletagitems.length;i++){
          this.peopletagitems[i].color=''
        }
        item.color="#efd576"
        this.peopletagId=item.id

      },
      playtagclick(item){
        for( var i=0;i< this.playtagitems.length;i++){
          this.playtagitems[i].color=''
        }
        item.color="#efd576"
        this.playtagId=item.id

      },
      seasontagclick(item){
        for( var i=0;i< this.seasontagitems.length;i++){
          this.seasontagitems[i].color=''
        }
        item.color="#efd576"
        this.seasontagId=item.id
      },
      // 上传图片前
      beforeUpload(res, file) {
        this.quillUpdateImg = true
      },
      // 上传图片成功
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        console.log(res)
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.status == '0' && res.data.url != null) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址,res.data.url
          quill.insertEmbed(length, 'image', 'http://127.0.0.1/'+res.data.filename)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },
      // 上传图片失败
      uploadError(res, file) {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },
		  getData(){

		},
		  submit(){
      var _vm=this
			this.form.keyword=this.dynamicTags;
			let myDate = new Date();
			let time = myDate.toLocaleDateString().split('/').join('-');
			this.form.month=this.form.time.split('-')[1]
			//this.form.addTime=time;
      let hour=myDate.getHours();
      let min = myDate.getMinutes();
      let sec = myDate.getSeconds();

        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        //初始化时间
        //Year       = day.getYear();//有火狐下2008年显示108的bug
        Year       = day.getFullYear();//ie火狐下都可以
        Month      = day.getMonth()+1;
        Day        = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10 )
        {
          CurrentDate += Month + "-";
        }
        else
        {
          CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10 )
        {
          CurrentDate += Day ;
        }
        else
        {
          CurrentDate += "0" + Day ;
        }
        if(hour<=9){
          hour='0'+hour;
        }if(min<10){
          min='0'+min;
        }if(sec<=9){
          sec='0'+sec;
        }

      this.form.addTime=time+" "+hour+":"+min+":"+sec;
      this.service.post("/manage/strategy/strategyinsert.do",{
        //  params:
        "sName":this.form.title,
        "sTime":this.form.addTime,
        "sGotime":this.form.time,
        "sText":this.content,
        "sPay":this.form.pay,
        "sDay":this.form.daynum,
        "sCover":this.form.cover,
        "sStatus":1,
        "sComNum":0,
        "sCliNum":0,
        "sLookNum":0,
        "sPeopleId":this.peopletagId,
        "sPlayId":this.playtagId,
        "sSeasonId":this.peopletagId,
        "sMasterId":this.getUser.uId, //这里有从vuex中取
        "sPicId":this.form.month,
        //  }
      }).then(function (response) {
        console.log(response);
        if(response.data.status==0&&response.data.wrongMsg==null){
          _vm.$router.push("/MyZone");
        }else{
          _vm.$message("失败");
        }
      }).catch(function (error) {
        console.log(error);
      });
			this.$emit('transfer');
			
		},
		  changeImg(file,fileList){
		//	this.imageUrl=URL.createObjectURL(file.raw);
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw)
        console.log("===this,option.img=="+this.option.img)
        this.dialogVisible = true
      })
		},
      finish () {
        var _vm=this;
        // 获取截图的base64 数据
        var formdata = new FormData();
        this.$refs .cropper.getCropBlob(data => {
          formdata.append("uploadCover",data);
          this.axios.put("http://localhost:8888/manage/pic/uploadCover.do",formdata
          ).then(function (response) {
            console.log(response);
            if(response.data.status==0&&response.data.wrongMsg==null){
              _vm.loading = true
              // 把图片上传到服务器
              setTimeout(() => {
                _vm.loading = false
                _vm.dialogVisible = false
                _vm.imageUrl = "http://127.0.0.1/"+response.data.data.filename
                _vm.form.cover="http://127.0.0.1/"+response.data.data.filename;
                document.querySelector('.file-image div').attribute(style)
              }, 1000)
            }else{
              alert("添加失败")
            }
          }).catch(function (error) {
            console.log(error);
          });

        });
      },
		  handleAvatarSuccess(res, file) {
			this.form.image="http://127.0.0.1/"+res.data.filename;
			console.log("====handleAvatarSuccess====="+res.data.filename);
      this.form.cover="http://127.0.0.1/"+res.data.filename;
		},
      iflogin(){
        if(JSON.stringify( this.getUser)=='{}'){
          //未登录
          this.$router.push("/login");
        }
      },
	},
		created() {
      this.iflogin();
		},
		computed:{
      ...mapGetters(['getUser']),
			uploadurl(){return "http://localhost:8888/manage/pic/uploadCover.do";}
		},
    mounted(){
		    this.getplay(),
        this.getpeople(),
        this.getseason()
    },
	}
</script>

<style>
  .cropper {
    width: auto;
    height: 320px;
  }
  *{margin:0; padding:0;}
	.el-tag + .el-tag {
    margin-left: 10px;
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
