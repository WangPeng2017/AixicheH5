<template>
  <my-input
    type="number"
    v-model="code"
    placeholder="请输入短信验证码"
    @input="handleChange">
    <i class="msgcode-icon icon"></i>
    <button type="button" class="codeBtn" slot="button" @click="sendSms" ref="codeBtn" :disabled="disabled">获取验证码</button>
  </my-input>
</template>

<script>
  import myInput from '../input'
  import { sendSms } from '@api'
  export default {
    components: {
      myInput
    },
    props: {
      mobile: {
        type: String
      },
      type: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        seconds: 60,
        timer: null,
        code: '',
        disabled: false
      }
    },
    methods: {
      handleChange (val) {
        this.$emit('input', val)
      },
      sendSms () {
        if (this.seconds < 60) {
          this.$toasted.show('请在' + this.seconds + '秒后再发送！')
          return false
        }
        if (this.mobile.length <= 0) {
          this.$toasted.show('请先输入手机号！')
          return false
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.mobile)) {
          this.$toasted.show('手机号格式错误！')
          return false
        }
        this.disabled = true
        sendSms(this.mobile, this.type).then(res => {
          if (res && res.code === 200) {
            this.$toasted.show('短信发送成功，请注意查收！')
            this.timer = setInterval(() => {
              this.seconds--
              this.$refs.codeBtn.innerHTML = this.seconds + '秒'
              if (this.seconds === -1) {
                this.seconds = 60
                this.disabled = false
                this.$refs.codeBtn.innerHTML = '获取验证码'
                clearInterval(this.timer)
              }
            }, 1000)
          } else {
            this.disabled = false
          }
        })
      }
    },
    watch: {
      code (val) {
        this.$emit('input', val)
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .codeBtn {
    padding: 12px 28px;
    background: $default_red_color;
    color: #fff;
    border-radius: 10px;
    border: 0;
    font-size: $default_font_size;
    flex: none;

    &:disabled {
      background: $default_disabled_background_color;
    }
  }
</style>
