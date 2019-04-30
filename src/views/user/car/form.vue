<template>
  <div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">{{$route.params.id ? '修改爱车' : '添加爱车'}}
      <a class="saveBtn" slot="right" @click="submit">保存</a>
    </x-header>
    <div class="content">
      <group>
        <cell title="品牌车型" @click.native="go('/cartypeListForBrand')" :value.sync="form.car_typename" is-link primary="content"></cell>
        <popup-radio title="车辆性质" placeholder="请选择车辆性质" :options="propsOptions" v-model="form.car_belongtype">
          <p slot="popup-header" class="vux-1px-b title-slot">请选择车辆性质</p>
        </popup-radio>
        <x-input title="公司名称" placeholder="请输入公司名称" placeholder-align="right" text-align="right" v-model="form.car_belongcompany" v-if="form.car_belongtype!=='1'"></x-input>
      </group>
      <group>
        <cell title="爱车图片" :primary="'content'">
          <uploader
            :images="carImgData"
            :handle-click="false"
            :show-header="false"
            :show-tip="false"
            :autoUpload="true"
            :uploadUrl="'/UploadFile/Upload'"
            :autoRemove="true"
            :removeUrl="'/UploadFile/Remove'"
          ></uploader>
        </cell>
        <cell title="车牌号" @click.native="$refs.carlicensePicker.show()" :value.sync="form.car_licensenumber" is-link></cell>
        <x-input title="车架号" placeholder="请输入车架号" placeholder-align="right" text-align="right" v-model="form.car_code"></x-input>
        <x-input title="发动机号" placeholder="请输入车架号" placeholder-align="right" text-align="right" v-model="form.car_enginenumber"></x-input>
        <datetime title="上牌时间" placeholder="请输选择上牌时间" :min-year="1949" :max-year="currentYear" v-model="form.car_registdate"></datetime>
        <x-input title="行驶里程" placeholder="请输入行驶里程" placeholder-align="right" text-align="right" keyboard="number" type="number" :max="200000" :min="0" v-model="form.car_mileage"></x-input>
      </group>
      <car-license-picker ref="carlicensePicker" @complete="licenseChange" :carNumber="form.car_licensenumber"></car-license-picker>
    </div>
  </div>
</template>

<script>
  import { XHeader, XInput, Group, Cell, PopupRadio, Datetime } from 'vux'
  import Uploader from '@comps/uploader/uploader'
  import carLicensePicker from '@comps/picker/carLicensePicker'
  import { submitCar, getCar, getDictionaryList } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      XHeader,
      XInput,
      Group,
      Cell,
      PopupRadio,
      Datetime,
      Uploader,
      carLicensePicker
    },
    data () {
      return {
        form: {
          car_id: this.$route.params.id,
          car_typeid: null,
          car_typename: null,
          car_belongtype: '1',
          car_belongcompany: null,
          car_licensenumber: null,
          car_code: null,
          car_enginenumber: null,
          car_registdate: null,
          car_mileage: 0
        },
        propsOptions: [],
        carImgData: [],
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 车牌号改变事件
      licenseChange (no) {
        this.form.car_licensenumber = no
      },
      go (url) {
        this.$router.push({
          path: url,
          query: this.$route.query
        })
      },
      // 加载车辆性质
      async loadCarProps () {
        let res = await getDictionaryList('carprops')
        if (res && res.code === 200) {
          this.propsOptions = res.data
        }
      },
      // 加载我的车辆
      async loadCar () {
        if (this.form.car_id) {
          this.setLoading({
            status: true,
            opacity: 0
          })
          let res = await getCar(this.form.car_id)
          this.setLoading(false)
          if (res && res.code === 200) {
            this.form = res.data

            if (this.form.car_img && this.form.car_img.length > 0) {
              this.carImgData.push({
                url: this.form.car_img
              })
            }
          }
        }
      },
      isValid () {
        if (!this.form.car_typeid) {
          this.$toasted.show('请先选择车型！')
          return false
        }
        if (!this.form.car_belongtype) {
          this.$toasted.show('请先选择车辆性质！')
          return false
        }

        if (this.form.car_belongtype !== '1' && (!this.form.car_belongcompany || this.form.car_belongcompany.length === 0)) {
          this.$toasted.show('请先输入所属公司名称！')
          return false
        }

        if (!this.form.car_licensenumber || this.form.car_licensenumber.length === 0) {
          this.$toasted.show('请先输入车牌号！')
          return false
        }
        return true
      },
      async submit () {
        if (!this.isValid()) {
          return
        }

        this.setLoading({
          status: true,
          opacity: 0
        })

        if (this.carImgData.length >= 1) {
          this.form.car_img = this.carImgData[0].url
        }

        let formData = new FormData()
        for (let key in this.form) {
          if (this.form[key]) {
            formData.append(key, this.form[key])
          }
        }

        let res = await submitCar(formData)
        this.setLoading(false)
        if (res && res.code === 200) {
          this.$toasted.show(res.msg)
          this.$router.back()
        }
      }
    },
    created () {
      this.loadCarProps()
      this.loadCar()
    },
    activated () {
      let cartypeJson = sessionStorage.getItem('cartype')
      if (cartypeJson) {
        let cartypeObj = JSON.parse(cartypeJson)
        this.form.car_typeid = cartypeObj.id
        this.form.car_typename = cartypeObj.name
      }
    },
    destroyed () {
      sessionStorage.removeItem('cartype')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height});
  }

  .title-slot {
    text-align: center;
    padding: 20px;
    color: $default_title_color;
  }
</style>
