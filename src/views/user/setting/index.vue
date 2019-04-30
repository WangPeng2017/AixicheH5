<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">设置</x-header>
    <div class="content">
      <group>
        <cell class="row"
              title="投诉建议"
              @click.native="$router.push('/myComplaints')"></cell>
        <!-- <cell class="row"
              title="版权信息"
              @click.native="gotoHelp('copyright', '版权信息')"></cell> -->
        <cell class="row"
              title="相关协议"
              @click.native="$router.push('/myrelategreement')"></cell>
        <cell class="row"
              title="关于我们"
              @click.native="gotoHelp('aboutus', '关于我们')"></cell>
        <cell class="row"
              title="联系我们"
              @click.native="gotoHelp('lianxiwomen', '联系我们')"></cell>
      </group>

      <group>
        <cell class="row"
              title="修改密码"
              @click.native="$router.push('/forget')"></cell>
        <cell class="row"
              title="收货地址"
              @click.native="$router.push('/myAddress')"></cell>
      </group>
      <!-- <group>
        <cell class="row" title="商家中心" @click.native="$router.push('/shopscenter')"></cell>
      </group> -->
    </div>
    <fixed-bot-btn @click="exit">退出登录</fixed-bot-btn>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from 'vux'
import fixedBotBtn from '@comps/fixedBotBtn'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
import { isWeixin } from '../../../assets/js/util'
Vue.use(Confirm)

export default {
  components: {
    XHeader,
    Group,
    Cell,
    fixedBotBtn
  },
  data () {
    return {
      isWx: isWeixin()
    }
  },
  methods: {
    // 退出登录
    exit () {
      let self = this
      this.$confirm({
        title: '',
        content: '您确定离开吗？',
        yesText: '狠心离去',
        noText: '我再想想',
        yesStyle: {
          'background-color': '#f15353',
          'color': '#ffffff',
          'font-size': '16px'
        },
        noStyle: {
          'color': '#666666',
          'font-size': '16px'
        }
      }).then(() => {
        self.$store.dispatch('logout')
      })
    },
    gotoHelp (code, title) {
      this.$router.push({
        path: '/help/' + code,
        query: { title: title }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";

.content {
  height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
}
</style>

