<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">我的爱车</x-header>
    <div class="content">
      <car-card
        v-for="(item, index) in data"
        :key="item.car_id"
        :data="item"
        :edit="true"
        @defaultChange="defaultChange"
        @edit="editCar"
        @delete="deleteCar"></car-card>
      <withoutdata v-if="data.length === 0" label="没有车辆数据"/>
    </div>
    <fixed-bot-btn @click="$router.push('/myCarForm')">添加爱车</fixed-bot-btn>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import carCard from '@comps/card/carCard'
  import withoutdata from '@comps/withoutdata'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import { getCarList, deleteCar, setDefaultCar } from '@api'
  import { mapMutations, mapState } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import Vue from 'vue'
  import { Confirm } from 'wc-messagebox'
  import 'wc-messagebox/style.css'
  Vue.use(Confirm)

  export default {
    components: {
      XHeader,
      carCard,
      withoutdata,
      fixedBotBtn
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 设置常用车
      async defaultChange (item) {
        if (!item.status) {
          item.is_default = 1
          item.status = true
          return
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await setDefaultCar(item.car_id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data.map(i => {
            i.is_default = (i === item) ? 1 : 0
            i.status = (i === item)
          })
        }
      },
      // 编辑爱车
      async editCar (item) {
        this.$router.push('/myCarForm/' + item.car_id)
      },
      // 删除爱车
      async deleteCar (item) {
        let self = this
        this.$confirm({
          title: '',
          content: '您确定要删除吗？',
          yesText: '确定',
          noText: '我再想想',
          yesStyle: {
            'background-color': '#f15353',
            'color': '#ffffff',
            'font-size': '16px'
          },
          noStyle: {
            'color': '#666666',
            'font-size': '16px'
          }
        }).then(() => {
          self.setLoading({
            status: true,
            opacity: 0
          })
          deleteCar(item.car_id).then(res => {
            self.setLoading(false)
            if (res && res.code === 200) {
              this.loadCars()
            }
          })
        }).catch(() => {

        })
      },
      // 加载我的爱车
      async loadCars () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getCarList()
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
        }
      }
    },
    async activated () {
      this.loadCars()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }
</style>
