'use strict'

const list = () => import('@views/coupon/list')
const detail = () => import('@views/coupon/detail')

export default [
  {
    path: '/couponList',
    meta: {
      title: '领券中心'
    },
    component: list
  }, {
    path: '/couponDetail',
    meta: {
      title: '优惠券详情'
    },
    component: detail
  }
]
