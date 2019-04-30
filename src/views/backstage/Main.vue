<template>
  <div>
    <Header title="红幸云商城后台管理中心"></Header>
    <section class="section">
      <section class="bg"
               :style="{backgroundImage:'url('+bg+')'}">
        <span class="logo">
          <img :src="logo"
               alt="" />
        </span>
        <span class="logoText">
          红幸云商
        </span>
      </section>
      <section class="nav">
        <div class="nav-box">
          <div class="nav-item"
               @click="toModule(index)"
               v-for="(app, index) in apps"
               :key="index">
            <img :src="app.url "
                 alt=" " />
            <span class="item-text">{{ app.title }}</span>
          </div>
        </div>
      </section>
      <section class="tool">
        <Panel link="http://www.baidu.com"
               v-for="n in 4"
               :key="n">
          <template slot="left">
            <p class="tool-left">
              <img :src="bell"
                   alt=""
                   class="tool-logo">
              <span class="tool-text">发货</span>
              <label>订单1625964154765468已成功发货</label>
            </p>
          </template>
          <template slot="right">
            <p class="tool-right">
              <label>2019-1-8 11:23</label>
            </p>
          </template>
        </Panel>
      </section>
    </section>

  </div>
</template>

<script>
import Header from 'Common/Header'
import Panel from 'Common/Panel'

export default {
  name: 'Main',
  components: {
    Header,
    Panel
  },
  data () {
    return {
      bg: require('Assets/img/main-bg.png'),
      logo: require('Assets/img/logo.png'),
      apps: [
        {
          title: '店铺信息',
          url: require('Assets/img/nav1.png')
        },
        {
          title: '财务',
          url: require('Assets/img/nav2.png')
        },
        {
          title: '返利',
          url: require('Assets/img/nav3.png')
        },
        {
          title: '套餐',
          url: require('Assets/img/nav4.png')
        },
        {
          title: '招聘',
          url: require('Assets/img/nav5.png')
        },
        {
          title: '订单',
          url: require('Assets/img/nav6.png')
        },
        {
          title: '二维码',
          url: require('Assets/img/nav7.png')
        },
        {
          title: '发布商品',
          url: require('Assets/img/nav8.png')
        },
        {
          title: '通知',
          url: require('Assets/img/nav9.png')
        }
      ],
      bell: require('Assets/img/bell.png'),
      seller_id: '624871d9-51e9-4fb9-be3b-a56384ab0859'
    }
  },
  created () {
    sessionStorage.setItem('seller_id', this.seller_id)
  },
  methods: {
    toModule (index) {
      let app
      switch (index) {
        case 0:
          app = 'shop'
          break
        case 1:
          app = 'finance'
          break
        case 2:
          app = 'rebate'
          break
        case 3:
          app = 'combo'
          break
        case 4:
          app = 'publishJob'
          break
        case 5:
          app = 'order'
          break
        case 6:
          app = 'erweima'
          break
        case 7:
          app = 'publishGoods'
          break
        case 8:
          app = 'inform'
          break
        default:
          app = 'publishGoods'
          break
      }
      this.$router.push({ name: app })
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
}
.bg {
  width: 100%;
  height: 146px;
  position: relative;
  text-align: center;
  .logo {
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%, 0%);

    img {
      width: 70px;
    }
  }
  .logoText {
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #fff;
    position: absolute;
    bottom: 35px;
    transform: translate(-50%, 0);
  }
}

.nav {
  border-bottom: 10px solid #f6f6f6;
  padding-bottom: 10px;
  overflow: hidden;
  background: #fff;
  .nav-box {
    width: 80%;
    padding: 18px 0;
    margin: auto;

    .nav-item {
      float: left;
      width: 25%;
      height: 80px;
      border-radius: 50%;
      text-align: center;
      img {
        width: 50px;
      }

      .item-text {
        font-size: 12px;
        color: #000;
        margin-top: 7px;
        display: block;
      }
    }
  }
}

.tool {
  background: #fff;
  .tool-left {
    height: 42px;

    .tool-logo {
      width: 11px;
      height: 10px;
      display: inline-block;
      margin-top: 7px;
    }
    .tool-text {
      font-size: 12px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }

    label {
      display: block;
      font-size: 12px;
      transform: scale(0.9);
      position: absolute;
      left: 0;
      padding-left: 5px;
      line-height: 1.5;
    }
  }

  .tool-right {
    label {
      display: block;
      font-size: 12px;
      transform: scale(0.9);
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding-left: 5px;
      line-height: 1.5;
    }
  }
}
</style>
