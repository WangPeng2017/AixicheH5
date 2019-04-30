<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">店铺介绍</x-header>
    <div class="content">
      <div class="article" v-if="data && data.length > 0">{{ data }}</div>
      <withoutdata label="暂无店铺介绍" v-if="!data || data.length === 0"></withoutdata>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import { getSellerIntroduction } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  import withoutdata from '@comps/withoutdata'

  export default {
    components: {
      XHeader,
      withoutdata
    },
    data () {
      return {
        data: {}
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      async loadSellerIntroduce () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let id = this.$route.params.id
        let res = await getSellerIntroduction(id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
        }
      }
    },
    created () {
      this.loadSellerIntroduce()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .article {
    background-color: #fff;
    padding: 20px;
    text-indent: 2em;
  }
</style>
