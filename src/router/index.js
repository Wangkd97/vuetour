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
import MyZone from '@/pages/my/MyZone'
import TestMain from '@/pages/strategy/TestMain'
import TestStore from '@/pages/strategy/TestStore'
import StrategyUpdate from '@/pages/strategy/StrategyUpdate'
import SysMain from '@/components/Main'
import StrategyShowAdmin from '@/pages/admin/StrategyShowAdmin'
import TestComment from '@/pages/test/TestComment'
import CommentAdmin from '@/pages/admin/CommentAdmin'
import RecommendAdmin from '@/pages/admin/RecommendAdmin'
import AdminLogin from '@/pages/admin/AdminLogin'
import UserSign from '@/pages/center/UserSign'

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
    {
      path:'/MyZone',
      name:'MyZone',
      component:MyZone
    },
    {
      path:'/TestMain',
      name:'TestMain',
      component:TestMain
    },
    {
      path:'/TestStore',
      name:'TestStore',
      component:TestStore
    },
    {
      path:'/StrategyUpdate',
      name:'StrategyUpdate',
      component:StrategyUpdate
    },
    {
      path:'/StrategyUpdate/:sId',
      name:'StrategyUpdate',
      component:StrategyUpdate
    },
    {
      path:'/SysMain',
      name:'SysMain',
      component:SysMain
    },

    {
      path:'/SysStrategyShow/:sId',
      name:'StrategyShowAdmin',
      component:StrategyShowAdmin
    },
    {
      path:'/testcom',
      name:'TestComment',
      component:TestComment
    },
    {
      path:'/SysComment',
      name:'CommentAdmin',
      component:CommentAdmin
    },
    {
      path:'/SysRecommend',
      name:'RecommendAdmin',
      component:RecommendAdmin
    },
    {
      path:'/Syslogin',
      name:'AdminLogin',
      component:AdminLogin
    },
    {
      path:'/SysSign',
      name:'UserSign',
      component:UserSign
    },
  ]
})
