<template>
  <div class="card">
    <div class="main">
      <div class="left">
        <img :src="data.car_brandimg" v-img-field />
      </div>
      <div class="right">
        <p class="series-name">{{data.car_brandname + ' ' + data.car_seriesname}}</p>
        <p class="spec-name">{{data.car_specname}}</p>
        <p class="belong-number">
          <span class="tag">{{data.car_belongtypename}}</span>
          <span class="tag blue-tag" v-if="data.car_licensenumber.length===7">{{data.car_licensenumber}}</span>
          <span class="tag green-tag" v-if="data.car_licensenumber.length===8">{{data.car_licensenumber}}</span>
        </p>
      </div>
    </div>
    <div class="bottom" v-if="edit">
      <div class="left">
        <check-icon :value.sync="data.status" @click.native="defaultChange">
          <span>{{data.status ? '已设为常用车' : '设为常用车'}}</span>
        </check-icon>
      </div>
      <div class="right">
        <a href="javascript:void(0)" @click="editAdress">
          <i class="edit-icon"></i>
          编辑</a>
        <a href="javascript:void(0)" @click="deleteAdress">
          <i class="del-icon"></i>
          删除</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'

  export default {
    components: {
      CheckIcon
    },
    props: {
      data: {},
      edit: false
    },
    methods: {
      // 设置为默认收货地址
      async defaultChange () {
        this.$emit('defaultChange', this.data)
      },
      // 编辑收货地址
      async editAdress () {
        this.$emit('edit', this.data)
      },
      // 删除收货地址
      async deleteAdress () {
        this.$emit('delete', this.data)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";

  .card {
    padding: 20px;
    background-color: #fff;
    .main {
      margin-bottom: 20px;
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
    }
    .bottom {
      padding-top: 20px;
      border-top: 1px solid $default_border_color;
      height: $default_cell_height;
      font-size: $default_font_size;
      color: $default_subtitle_color;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        span {
        }
      }
      .right {
        a {
          display: inline-flex;
          align-items: center;
          margin-left: 40px;
          i {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
