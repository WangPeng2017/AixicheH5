'use strict'

const home = () => import('@views/home')
const moduleList = () => import('@views/home/moduleList')
const jifenCate = () => import('@views/home/jifenCate')
const jifencateSelect = () => import('@views/home/jifenCate/select')

const jfgoodsList = () => import('@views/home/jifengoods/list')
const jfgoodsDetail = () => import('@views/home/jifengoods/detail')
const jfgoodsListForPackage = () =>
  import('@views/home/jifengoods/listForPackage')
const jfgoodsListForCoupon = () =>
  import('@views/home/jifengoods/listForCoupon')
const jfgoodsListForTag = () => import('@views/home/jifengoods/listForTag')

export default [
  {
    path: '/home',
    meta: {
      title: '红幸云商'
    },
    component: home
  },
  {
    path: '/moduleList',
    component: moduleList,
    meta: {
      title: '更多分类'
    }
  },
  {
    path: '/jifenCate',
    component: jifenCate,
    meta: {
      title: '专区'
    }
  },
  {
    path: '/jifencateSelect',
    component: jifencateSelect,
    meta: {
      title: '红幸云商'
    }
  },
  {
    path: '/jfgoodsList',
    component: jfgoodsList,
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/jfgoodsListForPackage',
    component: jfgoodsListForPackage,
    meta: {
      title: '套餐商品列表'
    }
  },
  {
    path: '/jfgoodsListForCoupon',
    component: jfgoodsListForCoupon,
    meta: {
      title: '优惠券商品列表'
    }
  },
  {
    path: '/jfgoodsListForTag',
    component: jfgoodsListForTag,
    meta: {
      title: '标签商品列表'
    }
  },
  {
    path: '/jfgoodsDetail/:id/:sid?',
    component: jfgoodsDetail,
    meta: {
      title: '商品详情'
    }
  }
]
