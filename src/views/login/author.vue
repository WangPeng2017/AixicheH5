<template>
  <div class="ad">
    <img src="../../assets/image/launch-ad.png" />
    <!--<a hidden>{{time}}秒后进入</a>-->
  </div>
</template>

<script>
  import { getWxAuthorizeUrl } from '@api'
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['toUrl'])
    },
    data () {
      return {
      }
    },
    created () {
      this.wxOAuth()
    },
    methods: {
      // 微信OAuth授权
      async wxOAuth () {
        let toUrl = this.toUrl
        let res = await getWxAuthorizeUrl(escape(toUrl))
        if (res && res.code === 200) {
          let authUrl = res.data
          let t = setTimeout(function () {
            clearTimeout(t)
            console.log('authUrl:' + authUrl)
            window.location.href = authUrl
          }, 3000)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/pub";
  .ad {
    img {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
    a {
      padding: 20px;
      border-color: rgba(255,255,255, 0.7);
      position: fixed;
      top: 40px;
      right: 40px;
      color: #ffffff;
      font-size: $default_font_size;
      font-weight: bold;
    }
  }
</style>
