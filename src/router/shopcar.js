'use strict'
const shopcar = () => import('@views/shopcar')
const firmOrder = () => import('@views/shopcar/firmOrder')
const cashier = () => import('@views/shopcar/cashier')
const pocashier = () => import('@views/pointsshopcar/cashier')
const paySuccess = () => import('@views/shopcar/paySuccess')
const mycashier = () => import('@views/user/member/mycashier')
const pointsfirmOrder = () => import('@views/pointsshopcar/firmOrder')
export default [
  {
    path: '/shopcar',
    component: shopcar,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/firmOrder',
    component: firmOrder,
    meta: {
      title: '确认订单',
      isLogin: true
    }
  },
  {
    path: '/cashier',
    component: cashier,
    meta: {
      title: '收银台',
      isLogin: true
    }
  },
  {
    path: '/pocashier',
    component: pocashier,
    meta: {
      title: '收银台',
      isLogin: true
    }
  },
  {
    path: '/paySuccess/:id/:price',
    component: paySuccess,
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/mycashier',
    component: mycashier,
    meta: {
      title: '收银台',
      isLogin: true
    }
  },
  {
    path: '/pointsfirmOrder',
    component: pointsfirmOrder,
    meta: {
      title: '确认订单',
      isLogin: true
    }
  }
]
