<template>
  <div class="header-wrapper"
       :class="{withoutUser: !token}">
    <figure class="user">
      <div class="top-row">
        <div class="left">
          <img :src="data.head_img || userHead"
               alt
               v-imgField
               @click="$router.push('/myUpdate')">
        </div>
        <div class="right">
          <p class="user-name"
             v-if="data.true_name"
             @click="$router.push('/myUpdate')">{{data.true_name}}</p>
          <!--快速支付  图标-->
          <!-- <i class="QuickPay_icon" v-if="data.true_name" @click="$router.push('/myquickpay')"></i> -->
          <!--商家收款  图标-->
          <!-- <i class="recivemoney_icon" v-if="data.true_name" @click="$router.push('/myrecivemoney')"></i> -->
          <!-- <i class="invite-icon" v-if="data.true_name" @click="$router.push('/myinvite')"></i> -->
          <i class="right setting-black-icon"
             v-if="data.true_name"
             @click="$router.push('/mySetting')"></i>

          <div class="withoutUser"
               v-if="!token">
            <span>未登录</span>
          </div>
          <span class="level"
                @click="$router.push('/mymember')"><img v-if="data.account_level_id==1"
                 style="width: 70px;"
                 src="../../../assets/image/VIPPT.png"><img v-if="data.account_level_id==2"
                 style="width: 70px;"
                 src="../../../assets/image/VIPCZ.png"><img v-if="data.account_level_id==3"
                 style="width: 70px;"
                 src="../../../assets/image/VIPCJ.png"><img v-if="data.account_level_id==4"
                 style="width: 70px;"
                 src="../../../assets/image/VIPZJ.png"><img v-if="data.account_level_id==5"
                 style="width: 70px;"
                 src="../../../assets/image/VIPGJ.png"></span>
          <!-- <span class="level"
                v-if="data.true_name"
                @click="$router.push('/mymember')">{{data.user_level}}</span> -->
          <!-- <span class="invitecode"
                v-if="data.true_name"
                v-clipboard:copy="data.invite_code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">专属邀请码：{{data.invite_code}}</span> -->
        </div>
      </div>
      <div class="bottom-row">
        <div slot="content"
             v-if="data.true_name"
             class="card-grid-flex">
          <div class="vux-1px-r"
               @click="$router.push('/myjifenpage')">
            <p><img style="width: 20px;"
                   src="../../../assets/image/jifenicon.png"></p>
            {{data.user_integral}}
          </div>
          <div class="vux-1px-r"
               @click="$router.push('/mybackpricepage')">
            <p><img style="width: 20px;"
                   src="../../../assets/image/fanliicon.png"></p>
            {{data.user_money}}
          </div>
          <div class="vux-1px-r">
            <p @click="$router.push('/myimmediately')"><img style="width: 20px;"
                   src="../../../assets/image/tixianicon.png"></p>
            {{data.user_money}}
          </div>
        </div>
        <div slot="content"
             v-else
             class="card-grid-flex">
          <div class="vux-1px-r"
               @click="$router.push('/myjifenpage')">
            <p><img style="width: 20px;"
                   src="../../../assets/image/jifenicon.png"></p>
            {{jifen}}
          </div>
          <div class="vux-1px-r"
               @click="$router.push('/mybackpricepage')">
            <p><img style="width: 20px;"
                   src="../../../assets/image/fanliicon.png"></p>
            {{backprice}}
          </div>
          <div class="vux-1px-r">
            <p @click="$router.push('/myimmediately')"><img style="width: 20px;"
                   src="../../../assets/image/tixianicon.png"></p>
            {{cash}}
          </div>
        </div>
      </div>
    </figure>
  </div>
</template>

<script>
import userHead from '../../../assets/image/user_head.png'
import { mapState } from 'vuex'

export default {
  props: ['data'],
  data () {
    return {
      userHead,
      jifen: '0',
      backprice: '0',
      cash: '0'
    }
  },
  methods: {
    // 复制成功
    onCopy (e) {
      this.$toasted.show('复制成功，粘贴使用！')
    },
    // 复制失败
    onError (e) {
      this.$toasted.show('复制失败！')
    }
  },
  computed: {
    ...mapState(['token', 'user'])
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/pub";
.header-wrapper {
  position: relative;
  height: 280px;
  background-image: url("../../../assets/image/bgredq.png");
  background-size: cover;
  margin-bottom: 65px;
  padding-top: 90px;
  padding-left: 3%;

  .user {
    width: 97%;
    height: 240px;
    background-color: #fff;
    background-image: url("../../../assets/image/aaamoutain.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-y: 105%;
    border-radius: 10px;
    .top-row {
      height: 1.6rem;
      padding-left: 0.533333rem;
      padding-right: 0.266667rem;
      .left {
        position: absolute;
        width: 2.133333rem;
        height: 2.133333rem;
        border-radius: 50%;
        margin-top: -0.633333rem;
        border: 0.106667rem solid #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .right {
        padding-left: 0.266667rem;
        .withoutUser {
          position: absolute;
          top: 20%;
          left: 35%;
          transform: translate(0, -50%);
        }
        .user-name {
          color: #797e89;
          position: absolute;
          top: 45%;
          left: 35%;
          transform: translate(0, -50%);
        }
        i {
          position: absolute;
          top: 38.6%;
          left: 85.5%;
        }
        .level {
          position: absolute;
          top: 55%;
          left: 35%;
          border-radius: 10px;
        }
        .invitecode {
          font-size: 15px;
          position: absolute;
          top: 55%;
          left: 50%;
          border-radius: 10px;
          color: #a9a4a4;
          padding: 1%;
        }
        .invite-icon {
          margin-left: -45px;
        }
        .QuickPay_icon {
          margin-left: -110px;
        }
        .recivemoney_icon {
          margin-left: -160px;
        }
      }
    }
    .bottom-row {
      margin-top: 0;
      .card-grid-flex {
        display: flex;
        padding: 20px 0;
        div {
          flex: 1;
          text-align: center;
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
        }
        p {
          font-size: $default_middlefont_size;
          color: $default_font_color;
        }
        .vux-1px-r::after {
          border: 0;
        }
      }
    }
  }
}
.withoutUser {
  position: relative;
  > * {
    position: relative;
    z-index: 2;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
