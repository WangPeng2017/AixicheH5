<template>
  <div class="panel">
    <transition name="fade">
      <div class="back"
           v-show="status"
           @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper"
           v-show="status">
        <x-header :left-options="{showBack: false}"
                  class="vux-1px-b">
          选择预约时间
          <i class="close-icon"
             slot="right"
             @click="status = false"></i>
        </x-header>
        <tab>
          <tab-item v-for="(item, index) in dateList"
                    :key="index"
                    :selected="item.status"
                    @on-item-click="tabChange">{{item.dateName + '('+ item.weekName + ')'}}</tab-item>
        </tab>
        <div class="content">
          <div class="grid">
            <div class="grid-item"
                 :class="{on: item.status, disabled: item.is_disabled}"
                 v-for="item in timelotList"
                 @click="timelotChange(item)">
              <div class="img">
                <i :class="[item.status ? 'appointtimecheck-icon': 'appointtime-icon']"></i>
              </div>
              <div class="time">{{item.start_timeName + '-' + item.end_timeName}}</div>
              <div class="count">{{ item.statusName + '(' +(item.service_num - item.appoint_num) + ')'}}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="javascript:void(0)"
             class="ok"
             @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import { formatDate, getWeekdayName, convertTimespanToDate } from '@js/util'

export default {
  components: {
    Tab,
    TabItem
  },
  data: function () {
    return {
      status: false,
      seller: {},
      dateList: [],
      timelotList: [],
      selectedTimeslot: {}
    }
  },
  methods: {
    show (seller) {
      this.status = true
      this.seller = seller
      let now = new Date()
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)
      this.selectedTimeslot.date = this.seller.appointment_time || now
      this.selectedTimeslot.dateName = this.seller.appointment_timename
      this.selectedTimeslot.start_time = this.seller.start_time
      this.selectedTimeslot.start_timeName = this.seller.start_timename
      this.selectedTimeslot.end_time = this.seller.end_time
      this.selectedTimeslot.end_timeName = this.seller.end_timename
      this.loadDate(seller.appointList)
    },
    hide () {
      this.status = false
    },
    ok () {
      this.status = false

      if (this.selectedTimeslot.date && this.selectedTimeslot.start_time && this.selectedTimeslot.end_time) {
        this.seller.appointment_time = this.selectedTimeslot.date
        this.seller.start_time = this.selectedTimeslot.start_time
        this.seller.end_time = this.selectedTimeslot.end_time
        this.seller.appointment_timename = this.selectedTimeslot.dateName
        this.seller.start_timename = this.selectedTimeslot.start_timeName
        this.seller.end_timename = this.selectedTimeslot.end_timeName
        this.seller.appointment_desc = this.selectedTimeslot.dateName + ' ' + this.selectedTimeslot.start_timeName + '-' + this.selectedTimeslot.end_timeName
      } else {
        this.seller.appointment_time = null
        this.seller.start_time = null
        this.seller.end_time = null
        this.seller.appointment_timename = ''
        this.seller.start_timename = ''
        this.seller.end_timename = ''
        this.seller.appointment_desc = ''
      }
    },
    loadDate (data) {
      data.map(d => {
        let date = convertTimespanToDate(d.make_apptime)
        let dateStatus = (formatDate(date, 'yyyyMMdd') === formatDate(this.selectedTimeslot.date, 'yyyyMMdd'))
        d.date = date
        d.weekName = getWeekdayName(date)
        d.dateName = formatDate(date, 'MM-dd')
        d.status = dateStatus
        d.timelots.map(t => {
          let status = (dateStatus && this.selectedTimeslot.start_timeName === t.start_timeName && this.selectedTimeslot.end_timeName === t.end_timeName)
          t.status = status
        })
        if (d.status) {
          this.timelotList = d.timelots
        }
      })
      this.dateList = data
    },
    tabChange (index) {
      if (this.dateList && this.dateList.length > 0) {
        let dateItem = this.dateList[index]
        if (dateItem.status) {
          return
        }
        this.dateList.map(i => {
          i.status = false
        })
        dateItem.status = true
        this.timelotList = dateItem.timelots
      }
    },
    timelotChange (item) {
      if (item.is_disabled) {
        return
      }

      this.dateList.map(d => {
        d.timelots.map(t => {
          if (t !== item) {
            t.status = false
          }
        })
      })
      let index = this.timelotList.indexOf(item)
      item.status = !item.status
      this.$set(this.timelotList, index, item)

      let dateItem = this.dateList.find(i => i.status)
      if (item.status) {
        this.selectedTimeslot.date = dateItem.date
        this.selectedTimeslot.dateName = formatDate(dateItem.date, 'yyyy-MM-dd')
        this.selectedTimeslot.start_time = item.start_time
        this.selectedTimeslot.start_timeName = item.start_timeName
        this.selectedTimeslot.end_time = item.end_time
        this.selectedTimeslot.end_timeName = item.end_timeName
      } else {
        this.selectedTimeslot.date = null
        this.selectedTimeslot.dateName = ''
        this.selectedTimeslot.start_time = null
        this.selectedTimeslot.start_timeName = ''
        this.selectedTimeslot.end_time = null
        this.selectedTimeslot.end_timeName = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/pub';

.panel {
  .back {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .wrapper {
    z-index: 3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .content {
      width: 100%;
      height: calc(
        100% - #{$default_navbar_height} - #{$default_toolbar_height} - #{$default_toolbar_height}
      );
      overflow: hidden;
      overflow-y: auto;
      background-color: #fff;
      .grid {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        .grid-item {
          width: calc(25% - 20px);
          margin: 10px;
          height: 176px;
          border: 1px solid $default_border_color;
          border-spacing: 0;
          border-collapse: collapse;
          &.on {
            background-color: #fff;
            border: 1px solid $default_theme_color;
            color: $default_theme_color;
            .time,
            .count {
              color: $default_theme_color;
            }
          }
          &.disabled {
            background-color: $default_border_color !important;
            .time,
            .count {
              color: #999 !important;
            }
          }
          .img {
            margin: auto 0;
            text-align: center;
            vertical-align: middle;
            margin-top: 10px;
          }
          .time {
            text-align: center;
            vertical-align: middle;
            font-size: $default_smallfont_size;
            color: $default_title_color;
          }
          .count {
            text-align: center;
            vertical-align: middle;
            font-size: $default_smallfont_size;
            color: $default_title_color;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
    a {
      height: $default_toolbar_height;
      line-height: $default_toolbar_height;
      margin: 0;
      width: 100%;
      color: #fff;
      text-align: center;
      vertical-align: middle;
      display: block;
      float: left;
    }
    .ok {
      background-color: $default_red_color;
    }
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: transform 0.5s;
}

.translate-enter,
.translate-leave-to {
  transform: translate(0, 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

