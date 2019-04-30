<template>
  <div class="specPanel">
    <transition name="fade">
      <div class="back"
           v-show="status"
           @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper"
           v-show="status">
        <div class="title">
          <div class="left">
            <img v-lazy="goods.goods_img"
                 alt="" />
          </div>
          <div class="center">
            <p class="price">
              <em>￥</em>{{goods.goods_saleprice }}
            </p>
            <p class="stock"
               v-if="goods.goods_saletype === 1">库存：{{goods.goods_storage}}件</p>
            <p class="exp"
               v-if="goods.is_enablespec === 1">已选：{{goods.goods_sku ? goods.goods_sku.sku_valuenames + ' ' + goods.goods_buynum + (goods.goods_saletype === 1 ? '件' : '次') : '无'}}</p>
            <p class="exp"
               v-if="goods.is_enablespec === 0">已选：{{goods.goods_buynum}}{{goods.goods_saletype === 1 ? '件' : '次'}}</p>
          </div>
          <div class="right">
            <i class="close-icon"
               @click="status = false"></i>
          </div>
        </div>
        <div class="content">
          <!-- sku规格 -->
          <div class="item"
               v-for="attr in specData"
               v-if="goods.is_enablespec === 1">
            <p class="spec-title">{{attr.attr_shortname}}</p>
            <div class="spec-content">
              <span class="tag"
                    :class="{on: value.status}"
                    v-for="value in attr.values"
                    @click="statusChange(value, attr)">
                {{value.value_name}}
              </span>
            </div>
          </div>
          <!-- 购买数量 -->
          <div class="item item-count"
               v-if="goods.goods_saletype === 1">
            <div class="left">数量</div>
            <div class="right">
              <count-input v-model="goods.goods_buynum"
                           :min="1"
                           @change="numChange"></count-input>
            </div>
          </div>

          <div class="place-item"></div>
        </div>

        <div class="footer">
          <!-- 非扣分兑换商品显示加入购物车 -->
          <a v-if="goods.buy_status===1 && goods.goods_saletype === 1"
             href="javascript:void(0)"
             class="shoppingcart"
             @click="addShoppingCart">加入购物车</a>
          <!-- 非扣分兑换商品或服务显示立即购买 -->
          <a v-if="goods.buy_status===1 && goods.goods_saletype === 1"
             href="javascript:void(0)"
             class="buy"
             @click="buy">立即购买</a>
          <a v-if="goods.buy_status===1 && goods.goods_saletype === 2"
             href="javascript:void(0)"
             class="exchange"
             @click="buy">立即购买</a>
          <a v-if="goods.buy_status===2"
             href="javascript:void(0)"
             class="off">暂时缺货</a>
          <a v-if="goods.buy_status===3"
             href="javascript:void(0)"
             class="off">已过期</a>
          <a v-if="goods.buy_status===4"
             href="javascript:void(0)"
             class="off">已下架</a>
          <a v-if="goods.buy_status===5"
             href="javascript:void(0)"
             class="off">已停售</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import countInput from '@comps/countinput'

export default {
  props: {
    specData: {
      type: Array
    },
    goods: {
      type: Object
    }
  },
  components: {
    countInput
  },
  data: function () {
    return {
      status: false,
      transferStatus: false
    }
  },
  methods: {
    show () {
      this.status = true
    },
    hide () {
      this.status = false
    },
    appointShow () {
      this.$emit('appointShow')
    },
    statusChange (value, attr) {
      attr.values.map(i => {
        if (i === value) {
          i.status = !i.status
        } else {
          i.status = false
        }
      })
      this.$emit('updatePriceAndStock')
    },
    numChange () {
      if (this.goods.goods_buynum > this.goods.goods_storage) {
        this.goods.goods_buynum = this.goods.goods_storage
      }
    },
    addShoppingCart () {
      this.$emit('addShoppingCart')
    },
    buy () {
      this.$emit('buy')
    },
    exchange () {
      this.$emit('exchange')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.specPanel {
  .back {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .wrapper {
    padding: 0 20px;
    z-index: 3;
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    overflow: visible;
    .title {
      width: 100%;
      margin: 20px 0 0;
      text-align: center;
      font-size: $default_middlefont_size;
      color: $default_title_color;
      display: flex;
      padding-bottom: 30px;
      border-bottom: 1px solid $default_border_color;
      .left {
        width: 200px;
        height: 200px;
        padding: 10px;
        border: 2px solid $default_border_color;
        background-color: #fff;
        border-radius: 10px;
        margin-top: -40px;
      }
      .center {
        flex: 0 1 calc(100% - 240px);
        height: 160px;
        padding-left: 20px;
        p {
          text-align: left;
          color: $default_subtitle_color;
          font-size: $default_smallfont_size;
          line-height: 44px;
        }
        .price {
          font-size: $default_font_size;
          color: $default_red_color;
          vertical-align: middle;
          em {
            font-size: $default_smallfont_size;
            font-style: normal;
          }
        }
        .exp {
          @include textHideByLine(2);
        }
        .stock {
          vertical-align: middle;
        }
      }
      .right {
        width: 40px;
      }
      .close-icon {
        float: right;
        width: 24px;
        height: 24px;
        margin-top: 12px;
      }
    }
    .content {
      width: 100%;
      height: calc(100% - 320px);
      overflow: hidden;
      overflow-y: auto;
      .item {
        position: relative;
        overflow: hidden;
        padding: 20px 0;
        &:last-child {
          border-bottom: none;
        }
        &:not(:first-child) {
          border-top: 2px solid $default_border_color;
        }
        &.item-other {
          i {
            float: right;
            margin-top: 10px;
          }
        }
        &.item-store {
          border-top: 0;
          padding-top: 0;
          .spec-title {
            font-size: $default_smallfont_size;
          }
          .store {
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            font-size: $default_smallfont_size;
            height: 44px;
            line-height: 44px;
            i {
              margin-right: 20px;
            }
          }
        }
        &.item-count {
          height: $default_cell_height;
          line-height: $default_cell_height;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          .left {
            width: 100px;
          }
          .right {
            width: calc(100% - 100px);
            text-align: right;
          }
        }
        &.item-appoint {
          height: $default_cell_height;
          line-height: $default_cell_height;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          .left {
            width: 120px;
          }
          .center {
            flex: 0 1 calc(100% - 120px);
            text-align: right;
          }
          .right {
            width: 40px;
            text-align: right;
          }
        }
        .tag {
          font-size: $default_smallfont_size;
          padding: 5px 10px;
          background-color: #f0f2f5;
          border: 2px solid #f0f2f5;
          margin-bottom: 10px;
          margin-top: 10px;
          margin-right: 17px;
          height: 54px;
          line-height: 54px;
          text-align: center;
          vertical-align: middle;
          border-radius: 0px;
          -webkit-border-radius: 0px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          &.on {
            background-color: #fff;
            border: 2px solid $default_red_color;
            color: $default_red_color;
          }
        }
      }
      .place-item {
        height: $default_toolbar_height;
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      display: flex;
      a {
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        margin: 0;
        width: 50%;
        color: #fff;
        text-align: center;
      }
      .shoppingcart {
        background-color: $default_orange_color;
      }
      .buy {
        background-color: $default_red_color;
      }
      .exchange {
        background-color: $default_red_color;
        width: 100%;
      }
      .off {
        background-color: $default_disabled_background_color;
        width: 100%;
      }
    }
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: transform 0.5s;
}

.translate-enter,
.translate-leave-to {
  transform: translate(0, 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

