import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/pay/index.vue'
import payBack from '@/views/pay/payBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
//路由实例，history模式路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'layout',
      component: Layout,
      children:[
        {
          path:'',
          name:'home',
          component: Home,
        },
        {
          path:'category/:id',
          name:'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name:'subCategory',
          component: SubCategory,
        },
        {
          path: 'detail/:id',
          name:'detail',
          component: Detail
        },{
          path:'cartlist',
          name:'cartlist',
          component: CartList
        },
        {
          path:'checkout',
          name:'checkout',
          component: Checkout
        },
        {
          path:'pay',
          name:'pay',
          component: Pay
        },
        {
          path:'paycallback',
          name:'payBack',
          component: payBack
        },
        {
          path:'member',
          name:'member',
          component: Member,
          children:[
            {
              path:'/member/user',
              name:'userinfo',
              component: UserInfo
            },
            {
              path:'/member/order',
              name:'userorder',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: Login,
    }
  ],
  scrollBehavior:()=>{
    return {
      top:0
    }
  }
})

export default router
