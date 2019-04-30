<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.params.id ? '修改收货地址' : '新建收货地址'}}
      <a class="saveBtn" slot="right" @click="submit">保存</a>
    </x-header>
    <div class="content">
      <group>
        <x-input title="收货人" placeholder="请输入姓名" v-model="form.receiver_name" :max="20" placeholder-align="right" text-align="right"></x-input>
        <x-input title="手机号码" placeholder="请输入手机号码" mask="999 9999 9999" :max="13" v-model="form.receiver_mobile" placeholder-align="right" text-align="right"></x-input>
        <x-input title="邮箱" placeholder="请输入收邮箱" :max="20" v-model="form.receiver_email" placeholder-align="right" text-align="right"></x-input>
        <popup-picker title="所在地区" placeholder="请选择所在地区" :columns="3" :data="regionData" v-model="form.region_idVal" @on-change="onAreaChange" show-name></popup-picker>
        <x-input title="详细地址" placeholder="街道、楼牌号等" v-model="form.address" :max="30" placeholder-align="right" text-align="right"></x-input>
        <cell title="标签" :primary="'content'">
          <checker v-model="form.receiver_remark" default-item-class="checker-item" selected-item-class="checker-item-selected">
            <checker-item v-for="i in ['家', '公司', '学校']" :key="i" :value="i">{{i}}</checker-item>
          </checker>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import { submitAddress, getAddress, getGeocode } from '@api'
  import { mapMutations, mapState } from 'vuex'
  import { SET_LOADING } from '@store/type'
  import { Group, PopupPicker, XInput, Cell, Checker, CheckerItem, CheckIcon, XHeader } from 'vux'
  import { removeAllSpace } from '@js/util'

  export default {
    components: {
      XHeader,
      Group,
      PopupPicker,
      XInput,
      Cell,
      Checker,
      CheckerItem,
      CheckIcon
    },
    computed: {
      ...mapState(['token'])
    },
    data () {
      return {
        markRequired: false,
        regionData: [],
        form: {
          region_idVal: [],
          delivery_addressid: this.$route.params.id,
          receiver_name: null,
          receiver_mobile: null,
          receiver_email: null,
          receiver_remark: null,
          province: null,
          city: null,
          district: null,
          address: null,
          best_time: null,
          zipcode: null,
          longitude: null,
          latitude: null,
          is_default: false
        }
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 默认地址切换
      defaultChange () {
        this.form.is_default = this.status ? 1 : 0
      },
      // 地区切换
      onAreaChange (val) {
        if (val && val.length > 0) {
          this.form.province = val[0]
          this.form.city = val[1]
          this.form.district = val[2]
        }
      },
      // 加载省市区
      loadRegions () {
        let regions = localStorage.getItem('regions')
        if (regions) {
          this.regionData = JSON.parse(regions)
        }
      },
      // 加载我的收货地址
      async loadAddress () {
        if (this.form.delivery_addressid) {
          this.setLoading({
            status: true,
            opacity: 0
          })
          let res = await getAddress(this.form.delivery_addressid)
          this.setLoading(false)
          if (res && res.code === 200) {
            this.form = res.data
          }
        }
      },
      isValid () {
        if (!this.form.receiver_name || this.form.receiver_name.length === 0) {
          this.$toasted.show('请先输入收货人姓名！')
          return false
        }
        if (!this.form.receiver_mobile || this.form.receiver_mobile.length === 0) {
          this.$toasted.show('请输入收货人手机号码！')
          return false
        }
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(removeAllSpace(this.form.receiver_mobile))) {
          this.$toasted.show('请输入正确的手机号码！')
          return false
        }
        if (!this.form.region_idVal || this.form.region_idVal.length === 0) {
          this.$toasted.show('请先选择收货人所在地区！')
          return false
        }
        if (!this.form.address || this.form.address.length === 0) {
          this.$toasted.show('请选择收货人详细地址！')
          return false
        }
        return true
      },
      // 保存收货地址
      async submit () {
        if (!this.isValid()) {
          return
        }

        this.setLoading({
          status: true,
          opacity: 0
        })
        // 解码详细地址经纬度纬度和邮编
        let cityRegion = this.regionData.find(i => i.value === this.form.city)
        let cityName = cityRegion.name
        let address = this.form.address
        let result = await getGeocode(address, cityName)
        if (result.data.status === '1' && result.data.info === 'OK') {
          let geocodes = result.data.geocodes
          if (geocodes && geocodes.length > 0) {
            let geocode = geocodes[0]
            let location = geocode.location.split(',')
            this.form.longitude = location[0]
            this.form.latitude = location[1]
            this.form.zipcode = geocode.adcode
          }
        }

        let formData = new FormData()
        for (let key in this.form) {
          if (this.form[key]) {
            formData.append(key, this.form[key])
          }
        }

        let res = await submitAddress(formData)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show(res.msg)
          this.$router.back()
        }
      }
    },
    created () {
      this.loadRegions()
      this.loadAddress()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/pub';

  .content {
    height: calc(100% - #{$default_navbar_height});
  }

  .checker-item {
    padding: 0px 40px;
    text-align: center;
    border-radius: 10px;
    border: 2px solid $default_border_color;
    background-color: #fff;
    margin-left: 20px;
  }
  .checker-item-selected {
    background: #ffffff url(../../../assets/image/rbchecked_icon@2x.png) no-repeat right bottom;
    border-color: $default_red_color;
    background-size: 64px;
    border: 2px solid $default_red_color;
    background-position-x: 104%;
    color: $default_red_color;
  }
</style>
