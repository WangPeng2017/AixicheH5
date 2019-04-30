<template>
  <div class="card">
    <a href="javascript:void(0)" @click="go">
      <figure>
        <img :src="data.article_image" alt="" v-imgField/>
        <figcaption>
          <h2>{{data.article_title}}</h2>
          <p>报价：
            <span v-if="data.ext.usedcar_bj">￥{{parseFloat(data.ext.usedcar_bj).toFixed(2) || ''}}</span>
            <span v-if="!data.ext.usedcar_bj">面议</span>
          </p>
          <p>
            行驶里程：{{data.ext.usedcar_bxlc || 0}}公里，上牌时间：{{data.ext.usedcar_spsj | diff}}
          </p>
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
    filters: {
      diff (dateStr) {
        if (dateStr && dateStr.length > 0) {
          let year = dateStr.substring(0, 4)
          let month = dateStr.substring(5, 7)
          let day = dateStr.substring(8, 10)
          let newdateStr = year + '-' + month + '-' + day
          let date = new Date(newdateStr.replace(/-/g, '/'))
          let nowdate = new Date()
          let diffYear = nowdate.getFullYear() - date.getFullYear()
          return diffYear + '年'
        } else {
          return '不到1年'
        }
      }
    },
    methods: {
      go () {
        this.$router.push(`/usedcarDetail/${this.data.article_id}`)
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
