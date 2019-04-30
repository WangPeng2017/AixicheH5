<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">更多服务</x-header>
    <div class="content">
      <grid :cols="4" :show-lr-borders="false">
        <grid-item v-for="(item, index) in data" :key="index" @on-item-click="onItemClick(item)">
          <div class="weui-grid__icon">
          <img slot="icon" :src="item.module_img">
          </div>
          <p class="weui-grid__label">
          <span slot="label" class="grid-label">{{ item.module_name }}</span>
          </p>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
  import { Grid, GridItem } from 'vux'
  import { getAppModuleList } from '@api'
  import {mapMutations, mapState} from 'vuex'
  import {SET_LOADING} from '@store/type'
  export default {
    components: {
      Grid,
      GridItem
    },
    data () {
      return {
        data: []
      }
    },
    computed: {
      ...mapState(['user', 'token'])
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      onItemClick (item) {
        if (item.module_type === 'ilink') {
          let url = item.param.url.replace('index.html#', '')
          if (url) {
            this.$router.push(url)
          }
        } else if (item.module_type === 'olink') {
          let url = item.param.url
          let requreFirstHeader = item.param.requireFirstHeader
          let requireToken = item.param.requireToken
          let redirUrl = url
          redirUrl += '?source=axc'
          if (requireToken && this.token) {
            redirUrl += '&token=' + this.token
          }
          if (requreFirstHeader && this.user && this.user.user_id) {
            redirUrl += '&uid=' + this.user.user_id
          }
          if (requreFirstHeader && this.user && this.user.first_header) {
            redirUrl += '&first_header=' + this.user.first_header
          }
          location.href = redirUrl
        } else {
        }
      },
      // 加载应用模块
      async loadAppModules () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getAppModuleList()
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
        }
      }
    },
    created () {
      this.loadAppModules()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .weui-grid__icon {
    width: 0.846667rem !important;
    height: 0.846667rem !important;
    margin: 0 auto !important;
  }
  </style>
<style scoped>
  .weui-grid {
    background-color: #fff;
  }

  .grid-label {

  }
</style>
