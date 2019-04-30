<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">
      申请售后
      <a class="saveBtn" slot="right" @click="submit">提交</a>
    </x-header>
    <div class="content">
      <div class="order-card">
        <div class="order-header">
          <div class="left" @click="$router.push(`/sellerIndex/${data.seller_id}`)">
            <img class="seller-logo" :src="data.seller_logo" alt="" v-imgField/>
            <span class="seller-name">{{data.seller_name}}</span>
            <i class="right-icon"></i>
          </div>
          <div class="right"></div>
        </div>
        <goods-card :data="data"></goods-card>
      </div>
      <group>
        <radio :options="goodsRefundTypeOptions" v-model="form.return_type" v-if="data.goods_saletype === 1">
          <template slot-scope="props" slot="each-item">
            <p v-if="props.label==='仅退款'">
              <i class="refundmoney-icon"></i>
              {{ props.label }}
              <br>
              <span class="inline-desc">未收到货(包含未签收)，或卖家协商同意前提下</span>
            </p>
            <p v-if="props.label==='退货退款'">
              <i class="refundgoods-icon"></i>
              {{ props.label }}
              <br>
              <span class="inline-desc">已收到货，需要退换已收到的货物</span>
            </p>
          </template>
        </radio>
        <radio :options="serviceRefundTypeOptions" v-model="form.return_type" v-if="data.goods_saletype === 2">
          <template slot-scope="props" slot="each-item">
            <p v-if="props.label==='仅退款'">
              <i class="refundmoney-icon"></i>
              {{ props.label }}
              <br>
              <span class="inline-desc">未进行服务，或卖家协商同意前提下</span>
            </p>
          </template>
        </radio>
      </group>

      <group :title="'最多¥' + total_price.toFixed(2)">
        <x-input title="退款金额" placeholder="请输入退款金额" placeholder-align="right" text-align="right" type="number" v-model="form.return_money"></x-input>
        <popup-radio title="退款原因" :options="refundReasonOptions" v-model="form.return_reason">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择退款原因</p>
        </popup-radio>
        <cell title="上传凭证" :primary="'content'">
          <uploader
            :max="3"
            :images="refundImgData"
            :handle-click="false"
            :show-header="false"
            :show-tip="false"
            :autoUpload="true"
            :uploadUrl="'/UploadFile/Upload'"
            :autoRemove="true"
            :removeUrl="'/UploadFile/Remove'"
          ></uploader>
        </cell>
        <x-textarea title="问题描述" :max="200" name="description" v-model="form.refund_desc"></x-textarea>
      </group>
      <group></group>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, Radio, PopupRadio, XTextarea, XInput } from 'vux'
  import goodsCard from '@comps/card/goodsCard/order'
  import Uploader from '@comps/uploader/uploader'
  import { getOrderGoodsDetail, getDictionaryList, addRefund } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'
  export default {
    components: {
      Group,
      Cell,
      Radio,
      PopupRadio,
      XTextarea,
      XInput,
      Uploader,
      goodsCard
    },
    data () {
      return {
        data: {},
        seller: {},
        form: {
          order_sn: null,
          order_details_id: null,
          goods_id: null,
          goods_spec_id: null,
          goods_num: null,
          is_full_refund: 0,
          return_type: 2,
          return_money: 0,
          return_reason: null,
          refund_desc: null,
          upload_img: null,
          upload_img1: null,
          upload_img2: null
        },
        total_price: 0,
        refundImgData: [],
        goodsRefundTypeOptions: [
          {key: '2', value: '仅退款'},
          {key: '1', value: '退货退款'}
        ],
        serviceRefundTypeOptions: [
          {key: '2', value: '仅退款'}
        ],
        refundReasonOptions: []
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 加载订单商品
      async loadOrderGoods () {
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getOrderGoodsDetail(this.$route.params.id)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.data = res.data
          if (this.data.goods_saletype === 1) {
            this.loadGoodsRefundReason()
          } else if (this.data.goods_saletype === 2) {
            this.loadServiceRefundReason()
          }
          this.total_price = this.data.total_price
          this.form.return_money = this.data.total_price
          this.form.order_sn = this.data.order_sn
          this.form.order_details_id = this.data.details_id
          this.form.goods_id = this.data.goods_id
          this.form.goods_spec_id = this.data.sku_id
          this.form.goods_num = this.data.goods_num
        }
      },
      // 加载商品退货原因
      async loadGoodsRefundReason () {
        let res = await getDictionaryList('goodsrefundreason')
        if (res && res.code === 200) {
          this.refundReasonOptions = []
          res.data.map(i => {
            this.refundReasonOptions.push(i.value)
          })
        }
      },
      // 加载商品退货原因
      async loadServiceRefundReason () {
        let res = await getDictionaryList('servicerefundreason')
        if (res && res.code === 200) {
          this.refundReasonOptions = []
          res.data.map(i => {
            this.refundReasonOptions.push(i.value)
          })
        }
      },
      async submit () {
        if (!this.form.return_money || this.form.return_money.length === 0) {
          return this.$toasted.show('请输入退款金额！')
        }

        if (this.form.return_money === 0) {
          return this.$toasted.show('退款金额不能为0！')
        }

        if (this.form.return_money > this.data.total_price) {
          return this.$toasted.show('退款金额不能超过商品总金额！')
        }

        if (!this.form.return_reason || this.form.return_reason.length === 0) {
          return this.$toasted.show('请先选择退货原因！')
        }

        if (!this.form.refund_desc || this.form.refund_desc.length === 0) {
          return this.$toasted.show('请先输入问题描述！')
        }

        if (this.form.return_money === this.data.total_price) {
          this.form.is_full_refund = 1
        }

        if (this.refundImgData.length >= 1) {
          this.form.upload_img = this.refundImgData[0].url
        }
        if (this.refundImgData.length >= 2) {
          this.form.upload_img1 = this.refundImgData[1].url
        }
        if (this.refundImgData.length >= 3) {
          this.form.upload_img2 = this.refundImgData[2].url
        }

        let formData = new FormData()
        for (let key in this.form) {
          if (this.form[key]) {
            formData.append(key, this.form[key])
          }
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await addRefund(formData)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show(res.msg)
          this.$router.back()
        }
      }
    },
    created () {
      this.loadOrderGoods()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/pub";

  .inline-desc {
    color: $default_subtitle_color;
    font-size: $default_smallfont_size;
  }

  .title-slot {
    text-align: center;
    padding: 20px;
    color: $default_title_color;
  }

  .order-card {
    &:first-child {
      margin-top: 20px;
    }
    margin-bottom: 20px;
    background-color: #fff;
    .order-header {
      padding: 0 20px;
      height: $default_cell_height;
      line-height: $default_cell_height;
      font-size: $default_font_size;
      color: $default_title_color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        height: 100%;
        display: flex;
        align-items: center;
        .seller-logo {
          width: $default_cell_icon_size;
          height: $default_cell_icon_size;
          border-radius: $default_cell_icon_size;
          margin-right: 20px;
        }
        .seller-name {
          margin-right: 20px;
        }
      }
      .right {
        height: $default_row_height;
        line-height: $default_row_height;
        text-align: right;
      }
    }
  }
</style>
