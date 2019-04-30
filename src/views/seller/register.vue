<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">商家入驻</x-header>
    <step v-model="step" background-color='#f7f7f7'>
      <step-item title="商家信息" class="step-item"></step-item>
      <step-item title="店铺信息" class="step-item"></step-item>
      <step-item title="企业信息"  class="step-item"></step-item>
    </step>
    <div class="content">
      <div class="tooltip"  v-if="form.seller_status===-1">
        <h3>拒绝原因</h3>
        <p>{{form.seller_status_desc || '无'}}</p>
      </div>

      <group title="店主信息" class="margin-bottom">
        <x-input title="店主姓名" placeholder="请输入店主名称" v-model="form.contacts_name" :max="20" placeholder-align="right" text-align="right"></x-input>
        <x-input title="店主手机号码" placeholder="请输入店主手机号码" :max="11" v-model="form.contacts_mobile" placeholder-align="right" text-align="right"></x-input>
        <!--<x-input title="店主邮箱" placeholder="请输入店主邮箱" :max="20" v-model="form.contacts_email" placeholder-align="right" text-align="right"></x-input>-->
        <cell>
          <div slot="title">
            <check-icon  :value.sync="isAgree" type="plain"></check-icon> 我已阅读《<span class="link" @click="gotoHelp('regist', '红幸云商平台服务协议')">入驻指南</span>》同意签署在线协议
          </div>
        </cell>
      </group>
    </div>
    <fixed-bot-btn @click="nextClick">下一步</fixed-bot-btn>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {SET_LOADING} from '@store/type'
  import { Datetime, Group, PopupPicker, XInput, XTextarea, XButton, Step, StepItem, Cell, CheckIcon, XHeader } from 'vux'
  import { getSellerRegisterDetail } from '@api'
  import fixedBotBtn from '@comps/fixedBotBtn'

  export default {
    components: {
      XHeader,
      Step,
      StepItem,
      Datetime,
      Group,
      PopupPicker,
      XInput,
      XTextarea,
      XButton,
      CheckIcon,
      Cell,
      fixedBotBtn
    },
    data () {
      return {
        step: 0,
        form: {},
        isAgree: false
      }
    },
    computed: {
      ...mapState(['token', 'user'])
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      isValid () {
        if (!this.form.contacts_name || this.form.contacts_name.length === 0) {
          this.$toasted.show('请先输入店主姓名！')
          return false
        }
        if (!this.form.contacts_mobile || this.form.contacts_mobile.length === 0) {
          this.$toasted.show('请先输入店主手机号码！')
          return false
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.contacts_mobile)) {
          this.$toasted.show('请输入正确的手机号码！')
          return false
        }

        // if (!this.form.contacts_email || this.form.contacts_email.length === 0) {
        //   this.$toasted.show('请先输入店主联系邮箱！')
        //   return false
        // }
        //
        // if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.form.contacts_email)) {
        //   return this.$toasted.show('请输入正确的邮箱！')
        // }

        if (!this.isAgree) {
          this.$toasted.show('请先阅读平台入驻指南！')
          return false
        }

        return true
      },

      // 下一步
      async nextClick () {
        if (this.isValid()) {
          sessionStorage.setItem('sellerRegisterForm', JSON.stringify(this.form))
          this.$router.push('/sellerRegisterStep' + (this.step + 1))
        }
      },
      async gotoHelp (id, title) {
        this.$router.push({
          path: '/help/' + id,
          query: {title: title}
        })
      },
      async loadSeller () {
        if (this.$route.query.a && this.$route.query.a === 'reject') {
          this.setLoading({
            status: true,
            opacity: 0
          })
          let res = await getSellerRegisterDetail()
          this.setLoading(false)
          if (res && res.code === 200) {
            this.form = res.data
          }
        }
      }
    },
    created () {
      this.loadSeller()
    },
    destoryed () {
      sessionStorage.removeItem('sellerRegisterForm')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    padding-top:  $default_toolbar_height;
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }

  .tooltip {
    padding: 20px;
    margin: 20px;
    color: #df9d35;
    background: #fffbe6;
    p {
      margin-top: 10px;
      width: 100%;
      height: auto;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: -1.9px -5.7px 12.9px 0.1px rgba(8, 1, 3, 0.27);
    border: 0;
  }

  .link {
    color: $default_red_color;
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

  .vux-step-item-main {
    vertical-align: baseline !important;
  }

  .vux-step-item-head .vux-step-item-head-inner {
    margin: 1px;
  }

  .vux-step-item-title{
    font-size: $default_font_size !important;
  }
  .weui-cells:before{
    z-index: 1;
  }
  .vux-step-item-icon {
    width: auto !important;
  }
</style>
