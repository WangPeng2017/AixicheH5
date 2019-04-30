<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">商家付款码</x-header>
      <div class="midbox">
        <p class="seller" style="font-size:16px;font-family:MicrosoftYaHei;"><i class="shopname-icon"></i>{{msg}}</p>
          <p class="seladdress" style="font-size:12px;font-family:MicrosoftYaHei;">{{addresss}}</p>
            <ul>
               <li :class="{ on: isonup}" style="font-size:18px;font-family:MicrosoftYaHei;"  @click="_loginway()">收款码</li>
               <li :class="{ on: !isonup}" style="font-size:18px;font-family:MicrosoftYaHei;" @click="_loginwayww()">商家码</li>
            </ul>
        <div class="tabtab">
          <div class=" " v-show="isonup">
          	 <p><vue-qr :logoSrc="config.imagePath" :text="config.value" :size="260" :dot-scale="1" :margin="0"></vue-qr></p>
          </div>
        <div class="con" v-show="!isonup">
           <!--<p>商家码呀</p> -->
          <p><vue-qr :logoSrc="config.imagePath" :text="config.value" :size="260" :dot-scale="1" :margin="0"></vue-qr></p>
          <button>分享二维码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  data () {
    return {
      msg: '商家店铺名称',
      addresss: '商家地址商家地址商家地址',
      config: {
        value: 'https://hxapi.axccn.cn/index.html#/myquickpay', // 显示的值，跳转的地址
        imagePath: require('../../../assets/image/hongxing_icon@2x.png'), // 中间logo的地址
        SHimage: require('../../../assets/image/hongxing_icon@2x.png')// 中间logo的地址
      },
      isonup: true
    }
  },
  components: {
    VueQr
  },
  // computed: {},
  //   // 事件（钩子）回调函数
  //   // 组建创建之后，数据已经完成初始化，但是DOM还未生成
  // created () {},
  //   // 数据装载DOM上后，各种数据已经就位，将数据渲染到DOM上，DOM已经完成
  // mounted () {},
  methods: {
    _loginway () {
      (this.isonup === true) ? this.isonup = true : this.isonup = true
    },
    _loginwayww () {
      (this.isonup === false) ? this.isonup = false : this.isonup = false
    }
  }

}
</script>

<style lang="scss" scoped>
.view {
    text-align: center;
    background:#ff0036;
    .midbox{
      width: 80%;
      height:76%;
      background-color: #fff;
      margin: 6% 10%;
      text-align: center;
      .seller {
          color: #ff0036;
          // font-size: 18px;
          padding-top: 5%;
        }
      .seladdress {
        color: #ff0036;
        font-family:MicrosoftYaHei;
        font-weight:400;
      }
      ul{
        margin-top: 10%;
        li{
        display: inline-block;
        color: #ff0036;
        width:25%;
        line-height: 52px;
        margin: 0 8%;
        // font-size:24px;
      }
    }
      li:hover {
        color: #fff;
        background: #ff0036;
        }
      .tabtab{
        margin-top: 5%;
        .con{
          margin-top: 5%;
          text-align: center;
        }
        button{
            width: 491px;
            height: 74px;
            color: #fff;
            background: #ff0036;
            border: 0;
            position: fixed;
            bottom: 18%;
            left:18%;
          }
      }
  }
}
</style>