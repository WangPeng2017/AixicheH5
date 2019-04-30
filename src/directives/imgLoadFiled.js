'use strict'
import Vue from 'vue'
import { IMG_FIELD, MALE_IMG_FIELD, FEMALE_IMG_FIELD } from '../config'

Vue.directive('imgField', {
  inserted (el) {
    if (el.src === '') {
      el.src = IMG_FIELD
      el.classList.add('error')
    }
    el.onerror = function () {
      this.src = IMG_FIELD
      el.classList.add('error')
    }
  }
})

Vue.directive('maleField', {
  inserted (el) {
    if (el.src === '') {
      el.src = MALE_IMG_FIELD
      el.classList.add('error')
    }
    el.onerror = function () {
      this.src = MALE_IMG_FIELD
      el.classList.add('error')
    }
  }
})

Vue.directive('femaleField', {
  inserted (el) {
    if (el.src === '') {
      el.src = FEMALE_IMG_FIELD
      el.classList.add('error')
    }
    el.onerror = function () {
      this.src = FEMALE_IMG_FIELD
      el.classList.add('error')
    }
  }
})
