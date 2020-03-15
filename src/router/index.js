import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'//@就是指src目录
import NewsIndex from '@/views/news/index'
import NewsList from '@/views/news/list'
import NewsDetail from '@/views/news/detail'
import ProductIndex from '@/views/product/index'
import ProductList from '@/views/product/list'
import ProductDetail from '@/views/product/detail'
import Contact from '@/views/contact'
import Admin from '@/admin/admin'
import AdminIndex from '@/admin/index/index'
import AdminNews from '@/admin/news/index'
import AdminNewsAdd from '@/admin/news/add'
import AdminNewsEdit from '@/admin/news/edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {//配置一个路由
      path: '/',
      name: 'index',
      component: Index
    },
    {//配置一个路由
      path: '/news',
      name: 'news',
      component: NewsIndex,
      children: [
        {//配置一个路由
          path: 'list',
          name: 'news list',
          component: NewsList
        },
        {//配置一个路由
          path: 'detail/:id',
          name: 'news detail',
          component: NewsDetail
        }
      ]
    },
    {//配置一个路由
      path: '/product',
      name: 'product',
      component: ProductIndex,
      children: [
        {//配置一个路由
          path: 'list',
          name: 'product list',
          component: ProductList
        },
        {//配置一个路由
          path: 'detail/:id',
          name: 'product detail',
          component: ProductDetail
        }
      ]
    },
    {//配置一个路由
      path: '/contact',
      name: 'contact',
      component: Contact
    },
      
    {//后台路由
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {//配置一个路由
          path: 'index',
          name: 'admin index',
          component: AdminIndex
        },
        {//配置一个路由
          path: 'news',
          name: 'admin news',
          component: AdminNews,
        },
        {//配置一个路由
          path: 'news/add',
          name: 'admin news add',
          component: AdminNewsAdd,
        },
        {//配置一个路由
          path: 'news/edit/:id',
          name: 'admin news edit',
          component: AdminNewsEdit,
        },
      ]
    }
  ]
})
