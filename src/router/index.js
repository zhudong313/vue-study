import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//@就是指src目录
import Abc from '@/components/abc'

Vue.use(Router)

export default new Router({
  routes: [
    {//配置一个路由
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {//配置一个路由
      path: '/abc',
      name: 'abc',
      component: Abc
    }
  ]
})
