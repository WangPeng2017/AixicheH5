<template>
<div class="view">
    <x-header :left-options="{backText: ''}" class="vux-1px-b">添加新账户</x-header>
    <div class="card">
        <p>开户行<input type="text" id="admintel" v-model="form.bank_name" /><i class="rightss"></i></p>
    </div>
    <div class="cardnum">
        <p>银行账号<input type="text" id="name" v-model="form.account_number" /><i class="rightss"></i></p>
   </div>
   <div class="adminname">
        <p>持卡人姓名<input type="text" id="name" v-model="form.account_name" /><i class="rightss"></i></p>
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
        user_type: 2
      }
    }
  },
  methods: {
    async submit () {
      if (!this.form.bank_name || this.form.bank_name.length === 0) {
        return this.$toasted.show('请先输入开户行名称！')
      }
      if (!this.form.account_number || this.form.account_number.length === 0) {
        return this.$toasted.show('请先输入银行卡账号！')
      }
      if (!this.form.account_name || this.form.account_name.length === 0) {
        return this.$toasted.show('请先输入持卡人姓名！')
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
.view{
    .card{
        padding-left: 10px;
        width:100%;
        margin-top: 20px;
        line-height: 60px;
        background:rgba(255,255,255,1);
        p{
            font-size: 28px;
          #admintel{
            width:60%;
            height:60px;
            background:rgba(255,255,255,1);
            border: 0;
            padding-left: 15px;
            color: gray;
          }
        .rightss{
            float: right;
            padding: 10px;
          }
        }
    }
.cardnum{
        width: 100%;
        line-height: 60px;
        margin-top: 20px;
        background:rgba(255,255,255,1);
        p{
            padding-left: 10px;
            font-size: 28px;
          #name{
            width:60%;
            height:60px;
            background:rgba(255,255,255,1);
            border: 0;
            padding-left: 18px;
            color: gray;
          }
          .rightss{
            float: right;
            padding: 10px;
          }
        }
    }
.adminname{
        width: 100%;
        line-height: 60px;
        margin-top: 20px;
        background:rgba(255,255,255,1);
        p{
            padding-left: 10px;
            font-size: 28px;
          #name{
            width:60%;
            height:60px;
            background:rgba(255,255,255,1);
            border: 0;
            padding-left: 15px;
            color: gray;
          }
          .rightss{
            float: right;
            padding: 10px;

          }
        }
    }
    button{
    text-align: center;
    width: 100%;
    height: 98px;
    position: fixed;
    left:0;
    bottom:0;
    border: 0;
    color: #fff;
    background:#ff0036;
  }
}
</style>

    