<template>
  <div class="view">
    <x-header
      :left-options="{backText: ''}"
      class="vux-1px-b"
    >身份验证</x-header>
    <div class="content">
      <ul>
        <li>联系人姓名<input
            type="text"
            class="nameuser"
            v-model="form.contact_name"
          /><i class="rightss"></i></li>
        <hr style="background-color:#CDCDCD;height:0.8px;border:0;" />
        <li>联系人手机号<input
            type="text"
            class="nameuser"
            maxlength="11"
            v-model="form.contact_Phone"
          /><i class="rightss"></i></li>
      </ul>
    </div>
    <button @click="submit()">确定</button>
  </div>
</template>
<script>
import { submitUpgradeApplication } from '@api'
import { removeAllSpace } from '@js/util'

export default {
  data () {
    return {
      form: {
        contact_name: '',
        contact_Phone: ''
      }
    }
  },
  methods: {
    async submit () {
      if (!this.form.contact_name || this.form.contact_name.length === 0) {
        this.$toasted.show('请先输入联系人姓名！')
        return false
      }
      if (!this.form.contact_Phone || this.form.contact_Phone.length === 0) {
        this.$toasted.show('请先输入联系人手机号！')
        return false
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(removeAllSpace(this.form.contact_Phone))) {
        this.$toasted.show('请输入正确的手机号码！')
        return false
      }
      let ret = await submitUpgradeApplication(this.form)
      if (ret.code === 200) {
        this.$router.push('/myhighmember')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.view {
  background: #ece5d3;
  .content {
    background: #fff;
    margin: 3%;
    width: 94%;
    height: 148px;
    text-align: center;
    ul {
      li {
        margin: 2%;
        text-align: left;
        input {
          margin-left: 3%;
          border: 0;
        }
        .rightss {
          float: right;
          padding-right: 5px;
        }
      }
    }
  }
  button {
    width: 100%;
    font-size: 34px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    border: 0;
    position: fixed;
    bottom: 0;
    color: #fff;
    background: #b08440;
    text-align: center;
    height: 89px;
  }
}
</style>

