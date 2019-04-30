<template>
  <aside class="aside">
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <transition name="fade">
          <div class="header">
            <div class="left" >
              <i class="left-black-icon" @click="hide"></i>
            </div>
            <div class="title">选择预约时间</div>
            <div class="right">
              <slot name="right"></slot>
            </div>
          </div>
        </transition>
        <div class="content">
          <div class="tab">
            <div class="tab-item" :class="{on: item.status}" v-for="item in dateData" @click="tabChange(item)">
              <p class="title" :class="{on: item.status}">{{item.weekName}}</p>
              <p class="subtitle" :class="{on: item.status}">{{item.dateName}}</p>
            </div>
          </div>
          <div class="grid">
            <div class="grid-item" :class="{on: item.status}" v-for="item in timeslotData" @click="timeslotChange(item)">
              <div class="img"><i :class="[item.status ? 'appointtimecheck-icon': 'appointtime-icon']"></i></div>
              <div class="time">{{item.start_timeName + '-' + item.end_timeName}}</div>
              <div class="count">{{ item.desc + '('+item.buy_service_num+ '/' + item.service_num+')'}}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" @click="ok">确定</a>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {SET_LOADING} from '@store/type'
  import { getGoodsTimeslotList } from '@api'

  export default {
    props: {
      goods: {
        type: Object
      }
    },
    data: function () {
      return {
        status: false,
        maxDays: 5,
        dateData: [],
        timeslotData: [],
        selectedTimeslot: null
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      show () {
        this.status = true
        this.loadDate()
      },
      hide () {
        this.status = false
      },
      ok () {
        this.status = false

        if (this.selectedTimeslot) {
          this.goods.goods_appointStartTime = this.selectedTimeslot.start_time
          this.goods.goods_appointEndTime = this.selectedTimeslot.end_time
          this.goods.goods_appointStartTimeName = this.selectedTimeslot.start_timeName
          this.goods.goods_appointEndTimeName = this.selectedTimeslot.end_timeName
          this.goods.goods_appointDate = this.selectedTimeslot.date
          this.goods.goods_appointDateName = this.selectedTimeslot.dateName
        } else {
          this.goods.goods_appointStartTime = null
          this.goods.goods_appointEndTime = null
          this.goods.goods_appointStartTimeName = ''
          this.goods.goods_appointEndTimeName = ''
          this.goods.goods_appointDate = null
          this.goods.goods_appointDateName = ''
        }
      },
      async loadTimeslot (date) {
        let dateFullName = this.getDateFullName(date)
        let res = await getGoodsTimeslotList(this.goods.goods_id, this.goods.appoint_template_id, dateFullName)
        if (res && res.code !== 200) return

        let now = Date.now()
        res.data.map(i => {
          let startDatetimeName = dateFullName + ' ' + i.start_timeName
          let startDatetime = new Date(startDatetimeName)
          i.expire = (now > startDatetime)  // 过期
          i.out = (i.buy_service_num >= i.service_num) // 售空
          i.disabled = (i.expire || i.out)
          i.desc = i.expire ? '过期' : (i.out ? '已售空' : '出售中')
          i.date = date
          i.dateName = dateFullName
          i.status = false
          if (this.selectedTimeslot && this.selectedTimeslot.dateName === dateFullName && this.selectedTimeslot.start_timeName === i.start_timeName && this.selectedTimeslot.end_timeName === i.end_timeName) {
            i.status = true
          }
        })
        this.timeslotData = res.data
      },
      loadDate () {
        let len = this.maxDays
        this.dateData = []
        let defaultDateStr = this.getDateName(Date.now())
        if (this.selectedTimeslot && this.selectedTimeslot.dateName) {
          defaultDateStr = this.getDateName(this.selectedTimeslot.date)
        }

        for (let i = 0; i < len; i++) {
          let date = new Date()
          date.setDate(date.getDate() + i)
          let week = date.getDay()
          let status = false
          let dateStr = this.getDateName(date)
          if (dateStr === defaultDateStr) {
            status = true
            this.loadTimeslot(date)
          }
          this.dateData.push({
            weekName: this.getWeekdayName(week),
            dateName: this.getDateName(date),
            date: date,
            status: status
          })
        }
      },
      tabChange (item) {
        if (item.status) {
          return
        }
        this.dateData.map(i => {
          i.status = false
        })
        item.status = true
        this.loadTimeslot(item.date)
      },
      timeslotChange (item) {
        if (item.disabled) {
          return
        }
        this.timeslotData.map(i => {
          if (i === item) {
            if (i.status) {
              i.status = false
              this.selectedTimeslot = null
            } else {
              let remainnum = i.service_num - i.buy_service_num
              if (remainnum < this.goods.goods_buynum) {
                this.$toasted.show('最多可以预约' + remainnum + '次！')
              } else {
                i.status = true
                this.selectedTimeslot = i
              }
            }
          } else {
            i.status = false
          }
        })
      },
      getDateName (date) {
        let d = new Date(date)
        let month = d.getMonth() + 1
        let day = d.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        let val = month + '-' + day
        return val
      },
      getDateFullName (date) {
        let d = new Date(date)
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let day = d.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        let val = year + '-' + month + '-' + day
        return val
      },
      getWeekdayName (weekday) {
        if (weekday === 0) {
          return '周日'
        } else if (weekday === 1) {
          return '周一'
        } else if (weekday === 2) {
          return '周二'
        } else if (weekday === 3) {
          return '周三'
        } else if (weekday === 4) {
          return '周四'
        } else if (weekday === 5) {
          return '周五'
        } else if (weekday === 6) {
          return '周六'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";
  .aside {
    z-index: 9;
    position: fixed;
    top: 0;
    right: 0;
    .header {
      width: 100%;
      height: $default_navbar_height;
      position: fixed;
      top: 0;
      left: 0;
      border-bottom: 1px solid $default_border_color;
      .title {
        font-size: $default_font_size;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .left {
        padding: 0 20px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
      }
      .right {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .wrapper {
      position: fixed;
      top: 0;
      right: 0;
      background-color: #fff;
      width: 100%;
      height: 100%;
      .content {
        margin-top: $default_navbar_height;
        margin-bottom: $default_toolbar_height;
        height: 100%;
        overflow-y: scroll;
        padding: 20px 20px 100px 20px;
        .tab {
          width: 100%;
          height: $default_toolbar_height;
          display: flex;
          .tab-item {
            flex: 1;
            height: 100%;
            border-bottom: 4px solid #fff;
            &.on {
              border-bottom: 4px solid $default_theme_color;
            }
            .title {
              font-size: $default_font_size;
              color: $default_title_color;
              text-align: center;
              vertical-align: middle;
              &.on {
                color: $default_theme_color;
              }
            }
            .subtitle {
              font-size: $default_smallfont_size;
              color: $default_subtitle_color;
              text-align: center;
              vertical-align: middle;
              &.on {
                color: $default_theme_color;
              }
            }
          }
        }
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
              .time, .count {
                color: $default_theme_color
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
              color: $default_subtitle_color;
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: $default_toolbar_height;
        line-height: $default_toolbar_height;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        a {
          flex: 1;
          text-align: center;
          box-sizing: border-box;
          &:first-child {
            border-top: 1px solid $default_red_color; /*no*/
            background-color: $default_red_color;
            color: #fff;
          }
        }
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(100%, 0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

