<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <div class="content" style="font-size: 13px;">
        <table class="one" v-for="item in content">
          <tr>
            <td>{{item.bank_name}} ({{item.account_number}})<p style="font-size: 12px;">{{item.account_name}}</p></td>
            <td><div class="CardUser" id="CardUser" v-on:click="choosecard($event, item)"></div></td>
          </tr>
        </table>
      </div>
      <div class="btns">
        <div class="adduser" @click="$router.push('/myaddCard')">
          <p>添加银行卡<i class="add-icon"></i></p>
        </div>
      </div>
      <div class="close-btn" @click="closeMask">
        <i class="iconfont close-icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    content: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showMask: false
    }
  },
  methods: {
    closeMask () {
      this.showMask = false
    },
    choosecard: function (e, val) {
      if (e.target.className.indexOf('detail-selected') === -1) {
        e.target.className = 'CardUser detail-selected'// 切换按钮样式
        this.$emit('child-say', [val.account_type, val.account_name, val.account_number, val.bank_name])
      } else {
        e.target.className = 'CardUser' // 切换按钮样式
      }
    }
  },
  mounted () {
    this.showMask = this.value
  },
  watch: {
    value (newVal, oldVal) {
      this.showMask = newVal
    },
    showMask (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less" scoped>
.dialog {
  // font-size: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 537px;
    height: 653px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    position: relative;
    .dialog-title {
      width: 100%;
      height: 60px;
      font-size: 30px;
      color:rgba(0,0,0,1);
      font-weight: 400;
      font-family:MicrosoftYaHei;
      padding-bottom: 3%;
      box-sizing: border-box;
      border-bottom: 1px solid #C5C5C5;
    }
    .content {
      color: #797979;
      line-height: 26px;
      padding: 0 20px;
      box-sizing: border-box;
      .one{
        width: 100%;
        text-align: left;
        tr{
          line-height: 60px;
          border-bottom: 1px solid #C5C5C5;
          td{
            padding-right:20px;
            // font-size: 20px;
            color: #000;
            font-family:MicrosoftYaHei;
          }
        }
      }
      .CardUser{
        width: 34px;
        height: 34px;
        background: url(../../../../assets/image/gray-icon@2x.png) no-repeat;
        background-size: 100%;
        float: right;
        margin:3%;
      }
      .detail-selected{
        background: url(../../../../assets/image/redgou@2x.png) no-repeat;
        background-size: 100%;
      }
    }
    .btns {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: right;
      padding: 0 16px;
      box-sizing: border-box;
      .adduser{
        width:406px;
        height:59px;
        border:1px dashed rgba(197,197,197,1);
        text-align: center;
        margin: -5% auto;
        p{
          color: #C5C5C5;
          font-size:30px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          padding-right: 10px;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
}
</style>