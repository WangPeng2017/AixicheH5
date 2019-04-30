<template>
  <div class="subview">
    <div class="subcontent">
      <div class="container" v-html="desc" v-if="desc && desc.length>0"></div>
    </div>

  </div>

</template>

<script>
  import { getPackageDesc } from '@api'
  import { mapMutations } from 'vuex'
  import { SET_LOADING } from '@store/type'
  export default {
    data () {
      return {
        desc: ''
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载套餐详细
      async loadDesc () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let id = this.$route.params.id
        let res = await getPackageDesc(id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.desc = res.data
        }
      }
    },
    created () {
      this.loadDesc()
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .container {
    padding: 20px;
    background-color: #fff;
  }

</style>
