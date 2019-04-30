<template>
  <div class="card">
    <div class="info">
      <img v-lazy="data.head_img" alt="" />
      <div class="name-time-star">
        <div class="name-time">
          <div class="left">
            <span class="name">{{data.true_name}}</span>
          </div>
          <div class="right">
            <time class="time">{{data.create_time}}</time>
          </div>
        </div>
        <div class="star">
          <rate :length="data.evaluate_star" :value="data.evaluate_star" disabled v-if="data.evaluate_star"></rate>
        </div>
      </div>
    </div>
    <div class="desc">{{data.evaluate_content}}</div>
    <div class="images" v-if="data.images.length > 0">
      <img v-lazy="img" alt="" v-for="(img, index) in data.images" @click="lightboxShow(index)"/>
    </div>
    <div class="goods" v-if="data.sku_valuenames">型号：{{data.sku_valuenames}}</div>
    <div class="fallback" v-if="data.reply_content">{{data.reply_content}}</div>
  </div>
</template>

<script>
  import rate from '@comps/rate'
  export default {
    components: {
      rate
    },
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
      height: 120px;
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .name-time-star {
        height: 70px;
        flex: 1;
        font-size: $default_middlefont_size;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1;
        .name-time {
          font-size: $default_font_size;
          color: $default_title_color;
          .left {
            float: left;
            .name {

            }
          }
          .right {
            float: right;
            .time {
              display: inline-block;
            }
          }
        }
        .star {
          margin-top: 10px;
        }
      }
    }

    .desc {
      margin-top: 20px;
      font-size: $default_font_size;
      color: $default_subtitle_color;
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

    .goods {
      margin-top: 20px;
      color: $default_subtitle_color;
    }

    .fallback {
      margin-top: 20px;
      background-color: #eaeaea;
      padding: 20px;
      border-radius: 10px;
      font-size: 20px;
      color: #393939;
      line-height: 1.5;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 52px;
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #eaeaea;
      }
    }
  }
</style>
