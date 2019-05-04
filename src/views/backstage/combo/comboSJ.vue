<template>
  <div>
    <Header title="商家套餐"></Header>
    <section class="section">
      <tab :line-width="2"
           default-color="#000000"
           active-color="#ff0000"
           bar-active-color="#ff0000"
           custom-bar-width="60px">
        <tab-item @on-item-click="getData(0)"
                  selected>待审核</tab-item>
        <tab-item @on-item-click="getData(200)">已审核</tab-item>
        <tab-item @on-item-click="getData(100)">未通过</tab-item>
        <tab-item @on-item-click="getData(3)">已过期</tab-item>
      </tab>
      <div class="section-box">
        <swipeout>
          <swipeout-item @on-close="handleEvents('on-close')"
                         @on-open="handleEvents('on-open')"
                         transition-mode="follow"
                         class="swipeout-item">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav', 11)"
                               :width="40"
                               style="background:#FF0036;">修改</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete', 22)"
                               :width="40"
                               style="background:#999;">下架</swipeout-button>
            </div>
            <div slot="content"
                 class="card vux-1px-t">
              <img :src="defaultGoods"
                   alt="" />
              <div class="right">
                <p class="line1">
                  <span class="money">￥300.00</span>
                  <span class="sales">累计销量 : 23</span>
                  <span class="state">审核状态 : 待审核</span>
                </p>
                <p class="line2">
                  <span class="cardType">购物卡</span>
                  <span class="isSales">是否上架 : 是</span>
                </p>
                <p class="line3">
                  <span class="date">有效期 : 2019-9-23</span>
                  <span class="isExpired">是否过期 : 否</span>
                  <span class="toDetail"
                        @click="toDetail('购物卡',1)">详情></span>
                </p>

              </div>
            </div>
          </swipeout-item>
          <swipeout-item @on-close="handleEvents('on-close')"
                         @on-open="handleEvents('on-open')"
                         transition-mode="follow"
                         class="swipeout-item">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav', 11)"
                               :width="40"
                               style="background:#FF0036;">修改</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete', 22)"
                               :width="40"
                               style="background:#999;">下架</swipeout-button>
            </div>
            <div slot="content"
                 class="card vux-1px-t">
              <img :src="defaultGoods"
                   alt="" />
              <div class="right">
                <p class="line1">
                  <span class="money">￥300.00</span>
                  <span class="sales">累计销量 : 23</span>
                  <span class="state">审核状态 : 待审核</span>
                </p>
                <p class="line2">
                  <span class="cardType">服务卡</span>
                  <span class="isSales">是否上架 : 是</span>
                </p>
                <p class="line3">
                  <span class="date">有效期 : 2019-9-23</span>
                  <span class="isExpired">是否过期 : 否</span>
                  <span class="toDetail"
                        @click="toDetail('服务卡',1)">详情></span>
                </p>

              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </section>
    <x-button @click.native="submitCard"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">发布套餐</x-button>
  </div>
</template>

<script>
import { GetSellerPackageList } from '@api'
import Header from 'Common/Header'
import {
  Tab,
  TabItem,
  Search,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton
} from 'vux'
export default {
  name: 'comboSJ',
  components: {
    Header,
    Tab,
    TabItem,
    Search,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      defaultGoods: require('Assets/img/defaultGoods.png'),
      sellerPackageList: []
    }
  },
  created () {
    this.getData(0)
  },
  methods: {
    async fetchSellerPackageList (status) {
      let page = 1
      let rows = 10
      let keyword = ''
      let sellerId = sessionStorage.getItem('seller_id')
      let packageType = this.$route.query.packageType
      let auditStatus = status
      let consumptionTypes = -1
      let sellerPackageList = await GetSellerPackageList(page,
        rows,
        keyword,
        sellerId,
        packageType,
        auditStatus,
        consumptionTypes)
      if (sellerPackageList && sellerPackageList.status === 200) {
        this.sellerPackageList = sellerPackageList.data
        console.log(this.sellerPackageList)
      }
    },
    getData (auditStatus) {
      console.log(auditStatus)
      this.fetchSellerPackageList(auditStatus)
    },
    onButtonClick (type, id) {
      alert('on button click ' + type)
    },
    handleEvents (type, id) {
      console.log('event: ', type)
    },
    submitCard () {
      this.$router.push({ name: 'addSJCard' })
    },
    toDetail (type, id) {
      if (type === '购物卡') {
        this.$router.push({ name: 'sureSJCardDetail' })
      } else {
        this.$router.push({ name: 'sureSJCardDetail' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-button {
  display: inline-block;
  font-size: 14px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: -12px;
  right: 0px;
}

.section {
  position: absolute;
  width: 100%;
  bottom: 45px;
  top: 45px;
  overflow: auto;

  .section-box {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 44px;
    overflow-y: auto;
  }

  .swipeout-item {
    border-top: 5px solid #f6f6f6;
  }

  .card {
    display: flex;
    padding: 8px;
    img {
      width: 75px;
      height: 37px;
      margin-right: 10px;
    }

    .right {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      width: 100%;
      .line1 {
        display: flex;
        margin-bottom: 5px;
        .money {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 0, 54, 1);

          width: 26%;
        }
        .sales {
          width: 30%;
        }
      }
      .line2 {
        display: flex;
        margin-bottom: 5px;

        .cardType {
          width: 56%;
        }
      }
      .line3 {
        display: flex;
        .date {
          width: 56%;
        }
        .isExpired {
          width: 30%;
        }
        .toDetail {
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }

  @media screen and (max-width: 350px) {
    .card {
      padding: 8px 4px;
      img {
        margin-right: 5px;
      }
    }
  }
}
</style>

