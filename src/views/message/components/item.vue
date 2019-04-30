<template>
  <div class="row">
    <div class="graphic" @click="go" v-if="data.category_type === 1 || data.category_type === 4">
      <img :src="data.message_img" alt="" v-imgField>
      <div class="msg">
        <span class="title">{{data.title}}</span>
        <time class="time">{{data.create_time}}</time>
      </div>
    </div>
    <div class="literals" @click="go" v-if="data.category_type === 0 || data.category_type === 3">
      <p class="text">{{data.title}}
        <time class="time">{{data.create_time}}</time>
      </p>
      <p class="sub-text">{{data.content}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {}
    },
    methods: {
      go () {
        if (this.data.category_type === 4) {
          if (this.data.url_type === 0) {
            this.$router.push(this.data.notice_url)
          } else if (this.data.url_type === 1) {
            window.location.href = this.data.notice_url
          }
        } else if (this.data.category_type === 1) {
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";
  .row {
    margin-bottom: 20px;
  }

  .graphic {
    background-color: #fff;
    img {
      width: 100%;
      height: 306px;
      display: block;
      &.error {
        width: auto;
        height: 306px;
        margin: 0 auto;
      }
    }
    .msg {
      line-height: 96px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 29px;
      color: #333;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .literals {
    display: block;
    background-color: #fff;
    font-size: $default_font_size;
    color: #333;
    padding: 20px;
    margin-bottom: 20px;
    .text {
      font-size: $default_largefont_size;
      @include textHideByLine(1);
      .time {
        float: right;
        font-size: $default_middlefont_size;
      }
    }
    .sub-text {
      margin-top: 20px;
      font-size: $default_middlefont_size;
    }
  }
</style>
