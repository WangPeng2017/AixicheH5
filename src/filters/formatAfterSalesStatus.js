'use strict'

import Vue from 'vue'

Vue.filter('formatAfterSalesStatus', val => {
  switch (val) {
    case -1:
      return '没有退换货'
    case 0:
      return '处理中'
    case 1:
      return '已经处理'
    case 2:
      return '拒绝处理'
  }
})
