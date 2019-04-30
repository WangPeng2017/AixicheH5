<template>
  <div class="view">
    <div class="content">
      <div class="coupon">
        <h3>{{data.coupon_namedesc}}</h3>
        <p>￥{{data.coupon_money}}</p>
      </div>
      <div class="coupon-info">
        <p>{{data.coupon_userange===0 ? '全店商品通用' : '仅限部分商品'}}</p>
        <p class="time"><i></i>有效日期：{{data.coupon_usestartdate}} 至 {{data.coupon_useenddate}}</p>
        <p>使用限制：{{data.coupon_usemode === 0 ? '不限额' : ('满' + data.coupon_ordermoney + '使用')}}</p>
      </div>
      <div class="coupon-btn">
        <x-button type="warn" @click.native="addCouponOrder" plain>立即领取</x-button>
        <x-button type="default" @click.native="gotoHome">返回首页</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import { XButton } from 'vux'
  import { getCouponDetail, addCouponOrder } from '@api'

  export default {
    components: {
      XButton
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
      // 返回首页
      gotoHome () {
        this.$router.replace('/home')
      },
      // 领取优惠券
      async addCouponOrder (item) {
        this.setLoading({
          status: true,
          opacity: 0
        })

        let id = this.$route.query.id
        let form = new FormData()
        form.append('coupon_id', id)
        let res = await addCouponOrder(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show('您已成功领取一张优惠券！')
        }
      },
      // 加载优惠券详情
      async loadCoupon () {
        document.title = this.$route.query.title || '领券'
        let id = this.$route.query.id
        if (id) {
          this.setLoading({
            status: true,
            opacity: 0
          })
          let res = await getCouponDetail(id)
          this.setLoading(false)
          if (res && res.code === 200) {
            this.data = res.data
          }
        }
      }
    },
    created () {
      this.loadCoupon()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    height: 100%;
  }

  .coupon {
    width: 100%;
    height: 400px;
    background: url(../../assets/image/coupon.jpg) repeat-x left bottom #e73641;
    background-size: auto 8px;
    color: #fff;
    text-align: center;
    h3 {
      position: absolute;
      top: 60px;
      width: 100%;
      color: #ffe617;
    }
    p {
      line-height: 72px;
      font-size: 72px;
      position: absolute;
      top: 176px;
      width: 100%;
    }
  }

  .coupon-info {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding: 20px;
    p {
      line-height: 48px;
      padding: 0 20px;
      span {
        color: #e73641;
        display: inline-block;
      }
    }
  }

  .coupon-btn {
    margin-top: 40px;
    padding: 20px;
    .btn {
      color: #e73641;
      background-color: #fff;
      border-color: #e73641;
      border-radius: 3px;
    }
  }
</style>
