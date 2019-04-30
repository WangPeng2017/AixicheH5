<template>
  <div class="card">
    <div class="main">
      <p class="name-mobile">
        <span class="name">{{data.receiver_name}}</span>
        <span class="mobile">{{data.receiver_mobile}}</span>
        <span class="tag" v-if="data.receiver_remark && data.receiver_remark.length > 0">{{data.receiver_remark}}</span>
      </p>
      <p class="region-address"><i class="address-icon"></i>{{data.region + ' ' + data.address}}</p>
    </div>
    <div class="bottom" v-if="edit">
      <div class="left">
        <check-icon :value.sync="data.status" @click.native="defaultChange">
          <span>{{data.status ? '已设为默认地址' : '设为默认地址'}}</span>
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
    background-color: #fff;
    .main {
      padding: 20px;
      p {
        margin-top: 16px;
      }
      .name-mobile {
        line-height: 44px;
        font-size: $default_font_size;
        color: $default_title_color;
        @include textHideByLine(1);
        font-weight: bold;
        .name {
          width: 200px;
        }
        .mobile {
          margin-left: 40px;
        }
        .tag {
          margin-left: 20px;
          padding: 0px 20px;
          color: $default_blue_color;
          border: 1px solid $default_blue_color;
          font-size: $default_smallfont_size;
          font-weight: normal;
        }
      }
      .region-address {
        line-height: 44px;
        font-size: $default_middlefont_size;
        color: $default_subtitle_color;
        @include textHideByLine(2);
        .address-icon {
          margin-right: 20px;
          vertical-align: sub;
        }
      }
    }
    .bottom {
      padding: 20px;
      margin-top: 20px;
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
