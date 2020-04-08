<template>
	<el-form ref="form" :model="form"  >
    <div style="width: 100%;height: 25px;text-align: end;background-color: 	#00C5CD">

        <strong>用户昵称</strong>
      <span> | 我的空间</span>
      <span> | 退出</span>
    </div>
		<div style="height: 100%;overflow: auto;">
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          name="uploadCover"
          :action="uploadurl"
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
        <el-form-item >
          <div class="" >
            <i class="iconfont icon-icon-test1" style="font-size: 20px" > </i>
            <span>时间</span>
            <el-date-picker
              style="width: 150px;"
              class="data-size"
              v-model="form.time"
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
		<el-form-item >
			<el-button type="primary" @click="submit">提交</el-button>
		</el-form-item>
		</div>

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
      quillEditor,editor
    },
    props:['psMsg'],
		data(){
			return {
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
          console.log("=====uploadSueccess======="+res.data.url)
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

			this.form.keyword=this.dynamicTags;
			let myDate = new Date();
			let time = myDate.toLocaleDateString().split('/').join('-');
			//this.form.addTime=time;
      let hour=myDate.getHours();
      let min = myDate.getMinutes();
      let sec = myDate.getSeconds();
      this.form.addTime=time+" "+hour+":"+min+":"+sec;
      console.log(this.form.content+"===content==")
      console.log(this.form.time+"===time==")
      console.log(this.form.addTime+"===addtime==")
      console.log(this.form.title+"===title==")
			// this.post("event/save",(result)=>{
			// },this.form,'form');
      this.service.post("/manage/strategy/strategyinsert.do",{
        //  params:
        "sName":this.form.title,
        "sTime":this.form.addTime,
        "sGotime":this.form.time,
        "sText":this.content,
        "sPay":this.form.pay,
        "sDay":this.form.daynum,
        "sCover":this.form.cover,
        //  }
      }).then(function (response) {
        console.log(response);
        if(response.data.status==0&&response.data.wrongMsg==null){
          alert("添加成功")
        }else{
          alert("添加失败")
        }
      }).catch(function (error) {
        console.log(error);
      });
			this.$emit('transfer');
			
		},

		changeImg(file,fileList){
			this.imageUrl=URL.createObjectURL(file.raw);
		},
		handleAvatarSuccess(res, file) {
			this.form.image="http://127.0.0.1/"+res.data.filename;
			console.log("====handleAvatarSuccess====="+res.data.filename);
      this.form.cover="http://127.0.0.1/"+res.data.filename;
		},
	},
		created() {
			this.form.id=this.psMsg;
			console.log(this.form.id);
		},
		computed:{
			uploadurl(){return "http://localhost:8888/manage/pic/uploadCover.do";}
		},
	}
</script>

<style>
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
