<template>
  <nav class="swiper-nav">
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="nav in navs" :key="nav.name">
        <router-link :to="nav.url" :key="nav.name" replace>{{ nav.name }}</router-link>
      </swiper-slide>
    </swiper>
  </nav>
</template>

<script>
  export default {
    props: {
      navs: {
        type: Array,
        required: true
      },
      showNum: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: this.showNum,
          onInit: this.swiperInit
        }
      }
    },
    methods: {
      setCenter (swiper, index = false) {
        let swiperWidth = swiper.container[0].clientWidth
        let maxTranslate = swiper.maxTranslate()
        let maxWidth = -maxTranslate + swiperWidth / 2
        let slide
        if (index === false) {
          slide = swiper.slides[swiper.clickedIndex]
        } else {
          slide = swiper.slides[index]
        }
        let slideLeft = slide.offsetLeft
        let slideWidth = slide.clientWidth
        let slideCenter = slideLeft + slideWidth / 2
        // 被点击slide的中心点
        swiper.setWrapperTransition(300)
        if (slideCenter < swiperWidth / 2) {
          swiper.setWrapperTranslate(0)
        } else if (slideCenter > maxWidth) {
          swiper.setWrapperTranslate(maxTranslate)
        } else {
          let nowTlanslate = slideCenter - swiperWidth / 2
          swiper.setWrapperTranslate(-nowTlanslate)
        }
      },
      swiperInit (swiper) {
        let index = this.navs.findIndex(item => item.url === this.$route.fullPath)
        this.setCenter(swiper, index)
      }
    },
    mounted () {
      this.$refs.swiper.swiper.on('tap', swiper => {
        this.setCenter(swiper)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .swiper-nav {
    background-color: #fff;
    text-align: center;
    a {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 31px;
      color: #333;
      display: inline-block;
      box-sizing: border-box;
      position: relative;
    }
    .router-link-active {
      color: $active_font_color;
      &:after {
        content: '';
        width: 100%;
        height: 2px; /*no*/
        background-color: $active_font_color;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
</style>
