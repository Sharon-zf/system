import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import main from '../views/mian.vue'

//解决当前位置的冗余导航而产生的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    redirect: '/home',
    children:[
      // {
      //   path:'/home',
      //   name:'home',
      //   component: ()=>import('../views/home.vue')
      // },
      // {
      //   path:'/user',
      //   name:'user',
      //   component: ()=>import('../views/user.vue')
      // },
      // {
      //   path:'/mall',
      //   name:'mall',
      //   component: ()=>import('../views/mall.vue')
      // },
      // {
      //   path:'/page1',
      //   name:'page1',
      //   component: ()=>import('../views/otherPage1.vue')
      // },
      // {
      //   path:'/page2',
      //   name:'page2',
      //   component: ()=>import('../views/otherPage2.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/login.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.loginInfo.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  }else {
    next()
  }
})

export default router
