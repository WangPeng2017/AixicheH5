'use strict'

const shopscenter = () => import('@views/shopscenter')

export default [
  {
    path: '/shopscenter',
    component: shopscenter,
    meta: {
      title: '商家中心'
    }
  }
]
