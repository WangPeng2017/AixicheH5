<template>
  <div class="card" @click="$router.push('/myCar')">
    <div class="main">
      <template v-if="data">
        <div class="left">
          <img :src="data.car_brandimg" v-img-field />
        </div>
        <div class="right">
          <p class="series-name">{{data.car_brandname + ' ' + data.car_seriesname}}</p>
          <p class="spec-name">{{data.car_specname}}</p>
          <p class="belong-number">
            <span class="tag">{{data.car_belongtypename}}</span>
            <span class="tag blue-tag" v-if="data.car_licensenumber && data.car_licensenumber.length===7">{{data.car_licensenumber}}</span>
            <span class="tag green-tag" v-if="data.car_licensenumber && data.car_licensenumber.length===8">{{data.car_licensenumber}}</span>
          </p>
        </div>
      </template>
      <template v-else>
        <p class="without-car" @click="$router.push('/myCar')">点击添加我的爱车</p>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: null
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";

  .card {
    padding: 20px;
    background-color: #fff;
    .main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
      }

      .right {
        flex: 1;
        margin-left: 20px;
        .series-name {
          height: 44px;
          line-height: 44px;
          font-size: $default_font_size;
          color: $default_title_color;
          @include textHideByLine(1);
          font-weight: bold;
        }
        .spec-name {
          margin-top: 12px;
          height: 44px;
          line-height: 44px;
          font-size: $default_middlefont_size;
          color: $default_subtitle_color;
          @include textHideByLine(1);
        }
        .belong-number {
          margin-top: 12px;
          height: 44px;
          line-height: 44px;
          .tag {
            margin-right: 20px;
            padding: 0px 20px;
            color: $default_red_color;
            border: 1px solid $default_red_color;
            font-size: $default_smallfont_size;
            font-weight: normal;
            &.blue-tag {
              color: $default_theme_color;
              border: 1px solid $default_theme_color;
            }
            &.green-tag {
              color: $default_green_color;
              border: 1px solid $default_green_color;
            }
          }
        }
      }

      .without-car {
        width: 100%;
        height: 100px;
        background-color: #fff;
        line-height: 100px;
        display: block;
        text-align: center;
      }
    }
    .main:after {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      border-top: 1px solid #656565;
      border-right: 1px solid #656565;
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      position: absolute;
      right: 30px;
    }
  }
</style>
