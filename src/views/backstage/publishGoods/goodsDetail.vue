<template>
  <div>
    <Header title="发布商品"></Header>
    <section class="section"
             :style="isNewPublish ? {bottom: '45px'} : {bottom: '0'}">
      <div class="goodsDetail">
        <van-swipe :autoplay="3000"
                   :show-indicators="true"
                   indicator-color="white"
                   :height="176">
          <van-swipe-item v-for="(image, index) in images"
                          :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="goods-title">
          精致洗车快速洗车深度洗车镀晶打蜡内饰清洗车身贴膜致洗车快速洗车深度洗车 镀晶打蜡内饰清洗车身贴膜
        </div>
        <div class="goods-other">
          <span class="other-goodsPrice">￥3600.00</span>
          <span class="other-goodsWarningNumber">库存预警：1000</span>
          <span class="other-goodsBrand">商品品牌：其他</span>
        </div>
        <div class="goods-introduction">
          <div class="introduction-title">
            商品介绍：
          </div>
          <div class="introduction-content">
            精致洗车快速洗车深度洗车镀晶打蜡内饰清洗车身贴膜致洗车快速洗车深度洗车精致洗车快速洗车深度洗车镀晶打蜡内饰清洗车身贴膜致洗车快速洗车深度洗车精致洗车快速洗车深度洗车镀晶打蜡内饰清洗车身贴膜致洗车快速洗车深度洗车
          </div>
        </div>
      </div>
    </section>
    <x-button @click.native="submitGoods"
              v-if="isNewPublish"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确定</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Swipe, SwipeItem } from 'vant'

import { XButton } from 'vux'
export default {
  name: 'addGoods',
  components: {
    Header,
    XButton,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      isNewPublish: 1,
      images: ['https://img.yzcdn.cn/1.jpg', 'https://img.yzcdn.cn/2.jpg']
    }
  },
  methods: {
    onUpload: function (val) {
      this.images = []
      this.images = val
    },
    showModel () {
      this.isShowChooseBrand = true
    },
    closeModel () {
      this.isShowChooseBrand = false
    },
    submitGoods () {
      this.$router.push({ name: 'publishGoods' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'publishGoods') vm.isNewPublish = 0
    })
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .goods-title {
    padding: 8px 15px;
    background: #fff;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 15px;
    font-size: 12px;
    margin-bottom: 3px;
  }

  .goods-other {
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 1);
    padding: 0 13px;
    margin-bottom: 3px;

    .other-goodsPrice {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 0, 54, 1);
    }

    .other-goodsWarningNumber,
    .other-goodsBrand {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin: 0 10px;
    }
  }
  .goods-introduction {
    background: #fff;
    padding: 10px;

    .introduction-title {
      margin-bottom: 5px;
    }
    .introduction-title,
    .introduction-content {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 1.5;
    }
  }
}
</style>

