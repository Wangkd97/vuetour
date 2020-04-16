<template>


  <div class="cropper">
    <el-container>
      <el-header  :visible=this.first>Header
        <!-- element 上传图片按钮 -->
        <el-upload
          class="upload-demo"

          action=""
          drag :auto-upload="false"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change='changeUpload'>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击上传</div>
          <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>

      </el-header>

      <el-main>Main
        <div class="file-image"  >
          <p class="file-image">
          <img :src="fileImg"  style="width: 100%;height: 100%;" alt="图片">
          </p>
        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

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
  </div>
</template>

<script>
  import { VueCropper }  from 'vue-cropper'

    export default {
        name: "testPicCut",
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          fileImg: '',
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
          uploadImgRelaPath: "" //上传后的图片的地址（不带服务器域名）
        }
      },

      components: {
        VueCropper,
      },
      methods: {
        handleAvatarSuccess(res, file) {
       this.first=false;
          console.log("====handleAvatarSuccess====="+res.data.filename);

        },
        // 上传按钮 限制图片大小
        changeUpload (file, fileList) {
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
        // 点击裁剪，这一步是可以拿到处理后的地址
        finish () {
          console.log("finish");
          var _vm=this;
          // 获取截图的base64 数据
          var formdata = new FormData();
            this.$refs .cropper.getCropBlob(data => {
              var srcdata=data;
              formdata.append("uploadCover",data);
              this.axios.put("http://localhost:8888/manage/pic/uploadCover.do",formdata
              ).then(function (response) {
                console.log(response);
                if(response.data.status==0&&response.data.wrongMsg==null){
                    _vm.loading = true
                    _vm.first=false;
                    // 把图片上传到服务器
                    setTimeout(() => {
                      _vm.loading = false
                      _vm.dialogVisible = false
                      _vm.fileImg = "http://127.0.0.1/"+response.data.data.filename
                      document.querySelector('.file-image div').attribute(style)
                    }, 1000)
                }else{
                  alert("添加失败")
                }
              }).catch(function (error) {
                console.log(error);
              });

            });

          // this.$refs.cropper.getCropData((data) => {
          //   var blob = this.dataURLtoBlob(data);
          //   var file = this.blobToFile(blob, );
          //
          //   this.service.post("/manage/pic/uploadCover.do",{
          //     //  params:
          //     "uploadCover":file,
          //     //  }
          //   }).then(function (response) {
          //     console.log(response);
          //     if(response.status==200){
          //       console.log("====response.data.data="+response.data.data);
          //     }else{
          //       console.log("=======aaaaaa=======")
          //     }
          //   }).catch(function (error) {
          //     console.log(error);
          //   });
          //   console.log("==data=="+data)
          //   // do something
          //   this.loading = true
          //   this.first=false;
          //   // 把图片上传到服务器
          //   setTimeout(() => {
          //     this.loading = false
          //     this.dialogVisible = false
          //     this.fileImg = data
          //     document.querySelector('.file-image div').attribute(style)
          //   }, 1000)
          // })
        },
        dataURLtoBlob: function(dataurl) {
          var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        },
        //将blob转换为file
        blobToFile: function(theBlob, filename = 'file'){
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        },
        //调用

      }
    }
</script>

<style scoped>
  .file-image{
    width: 100%;
    height: 360px; font-size: 14px;
    border: 1px solid #cccccc;
    margin: 15px 0;
  }

  /* 截图 */
  /* .cropper-content {} */
  .cropper {
    width: auto;
    height: 320px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
