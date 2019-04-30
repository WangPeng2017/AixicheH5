<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">
      行车路线
      <i slot="right" class="route-icon" @click="showRoute"></i>
    </x-header>
    <div class="content" id="container">
    </div>
    <map-route-panel ref="mapRoutePanel"></map-route-panel>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import mapRoutePanel from './components/routePanel'
  import AMap from 'AMap'
  let map = null
  export default {
    components: {
      XHeader,
      mapRoutePanel
    },
    data () {
      return {

      }
    },
    methods: {
      // 初始化高德地图
      init () {
        let self = this
        map = new AMap.Map('container', {
          // 默认郑州
          center: [113.658075, 34.745793],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.MapType',
          'AMap.Geolocation',
          'AMap.Driving'], function () {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar())
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map.addControl(new AMap.MapType())
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          let geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true
          })
          map.addControl(geolocation)

          let driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME,
            // map 指定将路线规划方案绘制到对应的AMap.Map对象上
            map: map,
            // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
            panel: 'panel'
          })
          geolocation.getCurrentPosition()

          AMap.event.addListener(geolocation, 'complete', function (result) {
            let slng = result.position.lng
            let slat = result.position.lat
            let elng = parseFloat(self.$route.query.lng)
            let elat = parseFloat(self.$route.query.lat)

            var startLngLat = [slng, slat]
            var endLngLat = [elng, elat]

            driving.search(startLngLat, endLngLat)
          })

          AMap.event.addListener(geolocation, 'error', function (result) {
            self.$toasted.show('很抱歉，无法获取您的位置！')
          })
        })
      },
      showRoute () {
        this.$refs.mapRoutePanel.show()
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

</style>
