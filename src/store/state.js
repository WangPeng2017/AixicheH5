'use strict'
export default {
  // 经度
  longitude: localStorage.getItem('longitude') || 0,
  // 纬度
  latitude: localStorage.getItem('latiude') || 0,
  // 当前城市
  city: localStorage.getItem('city') || '全国',
  regionId: localStorage.getItem('regionId') || 0,
  // 定位城市
  gpsCity: localStorage.getItem('gpsCity') || '',
  gpsRegionId: localStorage.getItem('gpsRegionId') || 0,
  // 用户token
  token: localStorage.getItem('token') || false,
  // 用户信息
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  // 微信关注用户openid
  openid: localStorage.getItem('openid') || false,
  // loading状态
  loading: {
    status: false,
    opacity: 1
  }
}
