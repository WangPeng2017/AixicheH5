<template>
  <div>
    <Header title="发布招聘"></Header>
    <section class="section">
      <group style="margin: 10px 0;">
        <cell title="联系人"
              isLink>
          <template>
            <input type="text"
                   v-model="contactName"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="联系电话"
              isLink>
          <template>
            <input type="Number"
                   v-model="contactPhone"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="邮箱/微信"
              isLink>
          <template>
            <input type="text"
                   v-model="contactEmail"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
      </group>
      <group>
        <div class="line1">
          <span class="title">企业简介</span>
          <span class="label">请输入企业简介</span>
        </div>
        <x-textarea v-model="jobRequirements"
                    :height="80"
                    style="font-size: 12px;"></x-textarea>
        <div class="line1">
          <span class="title">职位要求</span>
          <span class="label">请输入职位要求</span>
        </div>
        <x-textarea v-model="companyIntroduction"
                    :height="80"
                    style="font-size: 12px;"></x-textarea>
        <div class="line1">
          <span class="title">福利待遇</span>
          <span class="label">请输入福利待遇</span>
        </div>
        <x-textarea v-model="jobWelfare"
                    :height="80"
                    style="font-size: 12px;"></x-textarea>
      </group>
      <x-button @click.native="publish"
                type="warn"
                style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">立即发布</x-button>
    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell, XInput, PopupPicker, XTextarea, XButton } from 'vux'
export default {
  name: 'addJob',
  components: {
    Header,
    Group,
    Cell,
    XInput,
    PopupPicker,
    XTextarea,
    XButton
  },
  data () {
    return {
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      companyIntroduction: '',
      jobRequirements: '',
      jobWelfare: ''
    }
  },
  methods: {
    publish () {
      this.$router.push({ name: 'jobDetail' })
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

  .line1 {
    padding: 10px 0;
    font-size: 0;
    overflow: hidden;

    .title {
      float: left;
      padding-left: 16px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 1;
    }
    .label {
      float: right;
      padding-right: 16px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
    }
  }

  .vux-x-textarea:before {
    display: none;
  }
}
</style>

