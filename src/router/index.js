import Vue from 'vue'
import Router from 'vue-router'
// import my from './user'
// import discover from './discover'
// import goods from './goods'
// import packageRouter from './package'
// import login from './login'
// import home from './home'
// import category from './category'
// import shopcar from './shopcar'
// import seller from './seller'
// import message from './message'
// import coupon from './coupon'
// import map from './map'
// import cartype from './cartype'
// import rentcar from './rentcar'
// import usedcar from './usedcar'
// import transfer from './transfer'
// import recruit from './recruit'
// import job from './job'
// import shopscenter from './shopscenter'
import backstage from './backstage'
import $store from '@store'

import { IsWeixin } from '@utils/mixin'

Vue.use(Router)

const search = () => import('@views/search')

const router = new Router({
  // base: '/mobile',    // history模式使用， hash模式去除
  // mode: 'history',    // history模式使用， hash模式去除
  routes: [
    // ...my,
    // ...discover,
    // ...goods,
    // ...packageRouter,
    // ...login,
    // ...home,
    // ...category,
    // ...shopcar,
    // ...seller,
    // ...recruit,
    // ...message,
    // ...coupon,
    // ...map,
    // ...cartype,
    // ...rentcar,
    // ...usedcar,
    // ...transfer,
    // ...job,
    // ...shopscenter,
    ...backstage,
    {
      path: '/search',
      component: search,
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title || ''
  document.title = '红幸云商'
  let toFullPath = to.fullPath
  let toPath = to.path

  // 首次打开显示启动广告
  let firstLoad = sessionStorage.getItem('firstLoad')

  if (firstLoad && toPath === '/launch') {
    next('/')
    return false
  }
  if (!firstLoad && toPath !== '/launch') {
    // 首次进入
    $store.state.toFullPath = toFullPath
    next('/launch')
    return false
  }

  let requireLogin = to.meta.isLogin || false
  let token = $store.state.token
  let isWeixin = IsWeixin() || false
  if (isWeixin) {
    let openid = $store.state.openid
    if ((!token || !openid) && requireLogin) {
      $store.state.beforeUrl = location.href
      next('/loginAuth')
      return false
    }
  }

  // 非微信环境下访问需要登录权限的视图，跳转登录视图
  if (!token && requireLogin) {
    // 跳转登录
    $store.state.toFullPath = toFullPath
    next('/login')
    return false
  }

  next()
})

export default router
