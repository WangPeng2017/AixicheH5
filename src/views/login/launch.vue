<template>
  <div class="ad">
    <img src="../../assets/image/launch-ad.png" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['toFullPath'])
    },
    data () {
      return {
        time: 3000
      }
    },
    created () {
      this.loadLaunch()
    },
    methods: {
      async loadLaunch () {
        let self = this
        let redirectUri = this.toFullPath || '/'
        let t = setTimeout(function () {
          clearTimeout(t)
          sessionStorage.setItem('firstLoad', '1')
          self.$router.push(redirectUri)
        }, this.time)
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
