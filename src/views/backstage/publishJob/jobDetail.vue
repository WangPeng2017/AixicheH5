<template>
  <div>
    <Header title="行业招聘"></Header>
    <section class="section"
             :style="isNewPublish ? {bottom: '45px'} : {bottom: '0'}">
      <div class="part1">
        <span class="job">机修工程师</span>
        <span class="company">爱惜车一店</span>
        <p class="pay">薪资：4K-6K</p>
      </div>
      <div class="part2">
        <p>
          <span>工作经验：1-3年</span>
          <span>学历要求：不限</span>
        </p>
        <p>
          <span>性别：男</span>
          <span>年龄：20-35</span>
        </p>
        <p>
          <span>工作性质：全职</span>
        </p>
        <p>
          <!-- <img src="" alt=""> -->
          郑州市二七区南三环连云路都市广场
        </p>
      </div>
      <div class="part3">
        <p>联系人：刘先生</p>
        <p>联系电话：13603821123</p>
        <p>邮箱/微信：gh3468456@163.com</p>
      </div>
      <div class="part4">
        <div class="title"
             style="margin-top: 0;">职位要求</div>
        <p>1：负责维修车辆品牌包扩奥迪奔驰宝马保时捷等车辆的维修；
        </p>
        <p>2：有修理发动机的丰富经验，对车辆构造熟悉。</p>
        <p>3：有修理发动机的丰富经验，对车辆构造熟悉。</p>
        <p>4：有修理发动机的丰富经验，对车辆构造熟悉，负责维修。</p>
        <div class="title">福利待遇</div>
        <p>包吃住，每月工作28天，有两天休息时间，两天假期。</p>
        <div class="title">企业简介</div>
        <p> 爱惜车快速洗车精致洗车镀晶打蜡贴膜换轮胎蒸汽洗车爱惜车快速洗车爱惜车快速洗车精致洗车镀晶打蜡贴膜换轮胎蒸汽洗车爱惜车快速洗车爱惜车快速洗车精致洗车镀晶打蜡贴膜换轮胎蒸汽洗车爱惜车快速洗车 精致洗车镀晶打蜡贴膜换轮胎蒸汽洗车</p>
      </div>
    </section>
    <x-button @click.native="sure"
              v-if="isNewPublish"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">确定</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import { XButton } from 'vux'
export default {
  name: 'PublishJob',
  components: {
    Header,
    XButton
  },
  data () {
    return {
      isNewPublish: 1,
      results: [],
      value: '',
      placeholder: '输入商品名称',
      goods: require('Assets/img/logo.png')
    }
  },
  methods: {
    sure () {
      this.$router.push({ name: 'publishJob' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'publishJob') vm.isNewPublish = 0
    })
  }
}
</script>

<style lang="less" scoped>
.section {
  position: absolute;
  width: 100%;
  bottom: 45px;
  top: 45px;
  overflow: auto;

  .part1 {
    padding: 15px 20px;
    .job {
      font-size: 22px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-right: 5px;
    }
    .company {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .pay {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgb(255, 0, 54);
      margin-top: 12px;
    }
  }

  .part2,
  .part3 {
    background: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 10px;
      span:nth-of-type(1) {
        display: inline-block;
        width: 40%;
      }
    }
  }

  .part4 {
    background: #fff;
    padding: 10px 20px;

    .title {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin: 10px 0;
    }
    p {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 1.8;
    }
  }
}
</style>

