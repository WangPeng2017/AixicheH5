'use strict'
// 过滤公里数
import Vue from 'vue'

Vue.filter('formatDistance', val => {
  return Math.round(val * 10) / 100 + 'km'
})
