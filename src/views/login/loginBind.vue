<template>
  <div class="view">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              class="vux-1px-b"
              @on-click-back="$router.go(-2)">{{ $route.query.type | getTitle}}</x-header>
    <div class="content">
      <div class="top">
        <i class="wx-icon"
           v-if="$route.query.type==='wx'"></i>
        <i class="relation-icon"></i>
        <i class="axc-icon"></i>
      </div>
      <div class="form">
        <p>请绑定红幸云商账号，便于下次快速登录。</p>
        <my-input type="number"
                  v-model="form.mobile"
                  placeholder="请输入手机号">
          <i class="account-icon icon"></i>
        </my-input>
        <my-code-input :type="4"
                       :mobile="form.mobile"
                       v-model="form.yzm"></my-code-input>
        <my-input v-if="!seller_code"
                  type="number"
                  v-model="form.yqm"
                  placeholder="请输入邀请人手机号">
          <i class="account-icon icon"></i>
        </my-input>
        <span v-if="seller_code">商家邀请码：{{seller_code}} </span>
      </div>
      <div class="bottom">
        <div>
          <check-icon :value.sync="accept"
                      type="plain"></check-icon><span>接受<a href="javascript:void(0);"
               @click="gotoHelp('regist', '红幸云商平台服务协议')">《红幸云商平台服务协议》</a></span>
        </div>
        <div>
          <button class="submit"
                  @click="submit">完成绑定</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { CheckIcon } from 'vux'
import myInput from './components/input'
import myCodeInput from './components/codeInput'
import { mapMutations } from 'vuex'
import { bind } from '@api'
import { SET_LOADING } from '@store/type'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Confirm)
export default {
  components: {
    CheckIcon,
    myInput,
    myCodeInput
  },
  filters: {
    getTitle (item) {
      if (item === 'wx') {
        return '微信联合登录'
      } else if (item === 'qq') {
        return 'QQ联合登录'
      } else if (item === 'alipay') {
        return '支付宝联合登录'
      }
    }
  },
  data () {
    return {
      form: {
        mobile: '',
        yzm: '',
        yqm: ''
      },
      accept: true,
      seller_code: this.$route.query.code,
      user_openid: this.$route.query.openid
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    async submit () {
      if (!this.accept) {
        this.$toasted.show('请先阅读红幸云商用户服务协议并点击接受！')
        return false
      }
      if (!this.form.mobile || this.form.mobile.length <= 0) {
        this.$toasted.show('请输入手机号！')
        return false
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.mobile)) {
        this.$toasted.show('请输入正确的手机号码！')
        return false
      }
      if (!this.form.yzm || this.form.yzm.length <= 0) {
        this.$toasted.show('请输入短信验证码！')
        return false
      }
      if (!this.seller_code || this.seller_code.length <= 0) {
        if (!this.form.yqm || this.form.yqm.length <= 0) {
          if (!confirm('您未输入邀请人号码！确定继续绑定，取消返回填写！')) {
            return false
          }
        } else {
          if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.yqm)) {
            this.$toasted.show('请输入正确的邀请人手机号码！')
            return false
          }
        }
      } else {
        this.form.yqm = this.seller_code
      }
      this.setLoading({
        status: true,
        opacity: 0
      })
      let form = new FormData()
      form.append('mobile', this.form.mobile)
      form.append('yzm', this.form.yzm)
      form.append('openid', this.$route.query.openid)
      form.append('type', this.$route.query.type)
      form.append('mode', 'sms')
      form.append('yqm', this.form.yqm)
      let res = await bind(form)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$store.dispatch('relationLogin', {
          form,
          count: -2
        })
      }
      if (res && res.code === 400) {
        this.$toasted.show(res.msg)
      }
    },
    gotoHelp (id, title) {
      this.$router.push({
        path: '/help/' + id,
        query: { title: title }
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

.form {
  margin-top: 80px;
  padding: 0 40px;
}

.top {
  margin-top: 60px;
  text-align: center;
  .zfb-icon {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
  }

  .wx-icon {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
  }

  .axc-icon {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
  }

  .relation-icon {
    margin: 0 20px;
    width: 60px;
    height: 60px;
    background-size: 60px 60px;
  }
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
}
</style>
