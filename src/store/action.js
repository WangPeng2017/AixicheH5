'use strict'
import {
  SET_TOKEN,
  SET_LONGITUDE,
  SET_LATIUDE,
  SET_LOADING,
  SET_USER,
  LOGOUT
} from './type'
import {
  login,
  relationLogin,
  base,
  getUser,
  logout,
  getJsApiParams
} from '@api'
import router from '@router'
import Vue from 'vue'
import { IsWeixin, SetLocalStorage, GetLocalStorage } from '@utils/mixin'
import wx from 'weixin-js-sdk'

export default {
  // 账号密码或短信登录
  login (context, data) {
    context.commit(SET_LOADING, {
      status: true,
      opacity: 0
    })

    login(data.form).then(res => {
      context.commit(SET_LOADING, false)
      if (res && res.code === 200) {
        context.commit(SET_TOKEN, res.data.token)
        if (data.count) {
          router.go(data.count)
        }
        Vue.toasted.show(`登录成功！`)
      }
    })
  },
  // 三方账号关联登录
  relationLogin (context, data) {
    context.commit(SET_LOADING, {
      status: true,
      opacity: 0
    })
    relationLogin(data.form).then(res => {
      context.commit(SET_LOADING, false)
      if (res && res.code === 200) {
        context.commit(SET_TOKEN, res.data.token)
        if (data.count) {
          router.go(data.count)
        }
        Vue.toasted.show(`微信登录成功！`)
      }
    })
  },
  // 退出登录
  logout (context) {
    context.commit(SET_LOADING, {
      status: true,
      opactity: 0
    })
    logout().then(res => {
      context.commit(SET_LOADING, false)
      if (res && res.code === 200) {
        context.commit(LOGOUT)
        router.back()
      }
    })
  },
  // 获取登录用户信息
  getUserInfo (context, cb) {
    if (context.state.token) {
      context.commit(SET_LOADING, true)
      getUser().then(res => {
        context.commit(SET_LOADING, false)
        if (res && res.code === 200) {
          if (res.data && res.data.user_sex) {
            res.data.user_sex = res.data.user_sex === 0 ? '女' : '男'
          }
          context.commit(SET_USER, res.data)
          if (cb) {
            cb()
          }
        }
      })
    }
  },
  // 获取用户位置（浏览器位置或微信位置）
  getLocation (context) {
    let isWx = IsWeixin() || false
    if (isWx) {
      wx.ready(function () {
        wx.getLocation({
          success: function (result) {
            // 经度
            let longitude = result.longitude
            // 纬度
            let latitude = result.latitude
            base.defaults.headers.longitude = longitude
            base.defaults.headers.latitude = latitude
            context.commit(SET_LONGITUDE, longitude)
            context.commit(SET_LATIUDE, latitude)
          }
        })
      })
      let param = GetLocalStorage('JSAPI_PARAM', 3600 * 1000)
      if (!param) {
        let url = location.href.split('#')[0]
        getJsApiParams(url).then(res => {
          if (res && res.code === 200) {
            param = JSON.parse(res.data)
            SetLocalStorage('JSAPI_PARAM', param)
            wx.config({
              debug: false,
              appId: param.appId,
              nonceStr: param.nonceStr,
              timestamp: param.timeStamp,
              signature: param.signature,
              jsApiList: ['getLocation']
            })
          }
        })
      } else {
        wx.config({
          debug: false,
          appId: param.appId,
          nonceStr: param.nonceStr,
          timestamp: param.timeStamp,
          signature: param.signature,
          jsApiList: ['getLocation']
        })
      }
    } else {
      if (navigator.geolocation) {
        let options = {
          enableHighAccuracy: true,
          maximumAge: 5000
        }
        // 浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(
          async position => {
            // 经度
            let longitude = position.coords.longitude
            // 纬度
            let latitude = position.coords.latitude
            base.defaults.headers.longitude = longitude
            base.defaults.headers.latitude = latitude
            context.commit(SET_LONGITUDE, longitude)
            context.commit(SET_LATIUDE, latitude)
            // console.log('浏览器定位：' + longitude + '，' + latitude)
          },
          error => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                Vue.toasted.show('定位失败,请用户先开启位置请求！')
                break
              case error.POSITION_UNAVAILABLE:
                Vue.toasted.show('定位失败,位置信息是不可用！')
                break
              case error.TIMEOUT:
                Vue.toasted.show('定位失败,请求获取用户位置超时！')
                break
              case error.UNKNOWN_ERROR:
                Vue.toasted.show('定位失败,定位系统失效！')
                break
            }
          },
          options
        )
      } else {
        // 浏览器不支持geolocation
        Vue.toasted.show('您的浏览器不支持地理位置定位！')
      }
    }
  }
}
