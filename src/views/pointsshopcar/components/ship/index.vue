<template>
  <div class="panel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <x-header :left-options="{showBack: false}" class="vux-1px-b">
          {{seller.order_type === 1 ? '配送方式' : '服务方式'}}
          <i class="close-icon" slot="right" @click="status = false"></i>
        </x-header>
        <div class="content">
          <div class="mescroll" id="shopselect_mescroll">
            <div class="scroll">
              <group :gutter="10">
                <radio :options="shippingList" v-model="shipping_method"></radio>
              </group>
              <group title="快递公司（可选）" v-if="shipping_method===1 && expressList.length > 0">
                <checklist :options="expressList" v-model="expressidList" :max="1"></checklist>
              </group>
              <group title="选择店铺" v-if="(shipping_method===2 || shipping_method===3) && shopList.length > 0">
                <checklist :options="shopList" v-model="shopidList" :max="1" :min="1" :required="true"></checklist>
              </group>
            </div>
            <div id="shopselect_noData" style="display: none;"></div>
          </div>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" class="ok" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Radio, Group, Checklist } from 'vux'
  import { getSellerShopList } from '@api'
  import MeScroll from 'mescroll.js'
  import { mapMutations } from 'vuex'
  import qs from 'qs'
  import {SET_LOADING} from '@store/type'

  export default {
    components: {
      Group,
      Radio,
      Checklist
    },
    data: function () {
      return {
        status: false,
        seller: {},
        shipping_method: 0,
        shipping_methoddesc: '',
        shippingList: [],
        expressList: [],
        expressidList: [],
        shopList: [],
        shopidList: [],
        postData: {
          seller_id: null,
          package_id: null,
          page: 1,
          rows: 20,
          sord: 'asc',
          sidx: 'shop_distance'
        },
        meScroll: null
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载店铺
      async loadShops (page) {
        this.setLoading({
          status: true,
          opacity: 0
        })
        this.postData.page = page.num
        this.postData.rows = page.size
        let res = await getSellerShopList(qs.stringify(this.postData))
        this.setLoading(false)
        if (res && res.code === 200) {
          if (page.num === 1) {
            this.data = []
            this.shopList = []
          }
          let shopList = []
          res.data.list.map(i => {
            i.key = i.shop_id
            if (i.shop_distance) {
              i.value = i.shop_name + '(' + i.shop_distance.toFixed(1) + 'km)'
            } else {
              i.value = i.shop_name
            }
            i.inlineDesc = i.shop_address
            shopList.push(i)
          })
          this.shopList = [...this.shopList, ...shopList]
          let hasNext = (this.shopList.length < res.data.length)
          this.meScroll.endSuccess(res.data.length, hasNext)
        } else {
          this.meScroll.endErr()
        }
      },
      // 初始化滚动区
      initMeScroll () {
        let self = this
        this.$nextTick(() => {
          if (this.meScroll) {
            self.loadShops({
              num: 1,
              size: 10
            })
          } else {
            this.meScroll = new MeScroll('shopselect_mescroll', {
              up: {
                callback (page) {
                  self.loadShops(page)
                },
                noMoreSize: 1,
                htmlNodata: '<p class="upwarp-nodata"></p>',
                empty: {
                  warpId: 'shopselect_noData',
                  tip: '没有更多的数据',
                  icon: '/static/withoutData@2x.png'
                }
              },
              down: {
                use: false
              }
            })
          }
        })
      },
      show (seller) {
        this.status = true
        this.seller = seller
        // 加载配送方式
        this.shippingList = []
        if (seller.order_type === 1) {
          // 商品订单
          this.shippingList.push({key: 1, value: '商家配送'})
          let isenableselfget = seller.goods.every(g => g.is_enableselfget === 1)
          if (isenableselfget) {
            this.shippingList.push({key: 2, value: '到店自提'})
          }
        } else if (seller.order_type === 2) {
          // 服务订单
          this.shippingList.push({key: 3, value: '到店服务'})
          let isenablevisit = seller.goods.every(g => g.is_enablevisit === 1)
          if (isenablevisit) {
            this.shippingList.push({key: 4, value: '上门服务'})
          }
        }
        this.shipping_method = seller.shipping_method
        this.shipping_methoddesc = seller.shipping_methoddesc
        // 加载快递公司
        this.expressList = []
        seller.expressList.map(e => {
          this.expressList.push({
            key: e.express_id,
            value: e.express_name
          })
        })
        // 设置快递公司选中状态
        this.expressidList = []
        if (seller.shipping_expressid) {
          this.expressidList.push(seller.shipping_expressid)
        }
        // 加载商家店铺
        this.postData.package_id = null
        this.postData.seller_id = seller.seller_id
        // 加载套餐参与店铺
        if (seller.deductible_package_orderid) {
          let order = seller.packageList.find(o => o.order_id === seller.deductible_package_orderid)
          if (order.consumption_types === 1 && order.package_type === 1) {
            this.postData.package_id = order.package_id
            this.postData.seller_id = null
          }
        }
        // 加载商家店铺
        this.initMeScroll()
        // 设置店铺选中
        this.shopidList = []
        if (seller.shop_id) {
          this.shopidList.push(seller.shop_id)
        }
      },
      hide () {
        this.status = false
      },
      ok () {
        this.seller.shipping_method = this.shipping_method
        let shipname = this.shippingList.find(i => i.key === this.shipping_method).value
        this.seller.shipping_methoddesc = shipname      // 设置配送的显示名称
        // 商品订单
        if (this.seller.order_type === 1) {
          // 三方配送
          if (this.seller.shipping_method === 1) {
            // 设置选中的快递公司
            if (this.expressidList.length > 0) {
              let expressid = this.expressidList[0]
              let expressname = this.expressList.find(i => i.key === expressid).value
              this.seller.shipping_expressid = expressid      // 设置选中快递公司id
              this.seller.shipping_methoddesc = expressname   // 设置配送显示快递公司名称
            } else {
              this.seller.shipping_expressid = null           // 清空选中快递公司
            }
          }
          // 上门自提
          if (this.seller.shipping_method === 2) {
            if (this.shopidList.length === 0) {
              this.$toasted.show('请先选择一个商家店铺！')
              return
            }
            this.seller.shipping_expressid = null   //  清空配送快递公司
            let shopid = this.shopidList[0]
            let shop = this.shopList.find(i => i.shop_id === shopid)
            this.seller.shop_id = shop.shop_id
            this.seller.shop_name = shop.shop_name
            this.seller.shop_address = shop.shop_address
            this.seller.shop_logo = shop.shop_logo
            this.seller.shop_distance = shop.shop_distance
          }
        }
        // 服务订单
        if (this.seller.order_type === 2) {
          let shipname = this.shippingList.find(i => i.key === this.shipping_method).value
          this.seller.shipping_methoddesc = shipname

          // 到店服务
          if (this.seller.shipping_method === 3) {
            if (this.shopidList.length === 0) {
              this.$toasted.show('请先选择一个商家店铺！')
              return
            }
            this.seller.shipping_expressid = null   //  清空配送快递公司
            let shopid = this.shopidList[0]
            let shop = this.shopList.find(i => i.shop_id === shopid)
            this.seller.shop_id = shop.shop_id
            this.seller.shop_name = shop.shop_name
            this.seller.shop_address = shop.shop_address
            this.seller.shop_logo = shop.shop_logo
            this.seller.shop_distance = shop.shop_distance
          }
        }
        this.hide()
        this.$emit('handleClick', this.seller)
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .panel {
    .back {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .wrapper {
      z-index: 3;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .content {
        width: 100%;
        height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
        overflow: hidden;
        overflow-y: auto;
        background-color: $default_background_color;
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 99;
      a {
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        margin: 0;
        width: 100%;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        display: block;
        float: left;
      }
      .ok {
        background-color: $default_red_color;
      }
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

