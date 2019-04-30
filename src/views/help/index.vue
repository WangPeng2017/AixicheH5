<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.query.title}}</x-header>
    <div class="content">
      <div class="article" v-html="data.article_content"></div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import { mapMutations } from 'vuex'
  import { getArticleDetailByCode } from '@api'
  import { SET_LOADING } from '@store/type'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        data: {

        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      async loadArticle () {
        document.title = this.$route.query.title
        if (this.$route.params.code) {
          this.setLoading({
            status: true,
            opacity: 0
          })
          let res = await getArticleDetailByCode(this.$route.params.code)
          this.setLoading(false)
          if (res && res.code === 200) {
            this.data = res.data.article
          }
        }
      }
    },
    async created () {
      this.loadArticle()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .article {
    padding: 20px;
    background-color: #fff;
  }
</style>
