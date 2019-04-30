<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">会员升级</x-header>
    <member-header :data="user"
                   @gotomember="gotomember"></member-header>
    <h3>开通会员</h3>
    <div class="container-fluid">
      <div class="row">
        <ul>
          <li v-for="(item, index) in data"
              :key="index"
              v-show="index!=0"
              :class="{'active':iind === index}"
              @click="changecli(index)">{{item.account_level_name}}</li>
        </ul>
      </div>
    </div>
    <my-input style=" margin: 0 4%;"
              type="text"
              v-model="form.yqm"
              placeholder="请输入邀请人手机号">
      <i class="account-icon icon"></i>
    </my-input>
    <p style=" margin: 0 4%;">邀请商家：{{sellername}}</p>
    <p class="ptext">邀请码填写说明：未填写邀请人手机号码，默认为原邀请人；填写新的邀请人号码将更换原邀请人关系。</p>
    <h3>会员说明</h3>
    <div class="text">
      <p v-for="(item, index) in data"
         :key="index"
         v-show="activeIndex==index&&index!=0"
         @click="changecli(index)">{{item.account_level_desc}}</p>
      <div class="bgmemberIn"
           id="imagess"
           v-if="outt"></div>
    </div>
    <button id="open"
            @click="openimmd()">立即开通会员</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myInput from './components/input'
import { SET_LOADING } from '@store/type'
import memberHeader from '@comps/header/memberHeader'
import { getlevellist, GetEntityByUseryqm, GetEntityBySelleryqm, addAccountLevelOrder, isUpgradeApplication, GetUserLevelAccount, GetUpAndDown, GetEntityByMobile } from '@api'
import Vue from 'vue'
import { Confirm } from 'wc-messagebox'
import qs from 'qs'
Vue.use(Confirm)
export default {
  components: {
    memberHeader,
    myInput
  },
  data () {
    return {
      data: [],
      form: {
        yqm: ''
      },
      leveldata: [], // 保存用户上下级关系用户的邀请码信息，作用于验证输入的邀请信息
      index: 0,
      activeIndex: '',
      outt: true,
      iind: '',
      sellername: ''
    }
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  methods: {
    ...mapMutations({
      setLoading: SET_LOADING
    }),
    gotomember () {
      this.$router.push('/mymember')
    },
    changecli (index) {
      this.activeIndex = index
      this.outt = false
      this.iind = index // 选中效果
      this.index = index
      if (index === 4) {
        document.getElementById('open').innerHTML = '立即申请'
      } else {
        document.getElementById('open').innerHTML = '立即开通'
      }
    },
    async openimmd () {
      if (this.form.yqm.length === 11) {
        let leu = await GetUpAndDown(this.user.user_mobile)
        if (leu && leu.code === 200) {
          let userin = await GetEntityByMobile(this.form.yqm)
          if (userin && userin.code === 200) {
            for (let i = 0; i < leu.data.length; i++) {
              if (userin.data.invitation_code === leu.data[i].Thislevel) {
                alert('您输入的手机号为当前用户手机号，无法作为您的邀请人！')
                return false
              } else if (userin.data.invitation_code === leu.data[i].Subordinate) {
                alert('您输入的手机号已被您邀请过，无法成为您的邀请人！')
                return false
              } else if (userin.data.invitation_code === leu.data[i].Lowerlevel) {
                alert('您的被邀请人已邀请过此用户，无法作为您的邀请人！')
                return false
              }
            }
          }
        }
      }

      if (this.form.yqm.length === 11 && !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.yqm)) {
        this.$toasted.show('请输入正确的邀请人手机号码！')
        return false
      }
      let orderList = []
      let orderObj = {
        order_id: '',
        user_id: '',
        level_id: this.index + 1,
        level_name: this.data[this.index].account_level_name,
        order_monep: this.data[this.index].upgrade_standard,
        pay_type: 0,
        create_time: '',
        pay_time: null,
        remarks: ''
      }
      orderList.push(orderObj)
      let postData = {
        orders: orderList
      }
      let res = await addAccountLevelOrder(qs.stringify(postData))
      if (res && res.code === 200) {
        let userdata = await GetUserLevelAccount(this.user.user_id)
        var no = res.data.order_no
        if (this.index === 1) {
          if (Number(userdata.data) > 2) {
            alert('您选择的升级等级低于账号的当前等级！')
          } else {
            if (Number(userdata.data) === 2) {
              alert('您选择的升级等级与账号当前等级相同！')
            } else {
              this.$router.push({
                path: '/mycashier',
                query: {
                  id: no,
                  no: no,
                  price: this.data[1].upgrade_standard,
                  type: 'goods',
                  body: no,
                  attach: this.form.yqm
                }
              })
            }
          }
        } else if (this.index === 2) {
          if (Number(userdata.data) > 3) {
            alert('您选择的升级等级低于账号的当前等级！')
          } else {
            if (Number(userdata.data) === 3) {
              alert('您选择的升级等级与账号当前等级相同！')
            } else {
              this.$router.push({
                path: '/mycashier',
                query: {
                  id: no,
                  no: no,
                  price: this.data[2].upgrade_standard,
                  type: 'goods',
                  body: no,
                  attach: this.form.yqm
                }
              })
            }
          }
        } else if (this.index === 3) {
          if (Number(userdata.data) > 4) {
            alert('您选择的升级等级低于账号的当前等级！')
          } else {
            if (Number(userdata.data) === 4) {
              alert('您选择的升级等级与账号当前等级相同！')
            } else {
              this.$router.push({
                path: '/mycashier',
                query: {
                  id: no,
                  no: no,
                  price: this.data[3].upgrade_standard,
                  type: 'goods',
                  body: no,
                  attach: this.form.yqm
                }
              })
            }
          }
        } else if (this.index === 4) {
          let isres = await isUpgradeApplication()
          if (isres && isres.code === 200) {
            switch (isres.data.status) {
              case 3:
                alert('您已提交过申请，并且审核结果未通过；请联系平台客服！')
                break
              case 2:
                alert('您已成功升级为平台最高等级，无需再次申请！')
                break
              case -1:
                alert('您的申请已失效！')
                break
              default:
                this.$router.push({
                  path: '/myhighmember',
                  query: {
                    id: no,
                    no: no,
                    price: this.data[4].upgrade_standard,
                    type: 'goods',
                    body: no,
                    attach: this.form.yqm
                  }
                })
                break
            }
          } else {
            this.$router.push({
              path: '/mycheckmem',
              query: {
                id: no,
                no: no,
                price: this.data[4].upgrade_standard,
                type: 'goods',
                body: no,
                attach: this.form.yqm
              }
            })
          }
        }
      }
    },
    async getDatalist () {
      this.setLoading({
        status: true,
        opacity: 0
      })
      var usery = this.user.inviter_invitation_code
      let res = await getlevellist()
      this.setLoading(false)
      if (res && res.code === 200) {
        this.data = res.data
      } else {
        alert('不好意思，没得数据')
      }
      if (usery.length === 6) {
        let useryqm = await GetEntityByUseryqm(usery)
        if (useryqm && useryqm.code === 200) {
          this.form.yqm = useryqm.data.user_mobile
        }
      }
      if (usery.length === 8) {
        let selleryqm = await GetEntityBySelleryqm(usery)
        if (selleryqm && selleryqm.code === 200) {
          this.form.yqm = selleryqm.data.seller_invitation_code
          this.sellername = selleryqm.data.seller_name
        }
      }
    }
  },
  created () {
    this.getDatalist()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/pub";
.view {
  width: 100%;
  background-color: #ece5d3;
  height: auto;
  h3 {
    margin: 20px;
    color: #a36a10;
  }
  .container-fluid {
    background-image: url("../../../assets/image/middlebackground@3x.png");
    background-size: cover;
    height: 347px;
    text-align: center;
    margin: 0 4%;
    .row {
      width: 100%;
      height: 280px;
      padding-top: 33px;
      text-align: center;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      ul {
        width: 100%;
        li {
          float: left;
          border-radius: 10px;
          background: #ece5d3;
          color: #a36a10;
          width: 36%;
          height: 115px;
          margin-left: 9%;
          margin-top: 6%;
          padding-top: 5%;
        }
      }
      .active {
        color: #ffffff;
        background: #d4a151;
      }
    }
  }
  .text {
    background-image: url("../../../assets/image/bgmiddlet.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 377px;
    margin: 0 4%;
    margin-bottom: 150px;
    p {
      font-weight: bold;
      color: #ac7a2a;
      word-wrap: break-word;
    }
    .bgmemberIn {
      position: relative;
      top: 9%;
      left: 14%;
    }
  }
}
button {
  background-color: #b08440;
  border: 0;
  width: 100%;
  height: 94px;
  position: fixed;
  bottom: 0;
  color: white;
  font-weight: bold;
}
.ptext {
  font-weight: bold;
  color: #999;
  word-wrap: break-word;
  margin: 0 4%;
  font-size: 0.3rem;
}
</style>

