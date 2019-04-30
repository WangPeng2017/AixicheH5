<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">收货地址管理</x-header>
    <div class="content">
      <address-card
        v-for="(item, index) in data"
        :key="item.delivery_addressid"
        :data="item"
        :edit="true"
        @defaultChange="defaultChange"
        @edit="editAddress"
        @delete="deleteAddress"></address-card>
      <withoutdata v-if="data.length === 0" label="暂无收货地址"></withoutdata>
    </div>
    <fixed-bot-btn @click="$router.push('/myAddressForm')">新建地址</fixed-bot-btn>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import addressCard from '@comps/card/addressCard'
  import withoutdata from '@comps/withoutdata'
  import fixedBotBtn from '@comps/fixedBotBtn'
  import { getAddressList, deleteAddress, setDefaultAddress } from '@api'
  import { mapMutations, mapState } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import Vue from 'vue'
  import { Confirm } from 'wc-messagebox'
  import 'wc-messagebox/style.css'
  Vue.use(Confirm)

  export default {
    components: {
      XHeader,
      addressCard,
      withoutdata,
      fixedBotBtn
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 设置默认地址
      async defaultChange (item) {
        if (!item.status) {
          item.is_default = 1
          item.status = true
          return
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await setDefaultAddress(item.delivery_addressid)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data.map(i => {
            i.is_default = (i === item) ? 1 : 0
            i.status = (i === item)
          })
        }
      },
      // 编辑收货地址
      async editAddress (item) {
        this.$router.push('/myAddressForm/' + item.delivery_addressid)
      },
      // 删除收货地址
      async deleteAddress (item) {
        let self = this
        this.$confirm({
          title: '',
          content: '您确定要删除吗？',
          yesText: '确定',
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
          self.setLoading({
            status: true,
            opacity: 0
          })
          deleteAddress(item.delivery_addressid).then(res => {
            self.setLoading(false)
            if (res && res.code === 200) {
              this.loadAddress()
            }
          })
        }).catch(() => {

        })
      },
      // 加载我的收货地址
      async loadAddress () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getAddressList()
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
        }
      }
    },
    async activated () {
      this.loadAddress()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/pub';

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
  }

</style>
