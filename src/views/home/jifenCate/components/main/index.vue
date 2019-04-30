<template>
  <div class="main">
    <swiper :options="swiperAd" class="swiper-ad" v-if="ad.length > 0" ref="swiper">
      <swiper-slide v-for="swiper in ad" :key="swiper.adv_id">
        <a :href="swiper.adv_link">
          <img v-lazy="swiper.adv_address" class="swiper-img">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

    <my-panel :title="item.category_name" v-for="item in category" :key="item.category_id">
      <img v-lazy="item.category_img" alt="" slot="icon" class="icon">
      <div class="card" slot="body">
        <div class="card-item" v-for="subitem in item.children">
          <a href="javascript:void(0);" @click="handleClick(subitem)">
            <img :src="subitem.category_img" alt="" v-imgField>
            <p class="text">{{ subitem.category_name }}</p>
          </a>
        </div>
        <p v-if="category.length == 0" class="hasNoData">没有更多的数据</p>
      </div>
    </my-panel>
  </div>
</template>

<script>
  import myPanel from '../panel'
  export default {
    props: {
      ad: {
        default: []
      },
      category: {}
    },
    components: {
      myPanel
    },
    data () {
      return {
        swiperAd: {
          autoplay: 5000,
          pagination: '.swiper-pagination'
        }
      }
    },
    methods: {
      handleClick (item) {
        this.$router.push({
          path: '/jfgoodsList',
          query: {
            a: 'category',
            cid: item.category_id,
            name: item.category_name
          }
        })
      }
    },
    watch: {
      ad (val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            this.$refs.swiper.swiper.update()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/css/pub";

  .main {
    flex: 1;
    width: 75%;
    overflow-y: scroll;
    background-color: #fff;
    .swiper-img {
      width: 92%;
      height: 92%;
      margin-top: 25px;
      margin-left: 25px;
    }
  }

  .card {
    width: 100%;
    display: inline-block;
    font-size: 0;
    .card-item {
      width: 33.333333%;
      height: 220px;
      display: inline-block;
      text-align: center;
      a {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        box-sizing: border-box;
      }
      img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }
      .text {
        margin-top: 42px;
        font-size: 25px;
        color: #666666;
        @include textHideByLine(1);
      }
    }
  }

  .hasNoData {
    font-size: 26px;
    background-color: #fff;
    text-align: center;
  }

  .swiper-ad {
    height: 296px;
  }
</style>
