<template>
  <div class="panel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <x-header :left-options="{showBack: false}" class="vux-1px-b">
          发票
          <i class="close-icon" slot="right" @click="status = false"></i>
        </x-header>
        <div class="content">
          <group :title="'发票类型'">
            <radio :options="[{key: 0, value: '普通发票'}]" v-model="inv_property" @on-change="invPropertyChange"></radio>
          </group>

          <group :title="'发票内容'">
            <radio :options="[{key: 0, value: '不开发票'}, {key: 1, value: '商品明细'}]" v-model="is_invoice" @on-change="invContentChange"></radio>
          </group>

          <group :title="'发票抬头'" v-if="is_invoice===1">
            <radio :options="[{key: 0, value: '个人'}, {key: 1, value: '单位'}]" v-model="inv_type" @on-change="invTypeChange"></radio>
            <template v-if="inv_type===1">
              <x-input title="单位名称" placeholder="请输入您的单位名称" v-model="inv_payee" :max="50" placeholder-align="right" text-align="right"></x-input>
              <x-input title="纳税人识别号" placeholder="请输入您的纳税人识别号" v-model="inv_taxnumber" :max="30" placeholder-align="right" text-align="right"></x-input>
            </template>
          </group>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" class="ok" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import { Cell, CellBox, Radio, Group, XInput, Alert } from 'vux'

  export default {
    components: {
      Cell,
      CellBox,
      Group,
      Radio,
      XInput,
      Alert
    },
    props: {
      pickerData: {}
    },
    data: function () {
      return {
        status: false,
        invoice: {},
        is_invoice: 0,    // 不开发票
        inv_property: 0, // 普票
        inv_type: 0,       // 个人
        inv_payee: null,
        inv_taxnumber: null,
        inv_content: '不开发票',
        inv_tax: 0,
        inv_desc: '不开发票'
      }
    },
    methods: {
      show (invoice) {
        this.status = true
        this.invoice = invoice
        this.is_invoice = invoice.is_invoice
        this.inv_property = invoice.inv_property
        this.inv_type = invoice.inv_type
        this.inv_payee = invoice.inv_payee
        this.inv_taxnumber = invoice.inv_taxnumber
        this.inv_content = invoice.inv_content
        this.inv_tax = invoice.inv_tax
        this.inv_desc = invoice.inv_desc
      },
      hide () {
        this.status = false
      },
      // 发票性质改变
      invPropertyChange (value, label) {
      },
      // 发票类型改变
      invTypeChange (value, label) {
      },
      // 发票内容改变
      invContentChange (value, label) {
        if (value === 1) {
          this.inv_content = '商品明细'
        } else {
          this.inv_content = '不开发票'
        }
      },
      // 确定
      ok () {
        if (this.is_invoice === 1) {
          // 开票
          if (this.inv_type === 1) {
            // 公司票
            if (!this.inv_payee || this.inv_payee.length === 0) {
              return this.$toasted.show('请先输入公司名称！')
            }
            if (!this.inv_taxnumber || this.inv_taxnumber.length === 0) {
              return this.$toasted.show('请先输入纳税人识别号！')
            }
            let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/
            if (!reg.test(this.inv_taxnumber)) {
              return this.$toasted.show('请先输入正确的纳税人识别号！')
            }
            let companyName = this.inv_payee ? this.inv_payee : '单位'
            this.invoice.is_invoice = this.is_invoice                  // 是否开票
            this.invoice.inv_desc = companyName + ' ' + this.inv_content     // 发票选用描述
            this.invoice.inv_property = this.inv_property             // 发票性质
            this.invoice.inv_type = this.inv_type                       // 发票类型
            this.invoice.inv_content = this.inv_content               // 发票内容
            this.invoice.inv_payee = this.inv_payee                    // 发票抬头
            this.invoice.inv_taxnumber = this.inv_taxnumber           // 发票税号
            this.invoice.inv_tax = 0                                      // 发票税额
          } else {
            // 个人票
            this.invoice.is_invoice = this.is_invoice                 // 是否开票
            this.invoice.inv_desc = '个人 ' + this.inv_content       // 发票选用描述
            this.invoice.inv_property = this.inv_property           // 发票性质
            this.invoice.inv_type = this.inv_type                     // 发票类型
            this.invoice.inv_content = this.inv_content              // 发票内容
            this.invoice.inv_payee = null                              // 发票抬头
            this.invoice.inv_taxnumber = null                         // 发票税号
            this.invoice.inv_tax = 0                                    // 发票税额
          }
        } else {
          // 不开票
          this.invoice.is_invoice = this.is_invoice                 // 是否开票
          this.invoice.inv_desc = this.inv_content                  // 发票选用描述
          this.invoice.inv_property = 0                               // 发票性质
          this.invoice.inv_type = 0                                   // 发票类型
          this.invoice.inv_content = this.inv_content               // 发票内容
          this.invoice.inv_payee = null                               // 发票抬头
          this.invoice.inv_taxnumber = null                           // 发票税号
          this.invoice.inv_tax = 0                                      // 发票税额
        }

        this.hide()
        this.$emit('handleClick', this.invoice)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .panel {
    .back {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .wrapper {
      z-index: 3;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .content {
        width: 100%;
        height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
        overflow: hidden;
        overflow-y: auto;
        background-color: $default_background_color;
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 99;
      a {
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        margin: 0;
        width: 100%;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        display: block;
        float: left;
      }
      .ok {
        background-color: $default_red_color;
      }
    }
    .on {
      line-height: inherit !important;
      border: 2px solid $default_red_color !important;
      display: inline-block;
      @include backimg('../../../../assets/image/rbchecked_icon', 72px 72px);
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: 101% 100%;
    }
  }



  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(0, 100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

