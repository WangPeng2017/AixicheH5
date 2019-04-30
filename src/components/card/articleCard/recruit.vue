<template>
  <div class="card">
    <a href="javascript:void(0)"
       @click="go">
      <figure>
        <figcaption>
          <h2>{{data.ext.recruit_zwmc}}</h2>
          <p>{{data.seller_name}}</p>
          <p>
            <span class="tag">工龄：{{data.ext.recruit_gzjy}}</span>
            <span class="tag">学历：{{data.ext.recruit_xlyq}}</span>
            <span class="tag">工作性质：{{data.ext.recruit_gzxz}}</span>
          </p>
          <p>{{data.ext.recruit_gzdz}}</p>
        </figcaption>
        <div class="right">
          <p>{{data.ext.recruit_dy}}</p>
        </div>
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
      this.$router.push(`/recruitDetail/${this.data.article_id}`)
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
      align-items: center;
      figcaption {
        flex: 1;
        min-width: 0;
        h2 {
          font-size: $default_largefont_size;
          color: $default_title_color;
          font-weight: bold;
          @include textHideByLine(1);
        }
        p {
          font-size: $default_middlefont_size;
          color: $default_title_color;
          vertical-align: middle;
          margin-top: 10px;
          .tag {
            padding: 4px 10px;
            border-radius: 10px;
            border: none;
            background-color: #cfcfcf;
            color: #fff;
            margin-right: 10px;
          }
        }
      }
      .right {
        flex: none;
        p {
          text-align: right;
          font-size: $default_font_size;
          color: $default_theme_color;
        }
      }
    }
  }
}
</style>
