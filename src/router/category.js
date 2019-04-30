'use strict'

const category = () => import('@views/category')
const categorySelect = () => import('@views/category/select')

export default [
  {
    path: '/category',
    meta: {
      title: '红幸云商'
    },
    component: category
  }, {
    path: '/categorySelect',
    component: categorySelect,
    meta: {
      title: '红幸云商'
    }
  }
]
