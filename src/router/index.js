import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import UserLogin from '@/pages/center/UserLogin'
import StrategyEdit from '@/pages/strategy/StrategyEdit'
import Main from '@/components/Main'
import StrategyShow from '@/pages/strategy/StrategyShow'
import quillPic from '@/pages/test/quillPic'
import testPicCut from'@/pages/test/testPicCut'
import StrategyMain from "../pages/strategy/StrategyMain"
import StrategyStore from '@/pages/strategy/StrategyStore'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path:'/main',
      name:'Main',
      component:Main
    },
    {
      path:'/edit',
      name:'StrategyEdit',
      component:StrategyEdit
    },
    {
      path:'/show',
      name:'StrategyShow',
      component:StrategyShow
    },
    {
      path:'/show/:id',
      name:'StrategyShow',
      component:StrategyShow
    },
    {
      path:'/uploadPic',
      name:'quillPic',
      component:quillPic
    },
    {
      path:'/picCut',
      name:'testPicCut',
      component:testPicCut
    },
    {
      path:'/StrategyMain',
      name:'StrategyMain',
      component:StrategyMain
    },
    {
      path:'/StrategyStore',
      name:'StrategyStore',
      component:StrategyStore
    },

  ]
})
