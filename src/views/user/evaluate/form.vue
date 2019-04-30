<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">
      评价
      <a class="saveBtn"
         slot="right"
         @click="submit">发布</a>
    </x-header>
    <div class="content evaluate-content">
      <group :gutter="10"
             class="seller-group">
        <cell :title="data.seller_name"
              :inline-desc="data.seller_address">
          <img slot="icon"
               class="seller-logo"
               :src="data.seller_logo"
               v-img-field>
        </cell>
      </group>

      <group class="goods-evaluate-group">
        <cell title="商品评分">
          <i slot="icon"
             class="employee-icon"></i>
        </cell>
        <template v-for="(item, index) in data.goods">
          <cell>
            <img slot="icon"
                 class="goods-image"
                 :src="item.goods_img"
                 v-img-field>
            <checker radio-required
                     v-model="item.evaluate_star"
                     class="goods-star">
              <checker-item :value="1">
                <i class="goods-star-icon"
                   :class="[item.evaluate_star===1 ? 'lowpraise-checked-icon' : 'lowpraise-icon']"></i>
              </checker-item>
              <checker-item :value="3"
                            class="center">
                <i class="goods-star-icon"
                   :class="[item.evaluate_star===3 ? 'middlepraise-checked-icon' : 'middlepraise-icon']"></i>
              </checker-item>
              <checker-item :value="5">
                <i class="goods-star-icon"
                   :class="[item.evaluate_star===5 ? 'highpraise-checked-icon' : 'highpraise-icon']"></i>
              </checker-item>
              <i class="edit-icon"
                 :class="[item.direction ? 'editclose-icon' : 'editopen-icon']"
                 @click="item.direction=!item.direction"></i>
            </checker>
          </cell>
          <template v-if="item.direction">
            <x-textarea v-model="item.evaluate_content"
                        :max="100"
                        :rows="5"
                        :placeholder="'请输入文字评价'"
                        :show-counter="false"></x-textarea>
            <cell title="添加图片"
                  :primary="'content'">
              <i slot="icon"
                 class="camera-icon"></i>
              <uploader :max="3"
                        :images="item.evaluateImgArr"
                        :handle-click="false"
                        :show-header="false"
                        :show-tip="false"
                        :autoUpload="true"
                        :uploadUrl="'/UploadFile/Upload'"
                        :autoRemove="true"
                        :removeUrl="'/UploadFile/Remove'"></uploader>
            </cell>
          </template>
        </template>
        <cell>
          <div slot="title">
            <check-icon :value.sync="isAnonymous"
                        type="plain"></check-icon> 是否匿名评价
          </div>
        </cell>
      </group>

      <group class="seller-evaluate-group">
        <cell title="服务评分">
          <i slot="icon"
             class="seller-icon"></i>
        </cell>
        <cell title="描述相符">
          <rater v-model="desc_match_star"></rater>
        </cell>
        <cell title="服务态度">
          <rater v-model="service_attitude_star"></rater>
        </cell>
        <cell title="物流服务">
          <rater v-model="delivery_speed_star"></rater>
        </cell>
      </group>

      <group class="employee-evaluate-group"
             v-if="employeeData && employeeData.length>0">
        <cell title="服务人员评分">
          <i slot="icon"
             class="employee-icon"></i>
        </cell>
        <template v-for="(item, index) in employeeData">
          <cell :title="item.true_name">
            <img slot="icon"
                 class="employee-logo"
                 :src="item.head_icon"
                 v-img-field>
            <checker radio-required
                     v-model="item.evaluate_star"
                     class="employee-star">
              <checker-item :value="1">
                <i class="employee-star-icon"
                   :class="[item.evaluate_star===1 ? 'lowpraise-checked-icon' : 'lowpraise-icon']"></i>
              </checker-item>
              <checker-item :value="3"
                            class="center">
                <i class="employee-star-icon"
                   :class="[item.evaluate_star===3 ? 'middlepraise-checked-icon' : 'middlepraise-icon']"></i>
              </checker-item>
              <checker-item :value="5">
                <i class="employee-star-icon"
                   :class="[item.evaluate_star===5 ? 'highpraise-checked-icon' : 'highpraise-icon']"></i>
              </checker-item>
              <i class="edit-icon"
                 :class="[item.direction ? 'editclose-icon' : 'editopen-icon']"
                 @click="item.direction=!item.direction"></i>
            </checker>
          </cell>
          <template v-if="item.direction">
            <x-textarea v-model="item.evaluate_content"
                        :max="100"
                        :rows="5"
                        :placeholder="'请输入文字评价'"
                        :show-counter="false"></x-textarea>
          </template>
        </template>
      </group>

      <group></group>
    </div>
  </div>
</template>

<script>
import { Group, Cell, CellBox, Checker, CheckerItem, Radio, PopupRadio, XTextarea, XInput, Rater, CheckIcon } from 'vux'
import Uploader from '@comps/uploader/uploader'
import { getOrderDetail, getOrderEmployeeList, submitEvaluate } from '@api'
import { SET_LOADING } from '@store/type'
import { mapMutations } from 'vuex'
import qs from 'qs'

export default {
  components: {
    Group,
    Cell,
    Radio,
    PopupRadio,
    XTextarea,
    XInput,
    Checker,
    CheckerItem,
    CellBox,
    Rater,
    CheckIcon,
    Uploader
  },
  data () {
    return {
      data: {},
      employeeData: [],
      delivery_speed_star: 5,
      service_attitude_star: 5,
      desc_match_star: 5,
      isAnonymous: false
    }
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 加载商品服务人员
    async loadOrderGoodsEmployeeList (goodsIdArr) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getOrderEmployeeList(qs.stringify({
        goodsIdList: goodsIdArr
      }))
      this.setLoading(false)
      if (res && res.code === 200) {
        res.data.map(i => {
          i.evaluate_star = 5
          i.evaluate_content = ''
          i.direction = false
        })
        this.employeeData = res.data
      }
    },
    // 加载订单商品列表
    async loadOrderDetail () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      let res = await getOrderDetail(this.$route.params.id)
      this.setLoading(false)
      if (res && res.code === 200) {
        let goodsIdArr = []
        res.data.goods.map(i => {
          i.evaluate_star = 5
          i.evaluate_content = ''
          i.direction = false
          i.evaluateImgArr = []
          goodsIdArr.push(i.goods_id)
        })
        this.data = res.data
        this.loadOrderGoodsEmployeeList(goodsIdArr)
      }
    },
    async submit () {
      let evaluateShop = {
        order_sn: this.data.order_sn,
        seller_id: this.data.seller_id,
        shop_id: this.data.seller_id,
        desc_match_star: this.desc_match_star,
        service_attitude_star: this.service_attitude_star,
        delivery_speed_star: this.delivery_speed_star
      }

      let evaluateGoodsList = []
      this.data.goods.map(g => {
        let imgList = []
        g.evaluateImgArr.map(img => {
          imgList.push(img.url)
        })
        evaluateGoodsList.push({
          order_sn: this.data.order_sn,
          seller_id: this.data.seller_id,
          shop_id: this.data.seller_id,
          goods_id: g.goods_id,
          goods_spec_id: g.sku_id,
          goods_type: this.data.order_type,
          evaluate_star: g.evaluate_star,
          evaluate_content: g.evaluate_content,
          evaluate_images: imgList.join(','),
          is_anonymous: this.isAnonymous ? 1 : 0
        })
      })

      let evaluateEmployeeList = []
      this.employeeData.map(e => {
        evaluateEmployeeList.push({
          order_sn: this.data.order_sn,
          seller_id: this.data.seller_id,
          shop_id: this.data.seller_id,
          employee_id: e.employee_id,
          evaluate_star: e.evaluate_star,
          evaluate_content: e.evaluate_content
        })
      })

      this.setLoading({
        status: true,
        opacity: 0
      })
      console.log(evaluateGoodsList)
      let res = await submitEvaluate(qs.stringify({
        evaluateShop: evaluateShop,
        evaluateGoodsList: evaluateGoodsList,
        evaluateEmployeeList: evaluateEmployeeList
      }))
      this.setLoading(false)
      if (res && res.code === 200) {
        this.$router.back()
      }
    }
  },
  created () {
    this.loadOrderDetail()
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/pub";

.seller-group {
  background-color: $default_background_color;
  .seller-logo {
    margin-right: 20px;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}

.goods-evaluate-group {
  .camera-icon {
    width: 120px;
    height: 120px;
    background-size: 120px 120px;
    margin-right: 20px;
  }

  .employee-icon {
    margin-right: 10px;
  }

  .goods-image {
    margin-right: 20px;
    display: block;
    width: 120px;
    height: 120px;
  }

  .goods-star {
    .center {
      margin: 0 20px;
    }
    .goods-star-icon {
      width: 60px;
      height: 60px;
      background-size: 60px 60px;
    }
    .active {
      color: #0080ff !important;
    }

    .edit-icon {
      width: 40px;
      height: 40px;
      background-size: 40px 40px;
      margin-left: 20px;
    }
  }
}

.seller-evaluate-group {
  .seller-icon {
    margin-right: 10px;
  }
}

.employee-evaluate-group {
  .employee-icon {
    margin-right: 10px;
  }

  .employee-logo {
    margin-right: 20px;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .employee-star {
    .center {
      margin: 0 20px;
    }
    .employee-star-icon {
      width: 60px;
      height: 60px;
      background-size: 60px 60px;
    }
    .active {
      color: #0080ff !important;
    }

    .edit-icon {
      width: 40px;
      height: 40px;
      background-size: 40px 40px;
      margin-left: 20px;
    }
  }
}
</style>

<style lang="scss">
@import "../../../assets/css/pub";
.evaluate-content {
  .weui-cells:after {
    border-bottom: none !important;
  }

  .weui-cells:before {
    border-top: none !important;
  }

  .weui-cell:after {
    border-bottom: none !important;
  }

  .weui-cell:before {
    border-top: none !important;
  }

  .weui-textarea {
    background-color: #f5f5f5;
    font-size: $default_font_size;
    padding: 10px 20px;
    width: calc(100% - 40px);
  }

  .weui-uploader__input-box {
    width: 120px !important;
    height: 120px !important;
  }

  .weui-uploader__file {
    width: 120px !important;
    height: 120px !important;
  }
}
</style>

