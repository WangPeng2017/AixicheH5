<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">店铺成员</x-header>
    <div class="content">
      <seller-staff-card v-for="item in data" :key="item.employee_id" :data="item"></seller-staff-card>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import sellerStaffCard from '@comps/card/sellerStaffCard'
  import { getSellerEmployeeList } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      XHeader,
      sellerStaffCard
    },
    data () {
      return {
        data: {}
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      })
    },
    async activated () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getSellerEmployeeList(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data = res.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";
</style>
