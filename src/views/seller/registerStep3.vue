<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">商家入驻</x-header>
    <step v-model="step"
          background-color='#f7f7f7'>
      <step-item title="商家信息"
                 class="step-item"></step-item>
      <step-item title="店铺信息"
                 class="step-item"></step-item>
      <step-item title="企业信息"
                 class="step-item"></step-item>
    </step>
    <div class="content">
      <msg :title="title"
           :description="description"
           :buttons="buttons"
           :icon="icon"></msg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import { XButton, Step, StepItem, Msg, XHeader } from 'vux'

export default {
  components: {
    XHeader,
    Step,
    StepItem,
    XButton,
    Msg
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      step: 3,
      title: '',
      description: '',
      icon: '',
      buttons: [{
        type: 'warn',
        text: '返回首页',
        onClick: this.gotoHome.bind(this)
      }]
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    async gotoHome () {
      this.$router.replace('/home')
    },
    async gotoSellerRegister () {
      this.$router.replace({
        path: '/sellerRegister',
        query: {
          a: 'reject'
        }
      })
    },
    loadResult () {
      if (this.user.seller_status === -1) {
        // 审核未通过
        this.icon = 'warn'
        this.title = '审核不通过'
        this.description = '<p>商城期待您的加入</p><p>补全信息后请重新提交申请</p>'
        this.buttons.push({
          type: 'default',
          text: '修改资料',
          onClick: this.gotoSellerRegister.bind(this)
        })
      } else if (this.user.seller_status === 0) {
        // 等待审核
        this.icon = 'waiting'
        this.title = '已提交等待审核'
        this.description = '<p>商城期待您的加入</p><p>审核通过后登录到PC端开始体验吧</p>'
      } else if (this.user.seller_status === 1) {
        // 审核通过
        this.icon = 'success'
        this.title = '审核通过'
        this.description = '<p>商城欢迎您的加入</p><p>登录到PC端开始体验吧，记得添加商品哦！</p><p>商户中心网址：http://sh.hxing999.com</p><p>访问账号密码即为会员账号密码</p>'
      }
    }
  },
  created () {
    let self = this
    this.$store.dispatch('getUserInfo', () => {
      self.loadResult()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.content {
  padding-top: $default_toolbar_height;
  height: calc(100% - #{$default_navbar_height});
}
</style>

<style lang="scss">
@import "../../assets/css/pub";

.vux-step {
  position: fixed;
  top: $default_navbar_height;
  left: 0;
  padding: 30px;
  width: 100%;
  height: $default_buytoolbar_height;
  background-color: $default_background_color;
  z-index: 9;
}
.vux-step-item-title {
  font-size: $default_font_size !important;
}
.weui-cells:before {
  z-index: 1;
}
.vux-step-item-icon {
  width: auto !important;
}
.weui-msg__desc {
  p {
    margin-top: 10px;
  }
}
</style>
