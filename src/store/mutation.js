'use strict'

import {
  SET_TOKEN,
  SET_USER,
  SET_LOADING,
  SET_LATIUDE,
  SET_LONGITUDE,
  LOGOUT,
  SET_CITY,
  SET_GPSCITY,
  SET_REGIONID,
  SET_GPSREGIONID,
  SET_OPENID
} from './type'
import { base } from '@api'

export default {
  [SET_TOKEN] (state, token) {
    state.token = token
    localStorage.setItem('token', token)
    base.defaults.headers.token = token || ''
  },
  [SET_USER] (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  [SET_LOADING] (state, loading) {
    if (typeof loading === 'boolean') {
      if (!loading) {
        state.loading.status = loading
      } else {
        state.loading.status = loading
        state.loading.opacity = 1
      }
    } else {
      state.loading = loading
    }
  },
  [SET_LATIUDE] (state, latiude) {
    state.latitude = latiude
    localStorage.setItem('latiude', latiude)
  },
  [SET_LONGITUDE] (state, longitude) {
    state.longitude = longitude
    localStorage.setItem('longitude', longitude)
  },
  [LOGOUT] (state) {
    localStorage.clear()
    state.token = false
    state.openid = false
    state.user = {}
  },
  [SET_CITY] (state, city) {
    state.city = city
    localStorage.setItem('city', city)
  },
  [SET_REGIONID] (state, regionId) {
    state.regionId = regionId
    localStorage.setItem('regionId', regionId)
    base.defaults.headers.region_id = regionId || null
  },
  [SET_GPSCITY] (state, city) {
    state.gpsCity = city
    localStorage.setItem('gpsCity', city)
  },
  [SET_GPSREGIONID] (state, regionId) {
    state.gpsRegionId = regionId
    localStorage.setItem('gpsRegionId', regionId)
  },
  [SET_OPENID] (state, openid) {
    state.openid = openid
    localStorage.setItem('openid', openid)
  }
}
