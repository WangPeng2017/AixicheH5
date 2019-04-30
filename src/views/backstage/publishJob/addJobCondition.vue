<template>
  <div>
    <Header title="发布招聘"></Header>
    <section class="section">
      <group>
        <cell title="职位名称"
              isLink>
          <template>
            <input type="text"
                   v-model="jobName"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="年龄要求"
              isLink>
          <template>
            <input type="text"
                   v-model="jobAge"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <popup-picker title="性别要求"
                      :data="dataSex"
                      v-model="jobSex"
                      placeholder="请选择"></popup-picker>
        <!-- <popup-radio title="性别要求" :options="dataSex" v-model="jobSex"></popup-radio> -->

        <cell title="薪资"
              isLink>
          <template>
            <input type="text"
                   v-model="jobPay"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <cell title="工作地址"
              isLink>
          <template>
            <input type="text"
                   v-model="jobPlace"
                   class="weui-input"
                   placeholder="请输入"
                   style="text-align:right;" />
          </template>
        </cell>
        <popup-picker title="工作经验"
                      :data="dataExperience"
                      v-model="jobExperience"></popup-picker>
        <popup-picker title="学历"
                      :data="dataEducation"
                      v-model="jobEducation"></popup-picker>
        <popup-picker title="工作性质"
                      :data="dataType"
                      v-model="jobType"></popup-picker>
      </group>
      <x-button @click.native="next"
                type="warn"
                style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">下一步</x-button>

    </section>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { Group, Cell, XInput, PopupPicker, XButton } from 'vux'
export default {
  name: 'addJob',
  components: {
    Header,
    Group,
    Cell,
    XInput,
    PopupPicker,
    XButton
  },
  data () {
    return {
      images: [],
      jobName: '',
      jobAge: '',
      age: '',
      jobSex: ['请选择'],
      dataSex: [['请选择', '男', '女']],
      jobExperience: ['请选择'],
      dataExperience: [['请选择', '不限', '1年', '2年', '3年', '3年以上']],
      jobEducation: ['请选择'],
      dataEducation: [
        ['请选择', '不限', '高中及以上', '本科及以上', '硕士及以上', '博士']
      ],
      jobType: ['请选择'],
      dataType: [['请选择', '全职', '兼职']],
      jobPay: '',
      jobPlace: ''
    }
  },
  methods: {
    next () {
      this.$router.push({ name: 'addJobMsg' })
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  top: 45px;
  bottom: 0;
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
  .group {
    background: #fff;

    /deep/ .weui-cells__title {
      margin-top: 0;
      padding-top: 0.77em;
      border: 0;
      color: #000;
      font-size: 17px;
    }

    /deep/ .weui-cells:before {
      display: none;
    }
  }

  .toolbox {
    overflow: hidden;
    padding: 6px 0;
  }
}
</style>

