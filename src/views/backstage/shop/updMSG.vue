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
  methods: {
    onUpload: function (val) {
      this.images = []
      this.images = val
    },
    onUpload2: function (val) {
      this.images2 = []
      this.images2 = val
    },
    sure () {
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

