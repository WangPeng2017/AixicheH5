'use strict'

const usedcarList = () => import('@views/usedcar/list')
const usedcarDetail = () => import('@views/usedcar/detail')

export default [
  {
    path: '/usedcarList',
    component: usedcarList,
    meta: {
      title: '二手车列表'
    }
  }, {
    path: '/usedcarDetail/:id',
    meta: {
      title: '二手车详情'
    },
    component: usedcarDetail
  }
]
