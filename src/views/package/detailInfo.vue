<template>
  <div class="subview" v-if="data.package_id">
    <div class="subcontent">
      <div class="packageMsg" v-if="data">
        <div class="packageImage">
          <img :src="data.package_img" alt="" v-imgField/>
        </div>
        <p class="packageName">
          <package-tag :data="data"></package-tag>
          {{ data.package_title }}
        </p>
        <p class="packageSummary" v-if="data.package_abstract != null">{{ data.package_abstract }}</p>
        <p class="packagePrice">
          <span class="price"><em>￥</em>{{data.package_price.toFixed(2)}}</span>
          <span class="salecount">已售出：{{data.salesnum}}</span>
        </p>
        <div class="packageLimit">
          <div>有效期： {{data.expirydate}}</div>
          <div>限购数量： {{data.is_limit_buy === 1 ? '每人' + data.user_buynum + '个' : '不限制'}}</div>
        </div>
      </div>
      <seller-card class="packageSeller" :data="data" v-if="data.package_type===0"></seller-card>
      <group  v-if="data.package_type===1">
        <cell title="参与商家" is-link @click.native="$router.push('/sellerListForPackage/' + data.package_id)"></cell>
      </group>
      <div class="packageGoods" v-if="packageGoodsData && packageGoodsData.length > 0">
        <divider class="divider">套餐商品</divider>
        <goods-card v-for="item in packageGoodsData" :key="item.id" :data="item" :consumption_types="data.consumption_types" :type="display"></goods-card>
      </div>

      <div class="more" v-show="showMore">
        <a class="btn morebtn" @click="gotoMore">查看更多套餐商品</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { Divider, Group, Cell } from 'vux'
  import sellerCard from '@comps/card/sellerCard/navigation'
  import goodsCard from '@comps/card/goodsCard/package'
  import packageTag from '@comps/tag/packageTag'
  import { getPackageDetail, addPackageOrder, getGoodsListForPackage } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations, mapState } from 'vuex'
  import qs from 'qs'

  export default {
    components: {
      Divider,
      Group,
      Cell,
      sellerCard,
      goodsCard,
      packageTag
    },
    data () {
      return {
        data: {
        },
        packageGoodsData: [],
        display: true,
        showMore: false,
        showMoreSize: 10,
        postData: {
          package_id: this.$route.params.id,
          page: 1,
          rows: 10,
          sord: 'asc',
          sidx: 'seller_distance'
        }
      }
    },
    computed: {
      ...mapState(['token']),
      ...mapState(['longitude', 'latitude'])
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载套餐基本信息
      async loadPackage () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let lng = this.longitude || 0
        let lat = this.latitude || 0
        let res = await getPackageDetail(this.$route.params.id, lng, lat)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
          let buystatus = 0
          if (res.data.audit_status === 200 && res.data.package_status === 1 && res.data.expirystatus !== 1) {
            // 可买
            buystatus = 1
          } else if (res.data.audit_status === 200 && res.data.package_status === 1 && res.data.expirystatus === 1) {
            // 已过期
            buystatus = 3
          } else if (res.data.audit_status === 200 && res.data.package_status !== 1) {
            // 下架
            buystatus = 4
          } else if (res.data.audit_status !== 200) {
            // 停售
            buystatus = 5
          }
          this.data = {
            ...this.data,
            buy_status: buystatus
          }
          this.$emit('loadInfo', this.data)
        }
      },
      async loadPackageGoods () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        this.postData.longitude = this.longitude || 0
        this.postData.latitude = this.latitude || 0
        let res = await getGoodsListForPackage(qs.stringify(this.postData))
        this.setLoading(false)
        if (res && res.code === 200) {
          this.packageGoodsData = [...this.packageGoodsData, ...res.data.list]
          if (res.data.length > this.showMoreSize) {
            this.showMore = true
          } else {
            this.showMore = false
          }
        }
      },
      // 购买套餐
      async buy () {
        this.setLoading({
          status: true,
          opacity: 0
        })

        let form = new FormData()
        form.append('package_id', this.data.package_id)
        let res = await addPackageOrder(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          let no = res.data.order_no
          let totalPayprice = res.data.order_price
          this.$router.push({
            path: '/cashier',
            query: {
              id: no,
              no: no,
              price: totalPayprice,
              type: 'package',
              body: no,
              attach: true
            }
          })
        }
      },
      // 查看更多套餐商品
      gotoMore: async function () {
        this.$router.push({
          path: '/goodsListForPackage',
          query: {
            id: this.$route.params.id,
            title: this.data.package_title,
            consumption_types: this.data.consumption_types
          }
        })
      }
    },
    created () {
      this.loadPackage()
      this.loadPackageGoods()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .position-vertical-demo {
    background-color: #ffe26d;
    color: #333;
    text-align: center;
    padding: 15px;
  }

  .packageMsg {
    padding: 20px 0 0;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.13);

    .packageImage {
      img {
        width: calc(100% - 40px);
        height: 300px;
        margin: 0 20px;
        border-radius: 20px;
      }
    }
    .packageName {
      padding: 0 20px;
      margin-top: 20px;
      font-size: $default_font_size;
      color: $default_title_color;
      line-height: 40px;
    }
    .packageSummary {
      padding: 0 20px;
      margin-top: 20px;
      font-size: $default_font_size;
      color: $default_subtitle_color;
      line-height: 40px;
    }
    .packagePrice {
      padding: 0 20px;
      margin-top: 20px;
      font-size: $default_bigfont_size;
      line-height:40px;
      height: 40px;
      em {
        font-size: $default_smallfont_size;
        font-style: normal;
      }
      .price {
        float: left;
        color: $default_price_color;
      }
      .salecount {
        float: right;
        color: $default_subtitle_color;
        font-size: $default_middlefont_size;
      }
    }
    .packageLimit {
      margin-top: 20px;
      width: 100%;
      padding: 0 20px;
      display: inline-flex;
      border-top: 1px solid $default_border_color;
      div {
        flex: 1;
        align-items: center;
        font-size: $default_middlefont_size;
        line-height: $default_cell_height;
        height: $default_cell_height;
        text-align: left;
        vertical-align: middle;
        color: $default_subtitle_color;
        &:last-child {
          text-align: right;
          border-left: 1px solid $default_border_color;
        }
      }
    }
  }

  .packageSeller {
    margin-top: 20px;
  }

  .packageGoods {
    .divider {
      margin: 20px 200px;
    }
  }

  .more {
    margin-bottom: 20px;
    width: 100%;
    height: $default_cell_height;
    line-height: $default_cell_height;
    text-align: center;
    font-size: $default_font_size;
    .morebtn {
      display: block;
      border-left: 0;
      border-right: 0;
      border-top: 1px solid $default_border_color;
      border-bottom: 1px solid $default_border_color;
      color: $default_subtitle_color;
      background-color: #fff;
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(0, 100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
