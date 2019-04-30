'use strict'

const transfer = () => import('@views/transfer')
const transferList = () => import('@views/transfer/list')
const transferDetail = () => import('@views/transfer/detail')

export default [
  {
    path: '/transfer',
    component: transfer,
    meta: {
      title: '转让信息'
    }
  }, {
    path: '/transferList',
    component: transferList,
    meta: {
      title: '转让信息'
    }
  }, {
    path: '/transferDetail/:id',
    meta: {
      title: '转让信息详情'
    },
    component: transferDetail
  }
]
