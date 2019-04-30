<template>
  <div class="card">
    <div class="info">
      <div class="time-status">
        <p><time class="time">{{data.record_time}}</time>
          <span class="status">{{data.desc || ''}}</span>
        </p>
      </div>
    </div>
    <div class="images" v-if="data.images.length > 0">
      <img v-lazy="img" alt="" v-for="(img, index) in data.images" @click="lightboxShow(index)"/>
    </div>
    <div class="desc" v-if="data.record_desc">{{data.record_desc}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      lightboxShow (index) {
        this.$emit('lightboxShow', {
          index,
          images: this.data.images
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .card {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(4, 0, 0, 0.13);
    margin-bottom: 20px;

    .info {
      .time-status {
        color: $default_title_color;
        font-size: $default_font_size;
        .status {
          float: right;
        }
      }
    }

    .images {
      margin-top: 20px;
      overflow-x: scroll;
      overflow-y: hidden;
      font-size: 0;
      img {
        width: 140px;
        height: 140px;
        margin-right: 10px;
        display: inline-block;
      }
    }

    .desc {
      margin-top: 20px;
      font-size: $default_font_size;
      color: $default_subtitle_color;
    }
  }
</style>
