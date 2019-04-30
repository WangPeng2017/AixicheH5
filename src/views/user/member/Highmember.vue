<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">高级合伙人</x-header>
    <div class="top">
      <!-- <img src="../../../assets/image/waitguestt.png" alt=""/> -->
      <div class="waitguestt"></div>
      <button class="waitt">请等待客服联系</button>
    </div>
    <h3>上传支付凭证图片</h3>
    <group>
      <div class="middle">
        <div class="pic">
          <uploader :images="imgData"
                    :handle-click="false"
                    :show-header="false"
                    :show-tip="false"
                    :autoUpload="true"
                    :uploadUrl="'/UploadFile/Upload'"
                    :autoRemove="true"
                    :removeUrl="'/UploadFile/Remove'"></uploader>
        </div>
      </div>
    </group>
    <button class="addfast"
            @click="submit">立即加入</button>
  </div>
</template>

<script>
import { Cell, PopupRadio, Group, XInput, XTextarea, XHeader } from 'vux'
import { UpdataUpgradeApplication, isUpgradeApplication } from '@api'
import Uploader from '@comps/uploader/uploader'
export default {
  data () {
    return {
      form: {},
      imgData: []
    }
  },
  components: {
    Cell,
    PopupRadio,
    Group,
    XInput,
    XTextarea,
    XHeader,
    Uploader
  },
  methods: {
    async load () {
      let isres = await isUpgradeApplication()
      if (isres && isres.code === 200) {
        if (isres.data.payment_voucher) {
          this.imgData.push({
            url: isres.data.payment_voucher
          })
        }
        this.form.status = isres.data.status
      }
    },
    async submit () {
      console.log(this.imgData)
      if (this.imgData.length > 0) {
        this.form.payment_voucher = this.imgData[0].url
      }
      console.log(this.form.payment_voucher)
      if (!this.form.payment_voucher || this.form.payment_voucher.length === 0) {
        this.$toasted.show('请先上传支付凭证！')
        return false
      }
      if (this.form.status === 1) {
        let res = await UpdataUpgradeApplication(this.form)
        if (res && res.code === 200) {
          alert(res.msg)
          this.$router.push('/my')
        } else {
          alert(res.msg)
        }
      } else {
        alert('您的申请还未开始审核，请等待客服联系！')
      }
    }
  },
  created () {
    this.load()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.view {
  width: 100%;
  // height:auto;
  background-color: #ece5d3;
  text-align: center;
  .top {
    width: 94%;
    height: 551px;
    margin: 3%;
    background-color: #fff;
    .waitguestt {
      margin-top: 8%;
      margin-left: 3%;
    }
    .waitt {
      display: block;
      width: 268px;
      height: 56px;
      border: 0;
      color: #a36a10;
      background-color: #e5d4bb;
      margin-bottom: 5%;
      margin-left: 33%;
    }
  }
  h3 {
    font-size: 22px;
    color: #a36a10;
    text-align: left;
    margin-left: 3%;
  }
  .middle {
    width: 94%;
    margin: 3%;
    background-color: #fff;
    .pic {
      padding: 2%;
    }
  }
  .addfast {
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 5px;
    width: 100%;
    height: 94px;
    border: 0;
    color: #fff;
    font-size: $default_font_size;
    font-weight: bold;
    background-color: #b08440;
  }
}
</style>

