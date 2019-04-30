<template>
  <footer class="footer">
    <div class="left">
      <div>
        <check-icon :value.sync="status">全选</check-icon>
      </div>
      <div>
        <label class="total">合计： </label>
        <label class="money">￥{{ money.toFixed(2) }}</label>
      </div>
    </div>
    <a class="takeOrder" href="javascript:void(0)" v-show="editStatus" @click="delGoods">删除</a>
    <a class="takeOrder" href="javascript:void(0)" v-show="!editStatus" @click="firmOrder">去结算</a>
  </footer>
</template>

<script>
  import { CheckIcon } from 'vux'
  export default {
    components: {
      CheckIcon
    },
    props: {
      editStatus: {
        type: Boolean
      },
      money: {
        type: Number
      },
      checkAllStatus: {
        type: Boolean
      },
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        status: this.checkAllStatus
      }
    },
    methods: {
      delGoods () {
        this.$emit('delGoods')
      },
      firmOrder () {
        this.$emit('firmOrder')
      },
      setChecked (status) {
        this.status = status
      }
    },
    watch: {
      status (val) {
        this.$emit('checkall', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";

  .footer {
    width: 100%;
    height: $default_toolbar_height;
    line-height: $default_toolbar_height;
    position: fixed;
    bottom: $default_tabbar_height;
    left: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 0 0 20px;
    border-top: 1px solid $default_border_color;/*no*/
    .left {
      height: $default_toolbar_height;
      line-height: $default_toolbar_height;
      flex: 1;
      display: flex;
      align-items: center;
      div {
        margin-right: 30px;
        vertical-align: middle;
        line-height: 1;
      }
      .money {
        font-size: $default_font_size;
        color: $default_price_color;
      }
      .total {
        font-size: $default_font_size;
      }
    }

    .takeOrder {
      height: $default_toolbar_height;
      line-height: $default_toolbar_height;
      width: 200px;
      background-color: $default_red_color;
      color: #fff;
      text-align: center;
      vertical-align: middle;
    }
  }
</style>
