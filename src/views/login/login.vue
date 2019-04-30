<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">登录</x-header>
    <tab :line-width="3"
         v-model="tab">
      <tab-item class="vux-center"
                v-for="(item, index) in data"
                @click="tab = login"
                :key="index">{{item}}</tab-item>
    </tab>
    <div class="content">
      <swiper v-model="tab"
              :show-dots="false">
        <swiper-item>
          <div class="form">
            <my-input type="number"
                      v-model="smsform.mobile"
                      placeholder="请输入手机号">
              <i class="account-icon icon"></i>
            </my-input>
            <my-code-input :type="2"
                           :mobile="smsform.mobile"
                           v-model="smsform.yzm"></my-code-input>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="form">
            <my-input type="number"
                      placeholder="请输入手机号"
                      v-model="pwdform.mobile">
              <i class="account-icon icon"></i>
            </my-input>
            <my-input v-model="pwdform.password"
                      placeholder="请输入密码"
                      type="password">
              <i class="pwd-icon icon"></i>
            </my-input>
          </div>
        </swiper-item>
      </swiper>
      <div class="bottom">
        <div>
          <button class="submit"
                  @click="submit">登录</button>
        </div>
        <div class="choose">
          <router-link to="/regist?invitecode=000000">注册账号</router-link>
          <router-link to="/forget">忘记密码</router-link>
        </div>
      </div>
      <!--<div class="other">-->
      <!--<div class="title">-->
      <!--<div class="line"></div>-->
      <!--<span>第三方账号登录</span>-->
      <!--<div class="line"></div>-->
      <!--</div>-->
      <!--<div class="list">-->
      <!--<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx03d4832e201feb16&redirect_uri=http%3a%2f%2fapi.axccn.cn%2fUser%2fOauthorize&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">-->
      <!--<i class="iconfont icon-weixin"></i>-->
      <!--</a>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import myInput from './components/input'
import myCodeInput from './components/codeInput'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    myInput,
    myCodeInput
  },
  data () {
    return {
      data: ['快捷登录', '账号密码登录'],
      tab: 0,
      smsform: {
        mobile: '',
        yzm: ''
      },
      pwdform: {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      let form = new FormData()
      if (this.tab === 0) {
        if (!this.smsform.mobile || this.smsform.mobile.length <= 0) {
          this.$toasted.show('请输入手机号！')
          return false
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.smsform.mobile)) {
          this.$toasted.show('请输入正确的手机号码！')
          return false
        }
        if (!this.smsform.yzm || this.smsform.yzm.length <= 0) {
          this.$toasted.show('请输入短信验证码！')
          return false
        }
        // 快捷登录
        form.append('mobile', this.smsform.mobile)
        form.append('yzm', this.smsform.yzm)
        form.append('mode', 'sms')
      } else if (this.tab === 1) {
        if (!this.pwdform.mobile || this.pwdform.mobile.length <= 0) {
          this.$toasted.show('请输入手机号！')
          return false
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.pwdform.mobile)) {
          this.$toasted.show('请输入正确的手机号码！')
          return false
        }
        if (!this.pwdform.password || this.pwdform.password.length <= 0) {
          this.$toasted.show('请输入密码！')
          return false
        }
        // 账号密码登录
        form.append('mobile', this.pwdform.mobile)
        form.append('password', this.pwdform.password)
        form.append('mode', 'pwd')
      }

      this.$store.dispatch('login', {
        form,
        count: -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.view {
  background-color: #fff;
}

.content {
  height: calc(100% - #{$default_navbar_height});
}

.form {
  margin-top: 80px;
  padding: 0 40px;
}

.bottom {
  padding: 20px 40px;
  div {
    margin-top: 20px;
    font-size: $default_font_size;
    color: $default_font_color;
  }

  .submit {
    width: 100%;
    height: 80px;
    background: $active_font_color;
    color: #fff;
    border-radius: 10px;
    border: 0;
    font-size: $default_font_size;
  }

  .choose {
    display: flex;
    justify-content: space-between;
  }
}

.other {
  width: 100%;
  height: 240px;
  position: fixed;
  bottom: 0;
  left: 0;
  .title {
    font-size: $default_font_size;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      width: 200px;
      height: 1px; /*no*/
      background-color: $default_font_color;
    }
    span {
      margin: 0 20px;
    }
  }
  .list {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    a {
      i {
        font-size: 90px;
        &.icon-qq {
          color: #49a3eb;
        }
        &.icon-weixin {
          color: #68d625;
        }
        &.icon-weibo {
          color: #e63c53;
        }
      }
    }
  }
}
</style>
