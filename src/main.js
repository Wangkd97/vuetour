// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'

//这是引入图片剪辑
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)


Vue.config.productionTip = false

Vue.use(ElementUI)

//引入axios，并将axios注册成为全局变量
import axios from 'axios'
Vue.prototype.axios=axios

//这个是创建一个axios，设置url，配置post请求格式
var service=axios.create({

  baseURL:"http://localhost:8888",
  // 请求预处理函数 可以把你传的param进行处理
  withCredentials: true , // 允许携带cookie
  transformRequest: [
    data => {
      // data 就是你post请求传的值
      // 一下主要是吧数据拼接成 类似get格式
      let params = ''
      for (var index in data) {
        params += index + '=' + data[index] + '&'
      }
      return params
    }
  ]

})
import {store} from  './store/index'
Vue.prototype.service=service
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
