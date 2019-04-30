'use strict'

import Vue from 'vue'

const fullWinHeight = document.body.scrollHeight

Vue.directive('fixedBot', {
  inserted (el) {
    window.addEventListener('resize', ev => {
      let curentHeight = document.body.scrollHeight
      if (curentHeight < fullWinHeight) {
        el.style.display = 'none'
      } else if (curentHeight >= fullWinHeight) {
        el.style.display = 'block'
      }
    })
  }
})
