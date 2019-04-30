<template>
  <div>
    <Header title="发布商品"></Header>
    <section style="position:absolute; top: 45px; bottom: 0; left: 0; right: 0;overflow:auto;">
      <Upload @on-upload="onUpload"
              :data="images"
              title="商品相册"></Upload>
      <group>
        <cell title="商品名称"
              isLink>
          <template>
            <input type="text"
                   v-model="goodsName"
                   class="weui-input"
                   placeholder="请输入商品名称"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="选择品牌"
              isLink
              @click.native="showModel">
          <template>
            <input type="text"
                   v-model="goodsBrand"
                   class="weui-input"
                   disabled
                   placeholder="请选择商品品牌"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="一口价"
              isLink>
          <template>
            <input type="number"
                   v-model="goodsPrice"
                   class="weui-input"
                   placeholder="请输入商品一口价"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="库存预警数"
              isLink>
          <template>
            <input type="number"
                   v-model="goodsWarningNumber"
                   class="weui-input"
                   placeholder="请输入商品预警数"
                   style="text-align:right;" />
          </template>
        </cell>
        <x-textarea title="商品介绍"
                    v-model="goodsIntroduction"
                    :height="100"
                    style="font-size: 12px;"></x-textarea>
      </group>
      <x-button @click.native="submitGoods"
                type="warn"
                style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">发布</x-button>
      <Model :show="isShowChooseBrand"
             @closeModel="closeModel">
        <template>
          <div class="toolbox">
            <van-search show-action
                        placeholder="请输入品牌名称"
                        v-model="value"
                        style="width: 60%;display: inline-block;padding: 0;">
              <div slot="action"
                   style="line-height:24px;"
                   @click="onSearch">搜索</div>
            </van-search>
            <span v-if="hasChecked"
                  style="border: 0;margin: 0;float:right; color: #fff;background:rgba(255,0,54,1);padding: 6px 10px; font-size:12px; border-radius:3px;">确定</span>
            <span v-if="!hasChecked"
                  style="border: 0;margin: 0;float:right; color: #999999;background:rgba(247,247,247,1);padding: 6px 10px; font-size:12px; border-radius:3px;">取消</span>
          </div>
          <div class="list">
            <div class="list-item active"
                 v-for="n in 20"
                 :key="n">
              <span class="item-name">壳牌</span>
              <span class="item-button">
                <img :src="isChecked"
                     alt="">
              </span>
            </div>
          </div>
        </template>
      </Model>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Upload from 'Common/Upload'
import Model from 'Common/Model'
import { Search } from 'vant'
import { Group, Cell, XInput, XTextarea, XButton } from 'vux'
export default {
  name: 'addGoods',
  components: {
    Header,
    Upload,
    Group,
    Cell,
    XInput,
    XTextarea,
    XButton,
    Model,
    [Search.name]: Search
  },
  data () {
    return {
      images: [],
      goodsName: '',
      goodsBrand: '',
      goodsPrice: '',
      goodsWarningNumber: '',
      goodsIntroduction: '',
      isShowChooseBrand: false,
      isChecked: require('Assets/img/checked_active.png'),
      noChecked: require('Assets/img/checked.png'),
      hasChecked: true,
      value: ''
    }
  },
  methods: {
    onUpload: function (val) {
      this.images = []
      this.images = val
    },
    showModel () {
      this.isShowChooseBrand = true
    },
    closeModel () {
      this.isShowChooseBrand = false
    },
    submitGoods () {
      this.$router.push({ name: 'goodsDetail' })
    },
    onSearch () { }
  }
}
</script>

<style lang="less" scoped>
.weui-input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: 14px;
  color: #999999;
  height: 1.41176471em;
  line-height: 1.41176471;
}
.group {
  background: #fff;

  /deep/ .weui-cells__title {
    margin-top: 0;
    padding-top: 0.77em;
    border: 0;
    color: #000;
    font-size: 17px;
  }

  /deep/ .weui-cells:before {
    display: none;
  }
}

.toolbox {
  overflow: hidden;
  padding: 6px 0;
}

.list {
  border-radius: 3px 0px 0px 0px;
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  top: 55px;
  overflow: auto;
  .active {
    background: rgba(234, 234, 234, 1);
  }

  .list-item {
    background: rgba(247, 247, 247, 1);
    padding: 10px 10px;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    .item-name {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .item-button {
      float: right;
      img {
        display: block;
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>

