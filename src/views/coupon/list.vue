<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">{{$route.query.title}}</x-header>
    <div class="content">
      <div class="mescroll"
           id="coupon_mescroll">
        <div class="scroll">
          <coupon-card :data="item"
                       v-for="item in data"
                       :key="item.coupon_id"
                       @handleClick="addCouponOrder"></coupon-card>
        </div>
        <div id="coupon_noData"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import couponCard from '@comps/card/couponCard'
import MeScroll from 'mescroll.js'
import { mapMutations } from 'vuex'
import { getCouponList, addCouponOrder } from '@api'
import qs from 'qs'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    XHeader,
    couponCard
  },
  data () {
    return {
      data: [],
      meScroll: null,
      postData: {
        a: this.$route.query.a,
        seller_id: this.$route.query.seller_id,
        goods_id: this.$route.query.goods_id,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'create_time'
      }
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
        } else {
          this.meScroll = new MeScroll('coupon_mescroll', {
            up: {
              callback (page) {
                self.loadCoupons(page)
              },
              noMoreSize: 1,
              htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
              empty: {
                warpId: `coupon_noData`,
                tip: '没有更多的数据',
                icon: '/static/withoutData@2x.png'
              }
            }
          })
        }
      })
    },
    // 加载优惠券
    async loadCoupons (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size

      let res = await getCouponList(qs.stringify(this.postData))
      this.setLoading(false)
      if (res && res.code === 200) {
        if (page.num === 1) {
          this.data = []
        }
        this.data = [...this.data, ...res.data.list]
        let hasNext = (this.data.length < res.data.length)
        this.meScroll.endSuccess(res.data.length, hasNext)
      } else {
        this.meScroll.endErr()
      }
    },
    // 领取优惠券
    async addCouponOrder (item) {
      this.setLoading({
        status: true,
        opacity: 0
      })

      let form = new FormData()
      form.append('coupon_id', item.coupon_id)
      let res = await addCouponOrder(form)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$toasted.show('您已成功领取一张优惠券！')
        this.postData.page = 1
        this.initMeScroll()
      }
    }
  },
  created () {
    this.initMeScroll()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.card {
  &:first-child {
    margin-top: 20px;
  }
}
</style>
