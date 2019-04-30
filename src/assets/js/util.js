'use strict'
import 'jquery'

export const dataURItoBlob = (dataURI) => {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {type: mimeString})
}

export const findComponentUpward = (context, componentName, componentNames) => {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

export function isMobile () {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break }
  }
  return flag
}

export function isWeixin () {
  let wx = window.navigator.userAgent.match(/MicroMessenger/i)
  let isWeixin = (wx && wx[0].toLowerCase() === 'MicroMessenger'.toLowerCase())
  return isWeixin
}

export function getBase64 (img) {
  function getBase64Image (img) {
    // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    let dataURL = canvas.toDataURL()
    return dataURL
  }
  let image = new Image()
  image.crossOrigin = ''
  image.src = img
  let deferred = $.Deferred()
  if (img) {
    image.onload = function () {
      // 将base64传给done上传处理
      deferred.resolve(getBase64Image(image))
    }
    // 问题要让onload完成后再return sessionStorage['imgTest']
    return deferred.promise()
  }
}

export function urlArgs () {
  let args = {}
  let query = location.search.substring(1)
  let pairs = query.split('&')
  for (let i = 0; i < pairs.length; i++) {
    let pos = pairs[i].indexOf('=')
    if (pos === -1) continue
    let name = pairs[i].substring(0, pos)
    let value = pairs[i].substring(pos + 1)
    value = decodeURIComponent(value)
    args[name] = value
  }
  return args
}

export function removeAllSpace (str) {
  return str.replace(/\s+/g, '')
}

export function convertTimespanToDate (time) {
  return new Date(parseInt(time.replace('/Date(', '').replace(')/', ''), 10))
}

export function fromDate (dateTimeStamp) {
  let result = ''
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let year = month * 12
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return ''
  }
  let yearC = diffValue / year
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute

  if (yearC >= 1) {
    let date = new Date(dateTimeStamp)
    result = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
  } else if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function formatTime (time, fmt) {
  let o = {
    'h+': time.Hours,
    'm+': time.Minutes,
    's+': time.Seconds
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function getWeekdayName (date) {
  let weekday = date.getDay()
  if (weekday === 0) {
    return '周日'
  } else if (weekday === 1) {
    return '周一'
  } else if (weekday === 2) {
    return '周二'
  } else if (weekday === 3) {
    return '周三'
  } else if (weekday === 4) {
    return '周四'
  } else if (weekday === 5) {
    return '周五'
  } else if (weekday === 6) {
    return '周六'
  } else {
    return ''
  }
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
