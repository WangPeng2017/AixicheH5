export const GetQueryString = name => {
  let url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let newUrl = window.location.search.substr(1).match(url)
  if (newUrl != null) {
    return unescape(newUrl[2])
  } else {
    return null
  }
}

// 获取文件后缀
export const GetType = file => {
  let filename = file
  let index1 = filename.lastIndexOf('.')
  let index2 = filename.length
  let type = filename.substring(index1, index2)
  return type
}

export const IsMobile = () => {
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export const IsWeixin = () => {
  let wx = window.navigator.userAgent.match(/MicroMessenger/i)
  let isWx = (wx && wx[0].toLowerCase() === 'MicroMessenger'.toLowerCase())
  return isWx
}

export const SetLocalStorage = (key, value) => {
  let curTime = new Date().getTime()
  if (value && key) {
    localStorage.setItem(key, JSON.stringify({data: value, time: curTime}))
  }
}

// exp毫秒
export const GetLocalStorage = (key, exp) => {
  if (!key) {
    return
  }

  let data = localStorage.getItem(key)
  if (data) {
    let dataObj = JSON.parse(data)
    if (new Date().getTime() - dataObj.time > exp) {
      return
    } else {
      let value = dataObj.data
      return value
    }
  }
}
