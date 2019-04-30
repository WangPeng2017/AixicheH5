'use strict'

const packageList = () => import('@views/package/list')
const packageDetail = () => import('@views/package/detail')

export default [
  {
    path: '/packageList',
    component: packageList,
    meta: {
      title: '套餐列表'
    }
  }, {
    path: '/packageDetail/:id',
    component: packageDetail,
    meta: {
      title: '套餐详情'
    }
  }
]
