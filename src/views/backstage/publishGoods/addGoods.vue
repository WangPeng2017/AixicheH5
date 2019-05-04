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
import { submitForm } from '@api'
import Header from 'Common/Header'
import Upload from 'Common/Upload'
import Model from 'Common/Model'
import { Search } from 'vant'
import { Group, Cell, XInput, XTextarea, XButton } from 'vux'
const USER_ID = '83b0e4f9-3dcc-4a60-8a42-df514ed239f5'
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
    async submitGoods () {
      let goodsEntity = {
        'goods_id': 'string',
        'goods_name': this.goodsName,
        'goods_no': 'string',
        'goods_sn': 'string',
        'goods_sort': 0,
        'goods_status': 0,
        'goods_minprice': 0,
        'goods_maxprice': 0,
        'goods_skunum': 0,
        'goods_saletype': 0,
        'goods_img': this.images,
        'goods_warningstorage': 0,
        'goods_storage': 0,
        'goods_saleprice': 0,
        'goods_marketprice': 0,
        'goods_purchaseprice': 0,
        'goods_weight': 0,
        'goods_grossweight': 0,
        'goods_volume': 0,
        'goods_clicknum': 0,
        'goods_salenum': 0,
        'goods_collectnum': 0,
        'goods_evaluationnum': 0,
        'goods_positive': 0,
        'goods_validtype': 0,
        'goods_validdate': '2019-05-04T05:53:33.488Z',
        'goods_validdays': 0,
        'goods_buymode': 0,
        'goods_minintegral': 0,
        'goods_maxintegral': 0,
        'goods_buycoin': 0,
        'goods_summary': 'string',
        'goods_guarantee': 'string',
        'goods_desc': this.goodsIntroduction,
        'goods_mobiledesc': 'string',
        'goods_attrjson': 'string',
        'audit_status': 0,
        'audit_reason': 'string',
        'unit_id': 0,
        'brand_id': 0,
        'category_id': 0,
        'category_searchkey': 0,
        'seller_category_id': 0,
        'type_id': 0,
        'is_enableselfget': 0,
        'selfget_store_id': 'string',
        'is_enabledeliver': 0,
        'freight_template_id': 'string',
        'is_enableintostore': 0,
        'intostore_store_id': 'string',
        'is_enablevisit': 0,
        'visitfee_template_id': 'string',
        'is_enableappoint': 0,
        'appoint_template_id': 'string',
        'is_enablespec': 0,
        'seller_id': 'string',
        'create_userid': 'string',
        'create_time': '2019-05-04T05:53:33.489Z',
        'update_userid': 'string',
        'update_time': '2019-05-04T05:53:33.489Z',
        'retail': 0,
        'activity': 0,
        'points_area': 0,
        'point_settlement_ratio': 0,
        'remarks': 'string',
        'purchase_limit': 0
      }
      let keyValue = this.$route.query.keyValue
      let sellerId = sessionStorage.getItem('seller_id')
      let submitGoods = await submitForm(goodsEntity, keyValue, sellerId, USER_ID)
      if (submitGoods && submitGoods.status === 200) {
        this.$router.push({ name: 'goodsDetail' })
      }
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

