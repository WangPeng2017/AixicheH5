<template>
  <div>
    <Header title="商家套餐"></Header>
    <section style="position:absolute; top: 45px; bottom: 0; left: 0; right: 0;overflow:auto;">
      <Upload @on-upload="onUpload"
              :data="images"
              title="封面图"></Upload>
      <group>
        <cell title="套餐名称"
              isLink>
          <template>
            <input type="text"
                   v-model="CardName"
                   class="weui-input"
                   placeholder="请输入套餐名称"
                   style="text-align:right;" />
          </template>
        </cell>
        <popup-picker title="选择卡种"
                      :data="dataType"
                      v-model="cardType"
                      placeholder="请选择卡种"></popup-picker>
        <cell title="套餐面额"
              isLink>
          <template>
            <input type="number"
                   v-model="cardPrice"
                   class="weui-input"
                   placeholder="请输入套餐面额"
                   style="text-align:right;" />
          </template>
        </cell>
        <datetime v-model="date"
                  title="套餐有效期"
                  placeholder="请选择套餐有效期"
                  @on-confirm="onConfirm"></datetime>

        <x-textarea title="套餐介绍"
                    v-model="cardIntroduction"
                    :height="100"
                    style="font-size: 12px;">
        </x-textarea>
      </group>
      <x-button @click.native="submitCard"
                type="warn"
                style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">下一步</x-button>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import Upload from 'Common/Upload'
import {
  Group,
  Cell,
  XInput,
  XTextarea,
  XButton,
  PopupPicker,
  Datetime
} from 'vux'
export default {
  name: 'addSJCard',
  components: {
    Header,
    Upload,
    Group,
    Cell,
    XInput,
    XTextarea,
    XButton,
    PopupPicker,
    Datetime
  },
  data () {
    return {
      images: [],
      CardName: '',
      cardType: ['请选择'],
      dataType: [['请选择', '购物卡', '服务卡']],
      date: '',
      cardPrice: '',
      cardIntroduction: ''
    }
  },
  methods: {
    onUpload: function (val) {
      this.images = []
      this.images = val
    },
    onConfirm: function () { },
    submitCard () {
      if (this.cardType[0] === '服务卡') {
        this.$router.push({ name: 'addGoodsFWCard' })
        sessionStorage.setItem('cardType', 'fw')
      } else {
        this.$router.push({ name: 'addGoodsGWCard' })
        sessionStorage.setItem('cardType', 'gw')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

