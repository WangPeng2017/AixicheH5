'use strict'

const jobList = () => import('@views/job/list')
const jobDetail = () => import('@views/job/detail')

export default [
  {
    path: '/jobList',
    component: jobList,
    meta: {
      title: '求职列表'
    }
  }, {
    path: '/jobDetail/:id',
    meta: {
      title: '求职详情'
    },
    component: jobDetail
  }
]
