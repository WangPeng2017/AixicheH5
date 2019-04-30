'use strict'

const recruitList = () => import('@views/recruit/list')
const recruitDetail = () => import('@views/recruit/detail')

export default [
  {
    path: '/recruitList',
    component: recruitList,
    meta: {
      title: '招聘列表'
    }
  }, {
    path: '/recruitDetail/:id',
    meta: {
      title: '招聘详情'
    },
    component: recruitDetail
  }
]
