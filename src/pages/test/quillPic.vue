<template>

  <el-scrollbar>
    <div style="overflow:auto">
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
        >
          <!--  @change="onEditorChange($event)"
          @ready="onEditorReady($event)"-->
        </quill-editor>
      </el-row>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

  </el-scrollbar>

</template>

<script>
  import { quillEditor,Quill } from "vue-quill-editor"; //调用编辑器
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
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
    export default {
        name: "quillPic",
      components: {
        quillEditor
      },
      data() {
        return {
          quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
          serverUrl: 'http://localhost:8888/manage/pic/upload.do',  // 这里写你要上传的图片服务器地址
          header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
          content: '', // 富文本内容
          editorOption: {
            placeholder: '',
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
                }
              }
            }


          }  // 富文本编辑器配置
        }
      },
      methods: {
        submit(){
          var text= this.$refs.myQuillEditor.quill.getText();
        //  console.log("-----"+text)
         // console.log(this.content)
          this.$emit('transfer',this.content);
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
          console.log(res.data.url)
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
      }
    }

    }
</script>

<style scoped>

</style>
