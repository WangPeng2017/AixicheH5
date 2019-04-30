<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">
      消息中心
      <i class="setting-black-icon" slot="right" @click="$router.push('/mySetting')"></i>
    </x-header>
    <div class="content">
      <div class="row" v-for="item in data" @click="$router.push(`/messageList/${item.category_id}?title=${item.category_name}`)">
        <img :src="item.category_icon" alt="" v-imgField>
        <div class="msg">
          <p class="name">{{item.category_name}}</p>
          <p class="des" v-if="item.des && item.des.length > 0">{{item.des}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import { getMessageCategoryList } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      })
    },
    async created () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getMessageCategoryList()
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data = res.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .row {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 130px;
    background-color: #fff;
    margin-top: 20px;
    img {
      width: 90px;
      height: 90px;
      margin-right: 20px;
    }
    .msg {
      flex: 1;
      height: 90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 27px;
        color: #333;
      }
      .des {
        font-size: 25px;
        color: #999;
      }
    }
  }
</style>
