'use strict'

import Vue from 'vue'

let listenAction
let originalHeight
let currHeight
Vue.directive('foot', {
  insert (el, binding) {
    const elStyle = el.style
    let active = false
    originalHeight = document.body.clientHeight
    const reset = () => {
      if (!active) {
        return
      }
      elStyle.display = 'flex'
      active = false
    }
    const hang = () => {
      if (active) {
        return
      }
      elStyle.display = 'none'
      active = true
    }
    const getCurrHeight = () => {
      let getHeight = document.body.clientHeight
      return getHeight
    }
    const check = () => {
      currHeight = getCurrHeight()
      if (currHeight !== originalHeight) {
        hang()
      } else {
        reset()
      }
    }
    listenAction = () => {
      check()
    }
    window.addEventListener('resize', listenAction)
  },
  unbind () {
    window.removeEventListener('resize', listenAction)
  }
})
