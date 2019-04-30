'use strict'

const rentcarList = () => import('@views/rentcar/list')
const rentcarDetail = () => import('@views/rentcar/detail')

export default [
  {
    path: '/rentcarList',
    component: rentcarList,
    meta: {
      title: '租车列表'
    }
  }, {
    path: '/rentcarDetail/:id',
    meta: {
      title: '租车详情'
    },
    component: rentcarDetail
  }
]
