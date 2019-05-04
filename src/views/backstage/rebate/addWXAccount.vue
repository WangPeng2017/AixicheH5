<template>
  <div>
    <Header title="提现"></Header>
    <section class="section">
      <group class="group">
        <cell title="账号">
          <template>
            <input type="text"
                   v-model="accountCode"
                   class="weui-input"
                   placeholder="请输入账号"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="账号名称">
          <template>
            <input type="text"
                   v-model="accountName"
                   class="weui-input"
                   placeholder="请输入账号名称"
                   style="text-align:right;" />
          </template>
        </cell>
      </group>
    </section>
    <x-button @click.native="sure"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确定</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell, XButton } from 'vux'
import { submitPaymentAccount } from '@api'
export default {
  name: 'addWXAccount',
  components: {
    Header,
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      accountCode: '',
      accountName: ''
    }
  },
  methods: {
    async sure () {
      let form = {
        'account_id': '',
        'user_id': '83b0e4f9-3dcc-4a60-8a42-df514ed239f5',
        'user_type': 0,
        'account_name': this.accountName,
        'account_number': this.accountCode,
        'bank_name': '',
        'branch_name': '',
        'branch_address': 'string',
        'account_type': 0,
        'is_default': 0,
        'is_enabled': 0,
        'create_time': '',
        'create_userid': '',
        'update_time': '',
        'update_userid': '',
        'account_desc': ''

      }
      if (!form.account_name || form.account_name.length === 0) {
        return this.$toasted.show('请先输入账号！')
      }
      if (!form.account_number || form.account_number.length === 0) {
        return this.$toasted.show('请先输入账号名称！')
      }
      form = JSON.stringify(form)
      // 添加用户微信收款账户
      let res = await submitPaymentAccount(form, '83b0e4f9-3dcc-4a60-8a42-df514ed239f5')
      console.log(res)
      // if (res.code === 200) {
      //   this.$toasted.show(res.msg)
      //   this.$router.back()
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.group {
  .isActive {
    background: rgba(239, 239, 239, 1);
  }
}
.section {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>

