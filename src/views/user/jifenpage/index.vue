<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">详情</x-header>
    <div class="header">
      <p>剩余</p>
      <p class="numberr">{{currentPoints}}</p>
      <p class="addfont">
        <!--<img :src="add" alt>&nbsp;12月份增加总积分{{msg}}-->
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
                 :formatter="moretype(item.rebate_type)">{{data.typename}}<span :class="data.typemoney > 0 ? expend : income"
                      :formatter="moneytype(item.integral_type,item.integral_num)">{{data.typemoney}}&nbsp;&nbsp;</span></p>
              <P class="successup">{{item.record_remark}}<span class="datee">{{item.obtain_time | formatDate}}&nbsp;&nbsp;</span></P>
            </div>
          </div>
          <div id="record_noData"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import add from '../../../assets/image/add.png'
import MeScroll from 'mescroll.js'
import { Tab, TabItem, XHeader, TransferDom, Alert } from 'vux'
import { getuserjifenrecord } from '@api'
import { mapMutations, mapState } from 'vuex'
import { SET_LOADING } from '@store/type'
import qs from 'qs'
import { formatDate } from '../../../filters/date.js'
export default {
  // 转换时间格式
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
      currentPoints: 0,
      typename: '',
      typemoney: '',
      jftotal: '',
      msg: 0,
      datetimelist: [],
      meScroll: null,
      data: [],
      index: 0,
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
    // 积分类型
    moretype (typeno) {
      this.data.typename = ''
      switch (typeno) {
        case 0:
          this.data.typename = '未知'
          break
        case 1:
          this.data.typename = '邀请返利'
          break
        case 2:
          this.data.typename = '分享商品'
          break
        case 3:
          this.data.typename = '订单消费'
          break
        case 4:
          this.data.typename = '分享应用'
          break
        case 5:
          this.data.typename = '会员升级'
          break
        case 6:
          this.data.typename = '消费抵扣'
          break
      }
    },
    // 流水反馈
    moneytype (typesno, innum) {
      this.data.typemoney = ''
      if (typesno === 1) {
        this.data.typemoney = ' + ' + innum
      } else if (typesno === 2) {
        if (innum > 0) {
          this.data.typemoney = ' - ' + innum
        } else {
          this.data.typemoney = innum
        }
      } else {
        this.data.typemoney = '未知'
      }
    },
    // 切换日期Tab
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
              self.loadjifenrecord(page)
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
    // 加载积分数据列表
    async loadjifenrecord (page) {
      this.setLoading({
        status: true,
        opacity: 0
      })
      this.postData.page = page.num
      this.postData.rows = page.size
      // 获取积分列表
      let res = await getuserjifenrecord(qs.stringify(this.postData))
      this.setLoading(false)
      if (page.num === 1) {
        this.data = res.data
      }
      this.data = [
        ...this.data
      ]
      let hasNext = (this.data.length < res.data.length)
      this.meScroll.endSuccess(res.data.length, hasNext)
      // if (this.data.length > 0) {
      //   this.currentPoints = this.data[0].after_integral_sum
      // }
      this.currentPoints = this.user.user_integral
    },
    // 近半年6个月份
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
  bottom: 0;
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
        .datee {
          float: right;
          color: #666666;
          font-size: 12px;
        }
      }
    }
  }
  .bottom {
    color: #333333;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    margin-top: 10%;
  }
}
</style>


