<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">忘记密码</x-header>
    <div class="content">
      <div class="form">
        <my-input type="number"
                  v-model="form.mobile"
                  placeholder="请输入手机号">
          <i class="account-icon icon"></i>
        </my-input>
        <my-code-input :mobile="form.mobile"
                       :type="3"
                       v-model="form.yzm"></my-code-input>
        <my-input v-model="form.newPassword"
                  placeholder="请输入新密码"
                  type="password">
          <i class="pwd-icon icon"></i>
        </my-input>
        <my-input v-model="form.surePassword"
                  placeholder="请再次输入新密码"
                  type="password">
          <i class="pwd-icon icon"></i>
        </my-input>
      </div>
      <div class="bottom">
        <div>
          <button class="submit"
                  @click="submit">重置密码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import myInput from './components/input'
import myCodeInput from './components/codeInput'
import { updatePwd } from '@api'
import { mapState, mapMutations } from 'vuex'
import { SET_LOADING } from '@store/type'

export default {
  components: {
    myInput,
    myCodeInput,
    XHeader
  },
  data () {
    return {
      form: {
        mobile: '',
        yzm: '',
        newPassword: '',
        surePassword: ''
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    async submit () {
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
      if (this.form.newPassword !== this.form.surePassword) {
        this.$toasted.show('输入的两次密码不一致！')
        return false
      }
      this.setLoading({
        status: true,
        opacity: 0
      })

      let form = new FormData()
      form.append('mobile', this.form.mobile)
      form.append('newPassword', this.form.newPassword)
      form.append('yzm', this.form.yzm)

      let res = await updatePwd(form)
      this.setLoading(false)
      if (res && res.code === 200) {
        localStorage.clear()
        this.$router.go(-1)
        this.$toasted.show(res.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
    margin-top: 20px;
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
