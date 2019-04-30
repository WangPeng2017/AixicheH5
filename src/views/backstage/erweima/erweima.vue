<template>
  <div>
    <Header title="二维码"
            titleColor="#fff"
            style="background: #FF0036; color: #fff;"></Header>
    <section class="section">
      <div class="box">
        <p class="name">
          <img :src="store"
               alt="" />爱惜车一店
        </p>
        <p class="place">郑州市二七区南三环连云路都市广场</p>

        <p class="tab">
          <span :class="!state ? 'tab-item active' : 'tab-item' "
                @click="setState(0)">收款码</span>
          <span :class="state ? 'tab-item active' : 'tab-item' "
                @click="setState(1)">商家码</span>
        </p>
        <p class="erweima">
          <img src="data:image/png;base64,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"
               alt="" />
        </p>
        <p class="share"
           v-show="state">
          <span class="share-btn">分享二维码</span>
        </p>
      </div>

    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton } from 'vux'
export default {
  name: 'erweima',
  components: {
    Header,
    XButton
  },
  data () {
    return {
      store: require('Assets/img/store.png'),
      state: 0
    }
  },
  methods: {
    setState (state) {
      this.state = state
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: #ff0036;
  padding: 30px 40px 0 40px;

  .box {
    background: #fff;
    padding: 10px 25px;
    text-align: center;
    .name {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ff0036;

      margin: 10px 0;
      img {
        width: 14px;
        margin-right: 5px;
        vertical-align: bottom;
      }
    }

    .place {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ff0036;
      margin-bottom: 20px;
    }

    .tab {
      .tab-item {
        display: inline-block;
        width: 71px;
        height: 26px;
        line-height: 26px;
        margin: 0 10px;
        color: #ff0036;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
      }
      .active {
        background: #ff0036;
        color: #fff;
        color: rgba(255, 255, 255, 1);
      }
    }

    .erweima {
      width: 100%;
      margin: 20px 0;

      img {
        width: 100%;
      }
    }

    .share {
      .share-btn {
        margin-bottom: 20px;
        display: inline-block;
        width: 100%;
        height: 37px;
        line-height: 37px;
        color: #fff;
        background: rgba(255, 0, 54, 1);
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(247, 247, 247, 1);
      }
    }
  }
}
</style>

