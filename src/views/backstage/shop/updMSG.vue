<template>
  <div>
    <Header title="修改信息"></Header>
    <section class="section">
      <Upload @on-upload="onUpload"
              :data="images"
              title="店铺照片"></Upload>
      <group>
        <cell title="店铺名字"
              isLink>
          <template>
            <input type="text"
                   v-model="shopName"
                   class="weui-input"
                   placeholder="请输入店铺名字"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="联系人"
              isLink>
          <template>
            <input type="text"
                   v-model="name"
                   class="weui-input"
                   placeholder="请输入联系人"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="地址"
              isLink>
          <template>
            <input type="text"
                   v-model="place"
                   class="weui-input"
                   placeholder="请输入地址"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="联系方式"
              isLink>
          <template>
            <input type="number"
                   v-model="phone"
                   class="weui-input"
                   placeholder="请输入联系方式"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="收款账户"
              isLink>
          <template>
            <input type="number"
                   v-model="code"
                   class="weui-input"
                   placeholder="请输入收款账户"
                   style="text-align:right;" />
          </template>
        </cell>
        <x-textarea title="店铺详情"
                    v-model="shopIntroduction"
                    :height="100"
                    style="font-size: 12px;"></x-textarea>
        <div class="border-1px"></div>
        <Upload @on-upload="onUpload2"
                :data="images2"
                title="营业资质"></Upload>
      </group>
      <x-button @click.native="sure"
                type="warn"
                style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确认修改</x-button>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Upload from 'Common/Upload'
import { Group, Cell, XInput, XTextarea, XButton } from 'vux'
import { updateSellerInfo } from '@api'
export default {
  name: 'updMSG',
  components: {
    Header,
    Upload,
    Group,
    Cell,
    XInput,
    XTextarea,
    XButton
  },
  data () {
    return {
      images: [],
      images2: [],
      shopName: '',
      name: '',
      place: '',
      phone: '',
      code: '',
      shopIntroduction: '',
      isShowChooseBrand: false
    }
  },
  created () {
  },
  methods: {
    async _updateSellerInfo () {
      let form = new FormData()
      let data = this.$route.query.sellerInfo
      form.append('seller_id', data.seller_id)
      form.append('user_id', data.user_id)
      form.append('seller_type_id', data.seller_type_id)
      form.append('seller_name', this.shopName)
      form.append('region_id', data.region_id)
      form.append('region_key', data.region_key)
      form.append('seller_address', this.place)
      form.append('longitude', data.longitude)
      form.append('latitude', data.latitude)
      form.append('contacts_name', this.name)
      form.append('contacts_mobile', this.phone)
      form.append('contacts_email', data.contacts_email)
      form.append('licence_number', data.licence_number)
      form.append('business_license_img', data.business_license_img)
      form.append('business_license_start', data.business_license_start)
      form.append('business_license_end', data.business_license_end)
      form.append('is_longtime', data.is_longtime)
      form.append('organization_code', data.organization_code)
      form.append('organization_code_img', data.organization_code_img)
      form.append('empirical_range', data.empirical_range)
      form.append('bank_account_name', data.bank_account_name)
      form.append('bank_account_number', data.bank_account_number)
      form.append('bank_name', data.bank_name)
      form.append('bank_address', data.bank_address)
      form.append('is_settlement_account', data.is_settlement_account)
      form.append('settlement_bank_account_number', data.settlement_bank_account_number)
      form.append('settlement_bank_account_name', data.settlement_bank_account_name)
      form.append('settlement_bank_name', data.settlement_bank_name)
      form.append('settlement_bank_address', data.settlement_bank_address)
      form.append('create_time', data.create_time)
      form.append('update_time', data.update_time)
      form.append('seller_status', data.seller_status)
      form.append('seller_status_desc', data.seller_status_desc)
      form.append('shop_name', data.shop_name)
      form.append('shop_keyword', data.shop_keyword)
      form.append('seller_introduction', this.shopIntroduction)
      form.append('seller_evaluate', data.seller_evaluate)
      form.append('shop_type', data.shop_type)
      form.append('document_type', data.document_type)
      form.append('identification_number', data.identification_number)
      form.append('card_front', data.card_front)
      form.append('card_side', data.card_side)
      form.append('hand_photo', data.hand_photo)
      form.append('seller_logo', data.seller_logo)
      form.append('shop_phone', this.code)
      form.append('hours_phone', data.hours_phone)
      form.append('seller_head_img', data.seller_head_img)
      form.append('seller_state', data.seller_state)
      form.append('state_desc', data.state_desc)
      form.append('is_self', data.is_self)
      form.append('weixin_openid', data.weixin_openid)
      form.append('handling_fee_rate', data.handling_fee_rate)
      form.append('is_points_zone', data.is_points_zone)
      form.append('points_billing_ratio', data.points_billing_ratio)
      form.append('points_remarks', data.points_remarks)
      form.append('applicant', data.applicant)
      form.append('contact_information', data.contact_information)
      form.append('inviter_user_id', data.inviter_user_id)
      form.append('seller_level_name', data.seller_level_name)
      form.append('upgrade_amount', data.upgrade_amount)
      form.append('remarks', data.remarks)
      form.append('publication_status', data.publication_status)
      form.append('publication_name', data.publication_name)
      form.append('publication_mobile', data.publication_mobile)
      form.append('publication_fee', data.publication_fee)
      form.append('advance_status', data.advance_status)
      form.append('advance_name', data.advance_name)
      form.append('advance_mobile', data.advance_mobile)
      form.append('advance_fee', data.advance_fee)
      form.append('wholesale_status', data.wholesale_status)
      form.append('wholesale_name', data.wholesale_name)
      form.append('wholesale_mobile', data.wholesale_mobile)
      form.append('wholesale_fee', data.wholesale_fee)
      form.append('seller_invitation_code', data.seller_invitation_code)
      let res = await updateSellerInfo(form)
      if (res && res.code === 200) {
        console.log(res)
      }
    },
    onUpload: function (val) {
      this.images = []
      this.images = val
    },
    onUpload2: function (val) {
      this.images2 = []
      this.images2 = val
    },
    sure () {
      this._updateSellerInfo()
      console.log('确认修改')
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  bottom: 45px;
  left: 0;
  right: 0;
  overflow: auto;
}

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

.border-1px {
  height: 1px;
  border-bottom: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>

