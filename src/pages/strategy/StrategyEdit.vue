<template>

	<el-form ref="form" :model="form" label-width="125px" >
		<div style="height: 85vh;overflow: auto;">
      <el-form-item label="封面图片">
        <el-upload

          class="avatar-uploader"
          :action="uploadurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="changeImg"
          name="imgfile">
          <img v-if="imageUrl" :src="imageUrl"   class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="攻略标题">
        <el-input v-model="form.title" style="width: 90%;"></el-input>
      </el-form-item>
      <el-form-item label="具体内容">
        <el-button type="primary" @click="drawer = true">点击进行查看和编辑</el-button>
      </el-form-item>

      <div class="">
        <el-form-item label="出发时间">
          <div class="block">
            <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
      </div>
		<el-form-item >
			<el-button type="primary" @click="submit">提交</el-button>
		</el-form-item>
		</div>
		<el-drawer
		title="攻略内容编辑"
		:visible.sync="drawer"
		size="100%"
		destroy-on-close
		ref="drawer">
		<editor :psMsg="form.content"  @transfer="drawerclose"></editor>
		</el-drawer>
	</el-form>
</template>

<script>
	//import editor from '@/pages/edit/Editor'

  import editor from '@/pages/test/quillPic'
	export default{
		name:"StrategyEdit",
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
					image:''
				},
				
			}
		},
		methods:{

		getData(){
			this.get("event/queryOne",(result)=>{
				this.form.title=result.obj.title;
				this.form.subtitle=result.obj.subtitle;
				if(result.obj.time==null)
				{this.form.time='';}else{this.form.time=result.obj.time;}
				this.form.abstract=result.obj.abstract;
				this.form.category=result.obj.category;
				this.form.keyword=result.obj.keyword;
				this.form.dataSource=result.obj.dataSource;
				this.form.website=result.obj.website;
				this.form.content=result.obj.content;
				this.form.image=result.obj.image;
				this.imageUrl=this.form.image;
				console.log(this.form.image);
				this.proudceTags();
			},{id:this.psMsg});
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
        "stime":this.form.addTime,
        "sGotime":this.form.time,
        "sText":this.form.content,
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
		proudceTags(){
			if(this.form.keyword!=""){
			let str= this.form.keyword;
			let arr= str.split(",");
			for(let i=0;i<arr.length;i++)
			{this.dynamicTags.push(arr[i]);}}
		},
		drawerclose(msg){
			this.form.content=msg;
			this.drawer=false;
		},
		changeImg(file,fileList){
			this.imageUrl=URL.createObjectURL(file.raw);
		},
		handleAvatarSuccess(res, file) {
			this.form.image="http://59.110.236.147:8080/"+res.obj;
		},
	},
		components:{
			editor
		},
		created() {
			this.form.id=this.psMsg;
			this.getData();
			console.log(this.form.id);
		},
		computed:{
			uploadurl(){return this.axios.defaults.baseURL+"event/saveImg";}
		},
	}
</script>

<style>
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
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 196px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 196px;
    height: 120px;
    display: block;
  }
  .el-drawer{

    overflow: scroll
  }
</style>
