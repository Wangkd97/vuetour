<template>


  <div class="cropper">
    <el-container>
      <el-header  :visible="this.first">Header
        <!-- element 上传图片按钮 -->
        <el-upload
          class="upload-demo"
          action=""
          drag :auto-upload="false"
          :show-file-list="false"
          :on-change='changeUpload'>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击上传</div>
          <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>

      </el-header>

      <el-main>Main
        <div class="file-image"  >
          <p class="file-image">
          <img :src="fileImg"  style="width: 100%;height: 100%;" alt="头像">

          </p>
        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>



    <!-- 显示裁剪后的图片 -->
    <!--<p class="file-image">-->
      <!--<img :src="fileImg"  style="width: 100%;height: 100%;" alt="头像">-->
    <!--</p>-->


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

        }
      },

      components: {
        VueCropper,
      },
      methods: {
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
            this.dialogVisible = true
          })
        },
        // 点击裁剪，这一步是可以拿到处理后的地址
        finish () {
          // 获取截图的base64 数据
          this.$refs.cropper.getCropData((data) => {
            // do something
            this.loading = true
            this.first=false;
            // 把图片上传到服务器
            setTimeout(() => {
              this.loading = false
              this.dialogVisible = false
              this.fileImg = data
              document.querySelector('.file-image div').attributes(style)
            }, 1000)
          })
        }
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
