<template>
  <div class="card">
    <a href="javascript:void(0)" @click="go">
      <figure>
        <img :src="data.article_image" alt="" v-imgField/>
        <figcaption>
          <h2>{{data.article_title}}</h2>
          <p>价格：<span v-if="data.ext.rentalcar_rzj">￥{{data.ext.rentalcar_rzj || ''}}/天</span></p>
          <p>发布日期：{{data.publish_time}}</p>
        </figcaption>
      </figure>
    </a>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    },
    methods: {
      go () {
        this.$router.push(`/rentcarDetail/${this.data.article_id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    background: #fff;
    a {
      height: 100%;
      display: block;
      padding: 20px;
      figure {
        height: 100%;
        display: flex;
        /*flex-direction: row-reverse;*/
        /*align-items: center;*/
        margin: 0;
        figcaption {
          flex: 1;
          min-width: 0;
          margin-left: 20px;
          h2 {
            font-size: $default_font_size;
            color: $default_title_color;
            font-weight: normal;
            @include textHideByLine(2);
          }
          p {
            font-size: $default_middlefont_size;
            color: $default_subtitle_color;
            vertical-align: middle;
            margin-top: 10px;
            span {
              color: $default_red_color;
            }
          }
        }
        img {
          width: 240px;
          height: 180px;
          flex: none;
        }
      }
    }
  }
</style>
