<template>
  <div>
    <Header title="招聘">
      <template slot="right">
        <span class="header-button">关闭</span>
      </template>
    </Header>
    <section class="section">
      <tab :line-width="2"
           default-color="#000000"
           active-color="#ff0000"
           bar-active-color="#ff0000"
           custom-bar-width="100px">
        <tab-item @on-item-click="getData(0)"
                  selected>待审核</tab-item>
        <tab-item @on-item-click="getData(1)">已审核</tab-item>
        <tab-item @on-item-click="getData(2)">已关闭</tab-item>
      </tab>
      <div class="section-box">
        <swipeout>
          <swipeout-item v-for="n in 10"
                         :key="n"
                         @on-close="handleEvents('on-close')"
                         @on-open="handleEvents('on-open')"
                         transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')"
                               :width="40"
                               style="background:#DCDCDC;">修改</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')"
                               :width="40"
                               style="background:#FF0036;">删除</swipeout-button>
            </div>
            <div slot="content"
                 class="job vux-1px-t"
                 @click="toDetail(1)">
              <p class="job-name">
                汽修工程师
                <span class="job-pay">薪资面议</span>
              </p>
              <p class="job-from">爱惜车汽车服务中心</p>
              <p class="job-label">
                <span>2-3年</span>
                <span>学历不限</span>
                <span>全职</span>
              </p>
              <p class="job-place">河南省郑州市二七区南三环连云路都市广场 拷贝</p>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </section>
    <x-button @click.native="submitJob"
              type="warn"
              style="background: #FF0036; border-radius: 0; color:#fff; position:fixed;bottom:0;">发布招聘</x-button>
  </div>
</template>

<script>
import Header from 'Common/Header'
import {
  Tab,
  TabItem,
  Search,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton
} from 'vux'
export default {
  name: 'PublishJob',
  components: {
    Header,
    Tab,
    TabItem,
    Search,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      results: [],
      value: '',
      placeholder: '输入商品名称',
      goods: require('Assets/img/logo.png')
    }
  },
  methods: {
    getData (index) {
      console.log(index)
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () { },
    onSubmit () { },
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    submitJob () {
      this.$router.push({ name: 'addJobCondition' })
    },
    toDetail (id) {
      this.$router.push({ name: 'jobDetail' })
    }
  }
}
</script>

<style lang="less" scoped>
.header-button {
  display: inline-block;
  font-size: 14px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: -12px;
  right: 0px;
}

.section {
  position: absolute;
  width: 100%;
  bottom: 45px;
  top: 45px;
  overflow: auto;

  .section-box {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 44px;
    overflow-y: auto;
  }

  .job {
    border-top: 10px solid #f6f6f6;
    padding: 10px 20px;

    .job-name {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 10px;
      .job-pay {
        font-size: 12px;
        margin-left: 5px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 0, 54, 1);
      }
    }

    .job-from {
      font-size: 12px;
      margin: 10px 0;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }

    .job-label {
      margin: 10px 0;
      span {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #fff;
        display: inline-block;
        padding: 3px 10px;
        margin-right: 5px;
        border-radius: 3px;
        background: rgba(233, 233, 233, 1);
      }
    }

    .job-place {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>

