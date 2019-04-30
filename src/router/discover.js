'use strict'

const articleIndex = () => import('@views/discover')
const articleList = () => import('@views/discover/list')
const articleDetail = () => import('@views/discover/detail')
const helpDetail = () => import('@views/help')

export default [
  {
    path: '/discover',
    name: 'discover',
    meta: {
      title: '发现'
    },
    component: articleIndex
  }, {
    path: '/articleList',
    component: articleList,
    meta: {
      title: '新闻列表'
    }
  }, {
    path: '/articleDetail/:id',
    meta: {
      title: '新闻详情'
    },
    component: articleDetail
  }, {
    path: '/help/:code',
    component: helpDetail,
    meta: {
      title: '帮助中心'
    }
  }
]
