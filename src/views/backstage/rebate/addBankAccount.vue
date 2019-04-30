<template>
  <div>
    <Header title="提现"></Header>
    <section class="section">
      <group class="group">
        <cell title="开户行">
          <template>
            <input type="text"
                   v-model="bankName"
                   class="weui-input"
                   placeholder="请输入开户行"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="银行账号">
          <template>
            <input type="Number"
                   v-model="bankCode"
                   class="weui-input"
                   placeholder="请输入银行账号"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="持卡人姓名">
          <template>
            <input type="text"
                   v-model="name"
                   class="weui-input"
                   placeholder="请输入持卡人姓名"
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
      bankName: '',
      bankCode: '',
      name: ''
    }
  },
  methods: {
    sure () {
      this.$router.back()
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

