'use strict'

const login = () => import('@views/auth/login')
const regist = () => import('@views/auth/regist')
const forget = () => import('@views/auth/forget')
const author = () => import('@views/auth/wx/author')

export default [
  {
    path: '/login',
    component: login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/regist',
    component: regist,
    meta: {
      title: '注册'
    }
  }, {
    path: '/forget',
    component: forget,
    meta: {
      title: '忘记密码'
    }
  }, {
    path: '/author',
    component: author,
    meta: {
      title: '红幸云商'
    }
  }
]
