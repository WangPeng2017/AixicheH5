'use strict'

const seller = () => import('@views/seller')
const detail = () => import('@views/seller/detail')
const detailIntroduce = () => import('@views/seller/detailIntroduce')
const detailStaff = () => import('@views/seller/detailStaff')
const sellerList = () => import('@views/seller/list')
const sellerListForPackage = () => import('@views/seller/listForPackage')
const sellerRegister = () => import('@views/seller/register')
const sellerRegisterStep1 = () => import('@views/seller/registerStep1')
const sellerRegisterStep2 = () => import('@views/seller/registerStep2')
const sellerRegisterStep3 = () => import('@views/seller/registerStep3')
export default [
  {
    path: '/sellerIndex/:id',
    component: seller,
    meta: {
      title: '店铺首页'
    }
  }, {
    path: '/sellerDetail/:id',
    component: detail,
    meta: {
      title: '店铺介绍'
    }
  }, {
    path: '/sellerDetailIntroduce/:id',
    component: detailIntroduce,
    meta: {
      title: '店铺详情'
    }
  }, {
    path: '/sellerDetailStaff/:id',
    component: detailStaff,
    meta: {
      title: '员工详情'
    }
  }, {
    path: '/sellerList',
    component: sellerList,
    meta: {
      title: '店铺列表'
    }
  }, {
    path: '/sellerListForPackage/:id',
    component: sellerListForPackage,
    meta: {
      title: '套餐商家列表'
    }
  }, {
    path: '/sellerRegister',
    component: sellerRegister,
    meta: {
      title: '商家入驻'
    }
  }, {
    path: '/sellerRegisterStep1',
    component: sellerRegisterStep1,
    meta: {
      title: '商家入驻'
    }
  }, {
    path: '/sellerRegisterStep2',
    component: sellerRegisterStep2,
    meta: {
      title: '商家入驻'
    }
  }, {
    path: '/sellerRegisterStep3',
    component: sellerRegisterStep3,
    meta: {
      title: '商家入驻'
    }
  }
]
