<template>
  <div class="skuspec" @click="specShow">
    <div class="cell">
      <div class="left">
        已选
      </div>
      <div class="center">
        <span class="item">
          <template v-if="goods.is_enablespec === 1">
            {{goods.goods_sku ? goods.goods_sku.sku_valuenames + '  ' + goods.goods_buynum + (goods.goods_saletype === 1 ? '件' : '次') : '无'}}
          </template>
          <template v-else>
            {{goods.goods_buynum + (goods.goods_saletype === 1 ? '件' : '次')}}
          </template>
        </span>
      </div>
      <div class="right">
        <i class="more-icon"></i>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      goods: {
        type: Object
      }
    },
    methods: {
      specShow () {
        this.$emit('specShow')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .skuspec {
    margin-top: 20px;
    padding: 0 20px;
    width: 100%;
    background-color: #fff;

    .cell {
      padding: 0;
      display: flex;
      line-height: $default_cell_height;
      font-size: $default_middlefont_size;
      color: $default_subtitle_color;
      &:not(:last-child) {
        border-bottom:  1px solid $default_border_color;
      }
      .left {
        width: 80px;
        text-align: left;
      }
      .center {
        text-align: left;
        flex: 0 1 calc(100% - 120px);
        overflow: hidden;
        .item {
          color: $default_title_color;
          line-height: $default_middlefont_size + 16px;
          display: inline-flex;
          margin-bottom: 20px;
          word-break: break-all;
        }

      }
      .right {
        width: 40px;
        text-align: right;
      }
    }
  }
</style>
