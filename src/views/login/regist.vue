<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">用户注册</x-header>
    <div class="content">
      <div class="form">
        <my-input placeholder="请输入手机号"
                  v-model="form.mobile"
                  type="number">
          <i class="account-icon icon"></i>
        </my-input>
        <my-code-input :mobile="form.mobile"
                       v-model="form.yzm"></my-code-input>
        <my-input placeholder="请输入密码"
                  type="password"
                  v-model="form.password">
          <i class="pwd-icon icon"></i>
        </my-input>
        <my-input v-if="this.$route.query.invitecode"
                  placeholder="请输邀请人手机号"
                  v-model="form.yqm"
                  type="text">
          <i class="yqm-icon icon"></i>
        </my-input>
      </div>
      <div class="bottom">
        <div>
          <check-icon :value.sync="accept"
                      type="plain"></check-icon>
          <span>接受
            <a href="javascript:void(0);"
               @click="gotoHelp('regist', '红幸云商平台服务协议')">《红幸云商平台服务协议》</a>
          </span>
        </div>
        <div>
          <button class="submit"
                  @click="submit">提交注册</button>
        </div>
        <div>
          <a @click="$router.back()">已有账号，请直接登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, CheckIcon } from 'vux'
import myInput from './components/input'
import myCodeInput from './components/codeInput'
import { regist } from '@api'
import { mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    myInput,
    myCodeInput,
    XHeader,
    CheckIcon
  },
  data () {
    return {
      accept: true,
      form: {
        mobile: '',
        password: '',
        yzm: '',
        yqm: '',
        fxyqm: this.$route.query.first_header || ''
      }
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 用户注册
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
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.yqm)) {
        this.$toasted.show('请输入正确的邀请人手机号码！')
        return false
      }
      this.setLoading({
        status: true,
        opacity: 0
      })

      let form = new FormData()
      form.append('mobile', this.form.mobile)
      form.append('password', this.form.password)
      form.append('yzm', this.form.yzm)
      form.append('yqm', this.form.yqm)
      form.append('mode', 'pwd')
      form.append('fxyqm', this.form.fxyqm)
      let res = await regist(form)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$store.dispatch('login', {
          form,
          count: -2
        })
      }
    },
    gotoHelp (id, title) {
      this.$router.push({
        path: '/help/' + id,
        query: { title: title }
      })
    }
  },
  created () {
    if (this.$route.query.invitecode === '000000') {
      this.form.yqm = ''
    } else {
      this.form.yqm = this.$route.query.invitecode
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
