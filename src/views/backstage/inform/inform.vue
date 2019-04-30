<template>
  <div>
    <Header title="通知"></Header>
    <section class="section">
      <div v-if="noData"
           class="noData">
        <img :src="bg"
             alt="">
        <p>暂无通知</p>
      </div>

      <div class="list-item"
           v-for="n in 3"
           :key="n"
           @click="toInformDetail(111)">
        <img :src="type1"
             alt=""
             class="item-logo" />
        <div class="itembox">
          <p class="item-title">
            联营套餐新优惠
            <span class="item-time">2019-1-8 15:56</span>
          </p>
          <p class="item-content">精致洗车深度洗车快速洗车镀晶打蜡四轮定位内饰清洗商品买卖...</p>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
export default {
  name: 'inform',
  components: {
    Header
  },
  data () {
    return {
      bg: require('Assets/img/informBg.png'),
      type1: require('Assets/img/inform-logo1.png'),
      type2: require('Assets/img/inform-logo2.png'),
      noData: false
    }
  },
  methods: {
    toInformDetail (id) {
      this.$router.push({ name: 'informDetail' })
    }
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

  .noData {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(237, 237, 237, 1);
    text-align: center;
    position: absolute;
    top: 100px;
    width: 100%;
    img {
      width: 90px;
      margin-bottom: 20px;
    }
  }

  .list-item {
    background: #fff;
    padding: 10px 16px;
    display: flex;
    margin-top: 4px;

    .item-logo {
      width: 47px;
      height: 47px;
    }

    .itembox {
      padding-left: 10px;
      .item-title {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-top: 5px;
        .item-time {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-left: 10px;
        }
      }

      .item-content {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 10px;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

