<template>
  <div class="specPanel">
    <transition name="fade">
      <div class="back" v-show="status" @click="status = false"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="title">
          <div class="left">
           
          </div>
          <div class="center">
            <p class="price">
              <em>￥</em>{{msg}}
            </p>
            </div>
          <div class="right">
            <i class="close-icon" @click="status = false"></i>
          </div>
        </div>
        <div class="content">
          <!-- sku规格 -->
          <div class="item">
            <p class="spec-title">请选择要开通的类型：</p>
            <div class="spec-content">
              <span class="tag" :class="{on: item.status}" v-for="item in list" :key="item.name" @click="statusChange(item)">
               {{item.name}}
              </span>
            </div>
          </div>
          <div class="place-item"></div>
        </div>

        <div class="footer">
          <a href="javascript:void(0)" class="buy" id="buyy" @click="pay()">立即购买</a>
      
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import countInput from '@comps/countinput'
  import { mapState } from 'vuex'

  export default {
    components: {
      countInput
    },
    computed: {
      ...mapState(['token'])
    },
    data: function () {
      return {
        status: false,
        msg: 0,
        list: [
        {id: 1, name: 'vip', grade: 588, status: false},
        {id: 2, name: '初级合伙人', grade: 6800, status: false},
        {id: 3, name: '中级合伙人', grade: 68000, status: false},
        {id: 4, name: '高级合伙人', grade: 208000, status: false}
        ]
      }
    },
    methods: {
      show () {
        this.status = true
      },
      hide () {
        this.status = false
      },
      appointShow () {
        this.$emit('appointShow')
      },
      statusChange (item) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].id === item.id) {
            item.status = !item.status
            this.msg = item.grade
          } else {
            this.list[i].status = false
          }
        }
        this.$emit('updatePriceAndStock')
        if (item.id === 4) {
          document.getElementById('buyy').innerHTML = '立即申请'
          this.$router.push('/myhighmember')
        }
      },
      buy () {
        this.$emit('buy')
      },
      exchange () {
        this.$emit('exchange')
      },
      pay () {
        var no = 'payid'
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status === true) {
            this.$router.push({
              path: '/mycashier',
              query: {
                id: no,
                no: no,
                price: this.list[i].grade,
                type: 'package',
                body: no,
                attach: true
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/pub";
    .specPanel {
    .back {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .wrapper {
      padding: 0 20px;
      z-index: 3;
      width: 100%;
      height: auto;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      overflow: visible;
      .title {
        width: 100%;
        margin: 20px 0 0;
        text-align: center;
        font-size: $default_middlefont_size;
        color: $default_title_color;
        display: flex;
        padding-bottom: 30px;
        border-bottom: 1px solid $default_border_color;
        .left {
          width: 200px;
          height: 200px;
          padding: 10px;
          border: 2px solid $default_border_color;
          background-color: #fff;
          border-radius: 10px;
          margin-top: -40px;
        }
        .center {
          flex: 0 1 calc(100% - 240px);
          height: 160px;
          padding-left: 20px;
          p {
            text-align: left;
            color: $default_subtitle_color;
            font-size: $default_smallfont_size;
            line-height: 44px;
          }
          .price {
            font-size: $default_font_size;
            color: $default_red_color;
            vertical-align: middle;
            em {
              font-size: $default_smallfont_size;
              font-style: normal;
            }
          }
          .exp {
            @include textHideByLine(2);
          }
          .stock {
            vertical-align: middle;
          }
        }
        .right {
          width: 40px;
        }
        .close-icon {
          float: right;
          width: 24px;
          height: 24px;
          margin-top: 12px;
        }
      }
      .content {
        width: 100%;
        height: calc(100% - 320px);
        overflow: hidden;
        overflow-y: auto;
        .item {
          position: relative;
          overflow: hidden;
          padding: 20px 0;
          &:last-child {
            border-bottom: none;
          }
          &:not(:first-child) {
            border-top: 2px solid $default_border_color;
          }
          &.item-other {
            i {
              float: right;
              margin-top: 10px;
            }
          }
          &.item-store {
            border-top: 0;
            padding-top: 0;
            .spec-title {
              font-size: $default_smallfont_size;
            }
            .store {
              overflow: hidden;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              white-space: nowrap;
              font-size: $default_smallfont_size;
              height: 44px;
              line-height: 44px;
              i {
                margin-right: 20px;
              }
            }
          }
          &.item-count {
            height: $default_cell_height;
            line-height: $default_cell_height;
            display: flex;
            align-items: center;
            margin-bottom: 0;
            .left {
              width: 100px;

            }
            .right {
              width: calc(100% - 100px);
              text-align: right;
            }
          }
          &.item-appoint {
            height: $default_cell_height;
            line-height: $default_cell_height;
            display: flex;
            align-items: center;
            margin-bottom: 0;
            .left {
              width: 120px;
            }
            .center {
              flex: 0 1 calc(100% - 120px);
              text-align: right;
            }
            .right {
              width: 40px;
              text-align: right;
            }
          }
          .tag {
            font-size: $default_smallfont_size;
            padding: 5px 10px;
            background-color: #f0f2f5;
            border: 2px solid #f0f2f5;
            margin-bottom: 10px;
            margin-top: 10px;
            margin-right: 17px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            vertical-align: middle;
            border-radius: 0px;
            -webkit-border-radius: 0px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            &.on {
              background-color: #fff;
              border: 2px solid $default_red_color;
              color: $default_red_color;
            }
          }

        }
        .place-item {
          height: $default_toolbar_height;
        }
      }
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        display: flex;
        a {
          height: $default_toolbar_height;
          line-height: $default_toolbar_height;
          margin: 0;
          width: 100%;
          color: #fff;
          text-align: center;
        }
        .shoppingcart {
          background-color: $default_orange_color;
        }
        .buy {
          background-color: #B08440;
        }
        .exchange {
          background-color: $default_red_color;
          width: 100%;
        }
        .off {
          background-color: $default_disabled_background_color;
          width: 100%;
        }
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: transform .5s
  }

  .translate-enter, .translate-leave-to {
    transform: translate(0, 100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

