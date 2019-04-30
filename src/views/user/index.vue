<template>
  <div class="view">
    <div class="content">
      <user-header :data="user" @gotoOther="gotoOther"></user-header>
      <card class="collect-card">
        <div slot="content" class="card-grid-flex">
          <div class="vux-1px-r" @click="$router.push('/myCollectionGoods')">
            <p>{{ user.goods_collectnum || 0 }}</p>
            商品收藏
          </div>
          <div class="vux-1px-r" @click="$router.push('/myCollectionPackage')">
            <p>{{ user.package_collectnum || 0 }}</p>
            套餐收藏
          </div>
          <div @click="$router.push('/myCollectionSeller')">
            <p>{{ user.seller_collectnum || 0 }}</p>
            店铺关注
          </div>
        </div>
      </card>

      <card class="grid-card">
        <cell slot="header" class="vux-1px-b" title="我的订单" value="全部订单" is-link @click.native="gotoOrder(-1)"></cell>
        <div slot="content" class="card-grid-flex">
          <div @click="gotoOrder(1)">
            <p><i class="unpaid-icon order-icon"></i></p>
            待付款
          </div>
          <div @click="gotoOrder(2)">
            <p><i class="fahuo-icon order-icon"></i></p>
            待发货
          </div>
          <div @click="gotoOrder(3)">
            <p><i class="shouhuo-icon order-icon"></i></p>
            待收货
          </div>
          <div @click="gotoOrder(200)">
            <p><i class="not-evaluated-icon order-icon"></i></p>
            待评价
          </div>
          <div @click="gotoAfterSale()">
            <p><i class="customer-service-icon order-icon"></i></p>
            退换/售后
          </div>
        </div>
      </card>

      <card class="grid-card">
        <cell slot="header" class="vux-1px-b" title="我的财富"></cell>
        <div slot="content" class="card-grid-flex">
          <div @click="$router.push({path: '/myPackage', query: {tab: 1}})">
            <p><i class="vip-icon icon"></i></p>
            套餐
          </div>
          <div @click="$router.push({path: '/myCoupon', query: {tab: 0}})">
            <p><i class="coupon-icon icon"></i></p>
            优惠券
          </div>
        </div>
      </card>

      <card class="grid-card margin-bottom">
        <cell slot="header" class="vux-1px-b" title="汽车服务"></cell>
        <div slot="content" class="card-grid-flex">
          <div @click="$router.push('/myCar')">
            <p><i class="car-insurance-icon icon"></i></p>
            我的爱车
          </div>
          <div @click="gotoUsedcar()">
            <p><i class="usedcar-icon icon"></i></p>
            二手车
          </div>
          <div @click="gotoRentcar()">
            <p><i class="rentalcar-icon icon"></i></p>
            租车
          </div>
        </div>
      </card>
      <card class="grid-card">
        <cell slot="header" class="vux-1px-b" title="其他服务"></cell>
        <div slot="content" class="card-grid-flex">
          <div @click="gotoJob()">
            <p><i class="job-icon icon"></i></p>
            求职
          </div>
          <div @click="gotoTransfer()">
            <p><i class="transfer-icon icon"></i></p>
            转让
          </div>
          <div @click="gotoSellerRegister()">
            <p><i class="sellerreg-icon icon"></i></p>
            商家入驻
          </div>
        </div>
      </card>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import footerNav from '@comps/footerNav'
  import userHeader from '@comps/header/userHeader'
  import { Cell, Group, Card } from 'vux'

  export default {
    components: {
      footerNav,
      userHeader,
      Group,
      Cell,
      Card
    },
    computed: {
      ...mapState(['user', 'token'])
    },
    methods: {
      gotoSellerRegister () {
        if (this.user.user_type === 1) {
          this.$router.push('/sellerRegisterStep3')
        } else if (this.user.user_type === 2) {
          this.$router.push('/sellerRegister')
        }
      },
      gotoOrder (status) {
        this.$router.push({
          path: '/myOrder',
          query: {
            tab: status
          }
        })
      },
      gotoAfterSale () {
        this.$router.push('/myRefund')
      },
      gotoJob () {
        this.$router.push('/myJob')
      },
      gotoTransfer () {
        this.$router.push('/myTransfer')
      },
      gotoUsedcar () {
        this.$router.push('/myUsedcar')
      },
      gotoRentcar () {
        this.$router.push('/myRentcar')
      },
      gotoCarSticker () {
        this.$router.push('/myCarSticker')
      },
      gotoOther () {
        let redirUrl = 'http://axc.tgchat.cn'
        redirUrl += '?source=axc'
        if (this.token) {
          redirUrl += '&token=' + this.token
        }
        if (this.user.user_id) {
          redirUrl += '&uid=' + this.user.user_id
        }
        if (this.user.first_header) {
          redirUrl += '&first_header=' + this.user.first_header
        }
        location.href = redirUrl
      }
    },
    created () {
    },
    activated () {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_tabbar_height});
  }

  .title {
    font-size: $default_font_size;
    font-weight: normal;
  }

  .header-wrapper {
    position: relative;
    height: 396px;
    background-image: url("./../../assets/image/headbackimg.png");
    background-size: cover;
  }
  .withoutUser {
    position: relative;
    > * {
      position: relative;
      z-index: 2;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /*background-color: rgba(0, 0, 0, .5);*/
    }
  }

  .collect-card {
    margin-top: 0;
    .card-grid-flex {
      display: flex;
      padding: 20px 0;
      div {
        flex: 1;
        text-align: center;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
      }
      p {
        font-size: $default_font_size;
        color: $default_font_color;
      }
    }
  }

  .grid-card {
    .vux-1px-b:after {
      border: 2px solid $default_border_color;
    }
    .card-grid-flex {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      padding-top: 30px;
      div {
        width: 20%;
        margin-bottom: 30px;
        text-align: center;
        font-size: $default_middlefont_size;
      }
    }
  }

  .order-icon {
    margin-bottom: 20px;
    width: 68px;
    height: 62px;
  }

  .icon {
    margin-bottom: 20px;
    width: 48px;
    height: 48px;
  }

  .row {
    i {
      margin-right: 20px;
    }
  }
</style>

