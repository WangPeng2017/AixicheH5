<template>
  <div id="app">
    <loading :show="loading.status"
             :opacity="loading.opacity">
    </loading>
    <transition :name="transitionName">
      <navigation>
        <router-view></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
import loading from './components/loading'
import { mapState, mapMutations } from 'vuex'
import { base, getRegionList, getCityList, getCurrentCity } from '@api'
import { SET_LOADING, SET_GPSCITY, SET_GPSREGIONID } from '@store/type'

export default {
  name: 'app',
  components: {
    loading
  },
  data () {
    return {
      transitionName: 'fade',
      rootPaths: [
        '/home',
        '/category',
        '/discover',
        '/shopcar',
        '/my',
        '/pointsshopcar'
      ],
      fadePaths: [
        '/home',
        '/category',
        '/discover',
        '/shopcar',
        '/my',
        '/pointsshopcar'
      ],
      item: 0
    }
  },
  computed: {
    ...mapState(['loading', 'token', 'regionId'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING,
      setGpsCity: SET_GPSCITY,
      setGpsRegionId: SET_GPSREGIONID
    }),
    //  应用初始化数据
    async init () {
      // 存储token和地区
      base.defaults.headers.token = this.token || ''
      base.defaults.headers.region_id = this.regionId
      this.bindEvent()

      this.loadRegions()
      this.loadCitys()
      this.loadCurrentCity()
    },
    // 绑定导航事件
    async bindEvent () {
      // bind event
      this.$navigation.on('forward', (to, from) => {
        this.transitionName = 'slide-left'
      })
      this.$navigation.on('back', (to, from) => {
        this.transitionName = 'slide-right'
      })
      this.$navigation.on('replace', (to, from) => {
        for (let path of this.fadePaths) {
          if (path === to.route.path) {
            this.transitionName = 'fade'
            break
          }
        }
        for (let path of this.rootPaths) {
          if (path === to.route.path) {
            this.$navigation.cleanRoutes()
            break
          }
        }
      })
      this.$navigation.on('refresh', (to, from) => {
      })
      this.$navigation.on('reset', () => {
      })
      // and use [once, off] methods
      this.$navigation.once('forward', () => {
      })
      const off = () => {
      }
      this.$navigation.on('forward', off)
      this.$navigation.off('forward', off)
    },
    // 加载省市区集合
    async loadRegions () {
      let regions = localStorage.getItem('regions')
      if (regions) return

      // 读取省市区
      let res = await getRegionList()
      if (res && res.code === 200) {
        localStorage.setItem('regions', JSON.stringify(res.data))
      }
    },
    // 加载城市集合
    async loadCitys () {
      let regions = localStorage.getItem('citys')
      if (regions) return

      // 读取省市区
      let res = await getCityList()
      if (res && res.code === 200) {
        localStorage.setItem('citys', JSON.stringify(res.data))
      }
    },
    // 加载当前城市
    async loadCurrentCity () {
      let self = this
      setTimeout(function () {
        self.setLoading({
          status: true,
          opacity: 0
        })
        getCurrentCity().then(res => {
          self.setLoading(false)
          if (res && res.code === 200) {
            if (res.data) {
              self.setGpsCity(res.data.name)
              self.setGpsRegionId(res.data.id)
            }
          }
        })
      }, 2000)
    }
  },
  created () {
    this.init()
  },
  watch: {
    $route () {
      this.$store.dispatch('getLocation')
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/pub.scss';
@import './assets/css/swiper';
@import './assets/css/icon.scss';

body {
  color: $default_font_color;
  font-size: $default_font_size !important;
  background: $default_background_color;
  font-family: $default_font_family;
  line-height: 1.5;
}

a {
  color: $default_font_color;
}

#app {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.empty-icon {
  width: 68px !important;
}

.mescroll-bar::-webkit-scrollbar {
  width: 0 !important;
}

.mescroll-empty {
  padding-top: 50%;
}
.margin-top {
  margin-top: 20px;
}

.margin-bottom {
  margin-bottom: 20px;
}

.text-right {
  text-align: right;
}

text-center {
  text-align: center;
}
text-left {
  text-align: left;
}

.clearfix {
  zoom: 1;
  &:after {
    content: '';
    clear: both;
    display: block;
    height: 0;
    visibility: hidden;
  }
}

.view {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}

.content {
  height: calc(100% - #{$default_navbar_height});
  overflow: hidden;
  overflow-y: auto;
}

.subview {
  height: 100%;
}

.card {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0px;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 1;
  transition: all 0s !important;
}
.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-right-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>

<style lang="less">
@import './assets/style/reset.css';
@import './assets/style/resetVux.less';
@import './assets/style/resetVant.less';
@import '~vux/src/styles/1px.less';
</style>
