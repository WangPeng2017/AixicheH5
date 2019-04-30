<template>
</template>

<script>
  import { checkBind, getWxAuthorizeUserinfoUrl, getOpenId } from '@api'
  import { mapState, mapMutations } from 'vuex'
  import { GetQueryString } from '@utils/mixin'
  import { SET_OPENID } from '@store/type'
  export default {
    computed: {
      ...mapState(['beforeUrl', 'token'])
    },
    data () {
      return {
      }
    },
    created () {
      let code = GetQueryString('code')
      if (code) {
        this.getOpenId(code)
      } else {
        this.getCode()
      }
    },
    methods: {
      ...mapMutations({
        setOpenid: SET_OPENID
      }),
      // 微信OAuth授权绑定检查
      async checkBind (openid, type) {
        // 微信授权url跳转并获取code
        let res = await checkBind(openid, type)
        if (res && res.code === 200) {
          // 关联用户存在静默登录
          let form = new FormData()
          form.append('openid', res.data.openid)
          form.append('type', res.data.type)
          this.$store.dispatch('relationLogin', {
            form,
            count: -2
          })
        } else {
          // 关联用户不存在进入关联页面
          this.$router.replace({
            path: '/loginBind',
            query: {
              openid: res.data.openid,
              type: res.data.type
            }
          })
        }
      },
      // 访问微信授权url获取code
      async getCode () {
        let toUrl = location.href
        let res = await getWxAuthorizeUserinfoUrl(escape(toUrl))
        if (res && res.code === 200) {
          let authUrl = res.data
          window.location.href = authUrl
        }
      },
      // 获取openid
      async getOpenId (code) {
        let res = await getOpenId(code)
        if (res && res.code === 200) {
          let openid = res.data
          if (openid) {
            this.setOpenid(openid)
            this.checkBind(openid, 'wx')
          }
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
