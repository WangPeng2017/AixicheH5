'use strict'

const goodsList = () => import('@views/goods/list')
const goodsPointsList = () => import('@views/goods/pointslist')
const goodsDetail = () => import('@views/goods/detail')
const goodsPointsDetail = () => import('@views/goods/pointsdetail')
const goodsListForPackage = () => import('@views/goods/listForPackage')
const goodsListForCoupon = () => import('@views/goods/listForCoupon')
const goodsListForTag = () => import('@views/goods/listForTag')

export default [
  {
    path: '/goodsList',
    component: goodsList,
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/goodsPointsList',
    component: goodsPointsList,
    meta: {
      title: '专区商品列表'
    }
  },
  {
    path: '/goodsListForPackage',
    component: goodsListForPackage,
    meta: {
      title: '套餐商品列表'
    }
  },
  {
    path: '/goodsListForCoupon',
    component: goodsListForCoupon,
    meta: {
      title: '优惠券商品列表'
    }
  },
  {
    path: '/goodsListForTag',
    component: goodsListForTag,
    meta: {
      title: '标签商品列表'
    }
  },
  {
    path: '/goodsDetail/:id/:sid?',
    component: goodsDetail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/goodsPointsDetail/:id/:sid?',
    component: goodsPointsDetail,
    meta: {
      title: '专区商品详情'
    }
  }
]
