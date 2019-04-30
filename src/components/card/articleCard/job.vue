<template>
  <div class="card">
    <a href="javascript:void(0)" @click="go">
      <figure>
        <figcaption>
          <p>应聘职业：<strong>{{data.ext.jobhunting_mbzw || ''}}</strong></p>
          <p>期望薪资：{{data.ext.jobhunting_qdxj ? data.ext.jobhunting_qdxj + '/月' : '面议' }}</p>
          <p>现居地：{{data.ext.jobhunting_xjd || ''}}</p>
        </figcaption>
        <figcaption>
          <p>联系电话：{{data.ext.jobhunting_sj || ''}}</p>
          <p>工作经验：{{data.ext.jobhunting_gzjy || ''}}</p>
          <p>发布时间：{{data.publish_time}}</p>
        </figcaption>
      </figure>
    </a>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      data: {},
      edit: false
    },
    methods: {
      go () {
        this.$router.push(`/jobDetail/${this.data.article_id}`)
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
          flex: 0 1 50%;
          min-width: 0;
          p {
            font-size: $default_middlefont_size;
            color: $default_title_color;
            vertical-align: middle;
            margin-top: 10px;
            @include textHideByLine(1);
          }
        }
      }
    }
  }
</style>
