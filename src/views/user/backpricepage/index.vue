<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">详情</x-header>
    <div class="header">
      <p>余额</p>
      <p class="numberr">{{backtotal.toFixed(2)}}</p>
      <p class="addfont">
        <!-- <img :src="add" alt>&nbsp;12月份增加总额{{msg}}元-->
      </p>
    </div>

    <div class="div">
      <tab :scroll-threshold="6">
        <tab-item v-for="(item, index) in datetimelist"
                  :key="index"
                  :selected="item.status===postData.status"
                  @on-item-click="tabChanged">{{item.text}}</tab-item>
      </tab>
      <div class="content">
        <div class="mescroll"
             id="automescroll">
          <div class="scroll">
            <div class="panel"
                 v-for="item in data"
                 :key="item.record_id">
              <p class="topup"
                 :formatter="moretype(item.record_rebate_type)">{{data.typename}}<span :class="data.backtypemoney < 0 ? income : income"
                      :formatter="backmoneytype(item.record_integral_sum.toFixed(2))">{{data.backtypemoney}}&nbsp;</span></p>
              <P class="successup">{{item.record_remark}}</P>
              <P class="successup"
                 v-if="!item.seller_name">{{item.true_name}}/{{item.user_mobile}}<label v-if="item.record_rebate_type===3">+</label><span class="datee">{{item.record_return_time | formatDate}}&nbsp;&nbsp;</span></P>
              <P class="successup"
                 v-if="item.seller_name">{{item.seller_name}}/{{item.seller_address}}<label v-if="item.record_rebate_type===5">+</label><span class="datee">{{item.record_return_time | formatDate}}&nbsp;&nbsp;</span></P>
            </div>
          </div>
          <div id="record_noData"></div>
        </div>
        <div v-transfer-dom>
        </div>
        <div class="btn">
          <button @click="$router.push('myimmediately')">立即提现</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import add from '../../../assets/image/add.png'
import MeScroll from 'mescroll.js'
import { Tab, TabItem, XHeader, TransferDom, Alert } from 'vux'
import { getbackpricerecord } from '@api'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import { formatDate } from '../../../filters/date.js'
export default {
  filters: {
    formatDate (time) {
      var dtime = time.slice(6, 19)
      var date = new Date(parseInt(dtime))
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    Tab,
    TabItem,
    XHeader,
    Alert,
    TransferDom
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      add,
      backtotal: 0,
      msg: 0,
      datetimelist: [],
      meScroll: null,
      data: [],
      postData: {
        status: null,
        page: 1,
        rows: 10,
        sord: 'desc',
        sidx: 'create_time',
        dateti: null
      },
      isCreate: true,
      income: 'income',
      expend: 'expend'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    // 返利类型
    moretype (typeno) {
      this.data.typename = ''
      switch (typeno) {
        case 1:
          this.data.typename = '消费'
          break
        case 2:
          this.data.typename = '会员升级'
          break
        case 3:
          this.data.typename = '会员升级+'
          break
        case 4:
          this.data.typename = '商家流水'
          break
        case 5:
          this.data.typename = '商家流水+'
          break
        default:
          this.data.typename = '系统调整'
          break
      }
    },
    backmoneytype (innum) {
      if (innum > 0) {
        this.data.backtypemoney = ' + ' + innum
      } else {
        this.data.backtypemoney = innum
      }
    },
    // 切换日期
    tabChanged (index) {
      if (this.datetimelist && this.datetimelist.length > 0) {
        let item = this.datetimelist[index]
        this.postData.status = item.status
        this.postData.dateti = item.text
        if (item.status === 200) {
          this.postData.dateti = null
        }
        this.initMeScroll()
      }
    },
    // 初始化选项卡状态
    initTab (val) {
      if (this.datetimelist && this.datetimelist.length > 0) {
        // 通过值查询索引
        let index = this.datetimelist.findIndex(i => i.status === val)
        if (index === -1) {
          index = 0
        }
        this.tabChanged(index)
      }
    },
    // 初始化滚动区
    initMeScroll () {
      let self = this
      this.$nextTick(() => {
        if (this.meScroll) {
          this.meScroll.resetUpScroll()
          return
        }
        this.meScroll = new MeScroll('automescroll', {
          up: {
            callback (page) {
              self.loadbackprice(page)
            },
            noMoreSize: 1,
            htmlNodata: '<p class="upwarp-nodata">我是有底线的</p>',
            empty: {
              warpId: `record_noData`,
              tip: '没有更多的数据'
            }
          }
        })
      })
    },
    // 加载返利数据列表
    async loadbackprice (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      let res = await getbackpricerecord(qs.stringify(this.postData))
      this.setLoading(false)
      if (page.num === 1) {
        this.data = res.data
      }
      this.data = [
        ...this.data
      ]
      let hasNext = (this.data.length < res.data.length)
      this.meScroll.endSuccess(res.data.length, hasNext)
      this.backtotal = this.user.user_money
      // for (let i = 0; i < this.data.length; i++) {
      //   this.backtotal = this.backtotal + this.data[i].record_integral_sum
      // }
    },
    getDateTime () {
      var date = new Date()
      var dateY = date.getFullYear()
      var dateM = date.getMonth() + 1
      if (dateM < 10) {
        this.datetimelist[0] = { text: dateY + '-0' + dateM, status: -1 }
      } else {
        this.datetimelist[0] = { text: dateY + '-' + dateM, status: -1 }
      }
      for (let i = 1; i < 6; i++) {
        dateM = dateM - 1
        if (dateM <= 0) {
          dateY = dateY - 1
          dateM = dateM + 12
        }
        if (dateM < 10) {
          dateM = '0' + dateM
        }
        this.datetimelist[i] = { text: dateY + '-' + dateM, status: i }
      }
      this.datetimelist[6] = { text: '查看全部', status: 200 }
    }
  },
  created () {
    // 获取近半年月份
    this.getDateTime()
  },
  activated () {
    // 默认为最近状态
    this.initTab(this.$route.query.tab || -1)
    if (this.isCreate) {
      this.isCreate = false
    } else {
      if (this.meScroll) {
        this.meScroll.resetUpScroll()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/pub";
.mescroll {
  position: fixed;
  top: 590px;
  bottom: 100px;
  height: auto;
}
.view {
  text-align: center;
  height: auto;
  .header {
    text-align: center;
    width: 100%;
    background-image: url("../../../assets/image/backprice.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 400px;
    padding: 5%;
    color: white;
    p {
      padding-top: 0;
    }
    .numberr {
      font-size: 60pt;
    }
    .addfont {
      font-size: 9pt;
      img {
        margin-bottom: -4px;
      }
    }
  }
  .div {
    margin-top: 10px;
    background-color: #f7f7f7;
    .panel {
      width: 100%;
      background-color: #fff;
      border-top: 2px solid #e2e2e2;
      padding-top: 10px;
      height: 130px;
      .topup {
        font-weight: bold;
        padding-left: 2%;
        text-align: left;
        color: #000000;
        font-size: 33px;
        .expend {
          color: #0080ff;
          float: right;
        }
        .income {
          color: #fa2c36;
          float: right;
        }
      }
      .successup {
        padding-top: 8px;
        padding-left: 2%;
        text-align: left;
        color: #666666;
        font-size: 12px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap; // 超出不换行
        text-overflow: ellipsis;
        // .successupup{
        //   width: 0.5%;
        //   overflow: hidden;
        //   white-space: nowrap;// 超出不换行
        //   text-overflow: ellipsis;
        // }
        .datee {
          float: right;
          color: #666666;
          font-size: 12px;
        }
      }
    }
  }
  .btn {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 5px;
    text-align: center;
    background: rgba(247, 247, 247, 1);
    box-shadow: 0px 5px 7px 0px rgba(153, 153, 153, 0.15);
    button {
      width: 65%;
      height: 62px;
      background-color: #ff0036;
      color: #fff;
      border-radius: 10px;
      border: none;
      margin-top: 2%;
    }
  }
}
</style>

