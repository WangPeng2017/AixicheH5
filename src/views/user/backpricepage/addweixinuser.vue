<template>
  <div class="view">
    <x-header
      :left-options="{backText: ''}"
      class="vux-1px-b"
    >添加账户</x-header>
    <div class="admin">
      <p>账号<input
          type="text"
          id="admintel"
          placeholder="请输入账号"
          v-model="form.account_number"
        /><i class="rightss"></i></p>
    </div>
    <div class="adminname">
      <p>账号名称<input
          type="text"
          id="name"
          placeholder="请输入账号名称"
          v-model="form.account_name"
        /><i class="rightss"></i></p>
    </div>
    <button @click="submit">确定</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { SubmitPaymentAccount } from '@api'
export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      form: {
        user_type: 2,
        account_type: 2
      }
    }
  },
  methods: {
    async submit () {
      if (!this.form.account_number || this.form.account_number.length === 0) {
        return this.$toasted.show('请先输入微信账号！')
      }
      if (!this.form.account_name || this.form.account_name.length === 0) {
        return this.$toasted.show('请先输入微信名称！')
      }
      // 添加用户微信收款账户
      let res = await SubmitPaymentAccount(this.form)
      if (res.code === 200) {
        this.$toasted.show(res.msg)
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.view {
  .admin {
    padding-left: 10px;
    width: 100%;
    margin-top: 20px;
    line-height: 60px;
    background: rgba(255, 255, 255, 1);
    p {
      text-align: left;
      font-size: 28px;
      #admintel {
        width: 60%;
        height: 60px;
        background: rgba(255, 255, 255, 1);
        border: 0;
        padding-left: 12px;
        color: gray;
      }
      .rightss {
        float: right;
        padding: 10px;
      }
    }
  }
  .adminname {
    padding-left: 10px;
    width: 100%;
    line-height: 60px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 1);
    p {
      text-align: left;
      font-size: 28px;
      #name {
        width: 60%;
        height: 60px;
        background: rgba(255, 255, 255, 1);
        border: 0;
        padding-left: 12px;
        color: gray;
      }
      .rightss {
        float: right;
        padding: 10px;
      }
    }
  }
  button {
    text-align: center;
    width: 100%;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    border: 0;
    color: #fff;
    background: #ff0036;
  }
}
</style>

    