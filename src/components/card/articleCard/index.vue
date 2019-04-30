<template>
  <div class="card">
    <a href="javascript:void(0)" @click="go">
      <figure>
        <img :src="data.article_image" alt="" v-imgField/>
        <figcaption>
          <h2>{{data.article_title}}</h2>
          <p>{{data.article_author}} · {{data.article_count}}人阅读</p>
        </figcaption>
      </figure>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    },
    methods: {
      go () {
        this.$router.push(`/articleDetail/${this.data.article_id}`)
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
        flex-direction: row-reverse;
        /*align-items: center;*/
        margin: 0;
        figcaption {
          flex: 1;
          min-width: 0;
          h2 {
            font-size: $default_font_size;
            color: $default_title_color;
            font-weight: normal;
            padding-right: 10px;
            @include textHideByLine(2);
          }
          p {
            margin-top: 36px;
            font-size: $default_middlefont_size;
            color: $default_subtitle_color;
            vertical-align: middle;
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
