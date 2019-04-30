'use strict'

const login = () => import('@views/login/login')
const regist = () => import('@views/login/regist')
const forget = () => import('@views/login/forget')
const loginBind = () => import('@views/login/loginBind')
const loginAuth = () => import('@views/login/loginAuth')
const author = () => import('@views/login/author')
const launch = () => import('@views/login/launch')

export default [
  {
    path: '/login',
    component: login,
    meta: {
      title: ''
    }
  }, {
    path: '/regist',
    component: regist,
    meta: {
      title: '红幸云商'
    }
  }, {
    path: '/forget',
    component: forget,
    meta: {
      title: '红幸云商'
    }
  }, {
    path: '/loginBind',
    component: loginBind,
    meta: {
      title: '红幸云商'
    }
  }, {
    path: '/loginAuth',
    component: loginAuth,
    meta: {
      title: '红幸云商'
    }
  }, {
    path: '/author',
    component: author,
    meta: {
      title: '红幸云商'
    }
  }, {
    path: '/launch',
    component: launch,
    meta: {
      title: '红幸云商'
    }
  }
]
