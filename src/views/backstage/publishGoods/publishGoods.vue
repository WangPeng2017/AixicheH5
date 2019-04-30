<template>
  <div>
    <Header title="商品列表">
      <template slot="right">
        <span class="header-button">编辑</span>
      </template>
    </Header>
    <section class="section">
      <tab :line-width="2"
           default-color="#000000"
           active-color="#ff0000"
           bar-active-color="#ff0000"
           custom-bar-width="100px">
        <tab-item @on-item-click="getData(0)"
                  selected>已审核</tab-item>
        <tab-item @on-item-click="getData(1)">待审核</tab-item>
      </tab>
      <van-search show-action
                  :placeholder="placeholder"
                  v-model="value">
        <div slot="action"
             style="line-height:24px;"
             @click="onSearch">搜索</div>
      </van-search>
      <div class="section-box">
        <swipeout>
          <swipeout-item v-for="n in 10"
                         :key="n"
                         @on-close="handleEvents('on-close')"
                         @on-open="handleEvents('on-open')"
                         transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')"
                               :width="40"
                               style="background:#DCDCDC;">修改</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')"
                               :width="40"
                               style="background:#FF0036;">删除</swipeout-button>
            </div>
            <div slot="content"
                 class="goods vux-1px-t"
                 @click="toDetail(1)">
              <img :src="goods"
                   class="goods-img"
                   alt="" />
              <div class="goods-box">
                <p class="goods-title">白酒整箱特价茅台镇53度酱香型国酱1949纯粮食原浆礼盒酒 精致洗车深度洗车镀晶打蜡</p>
                <p class="goods-price">售价：￥369</p>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </section>
    <x-button @click.native="submitGoods"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">发布商品</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Search } from 'vant'
import {
  Tab,
  TabItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton
} from 'vux'
export default {
  name: 'PublishGoods',
  components: {
    Header,
    Tab,
    TabItem,
    [Search.name]: Search,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      results: [],
      value: '',
      placeholder: '输入商品名称',
      goods: require('Assets/img/logo.png')
    }
  },
  methods: {
    getData (index) {
      console.log(index)
    },
    onSearch (value) {
      console.log(value)
    },
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    toDetail (id) {
      this.$router.push({ name: 'goodsDetail' })
    },
    submitGoods () {
      this.$router.push({ name: 'chooseClassify1' })
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
    top: 85px;
    overflow-y: auto;
  }

  .goods {
    border-bottom: 6px solid #f6f6f6;
    padding: 10px 6px;
    display: flex;

    .goods-img {
      width: 67px;
      height: 67px;
      display: inline-block;
      border: 1px solid #ccc;
    }
    .goods-box {
      padding-left: 10px;
      .goods-title {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 15px;
      }

      .goods-price {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 0, 54, 1);
        line-height: 15px;
        position: absolute;
        bottom: 20px;
      }
    }
  }
}
</style>

