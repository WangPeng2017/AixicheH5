<template>
  <div class="view">
    <x-header :left-options="{showBack: false}" class="vux-1px-b header">
      购物车
      <span
        v-if="token && data.length > 0"
        @click="editStatus = !editStatus"
        slot="right">{{ editStatus ? '完成' : '编辑' }}</span>
      <i class="msgs-icon" slot="right" @click="$router.push('/message')"></i>
    </x-header>
    <div class="content">
      <div class="withoutLogin" v-if="!token">
        <div class="login">
          <router-link to="/login">登录</router-link>
          <span>登录后可查看购物车中的商品</span>
        </div>
        <div class="icon">
          <i class="shopcarWithoutData-icon"></i>
          <p>购物车是空的</p>
        </div>
      </div>
      <withoutdata label="购物车是空的" v-if="token && data.length === 0"></withoutdata>
      <shopping-cart-card v-if="token && data.length > 0" :data="item" v-for="item in data" :key="item.seller_id"
      @goodsGroupChange="goodsGroupChange"
      @goodsChange="goodsChange"
      @goodsNumChange="goodsNumChange"></shopping-cart-card>
    </div>
    <my-footer
      v-if="token && data.length > 0"
      :data="data"
      :editStatus="editStatus"
      :money="money"
      :checkAllStatus="checkAllStatus"
      @delGoods="delGoods"
      @checkall="checkall"
      @firmOrder="firmOrder"
      ref="footer"/>

    <!-- 底部 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import withoutdata from '@comps/withoutdata'
  import footerNav from '@comps/footerNav'
  import shoppingCartCard from '@comps/card/shoppingCartCard'
  import myFooter from './components/footer'
  import { getShoppingCartList, deleteShoppingCartGoods, updateShoppingCartGoodsNum } from '@api'
  import { SET_LOADING } from '@store/type'
  import { mapMutations, mapState } from 'vuex'
  import qs from 'qs'

  export default {
    name: 'shopcartView',
    components: {
      XHeader,
      shoppingCartCard,
      footerNav,
      myFooter,
      withoutdata
    },
    data () {
      return {
        data: [],
        editStatus: false,
        checkAllStatus: false,
        checkedMap: new Map()
      }
    },
    computed: {
      ...mapState(['token']),
      // 计算总金额
      money () {
        var money = 0
        this.data.map(item => {
          item.goods.map(item => {
            if (item.status) {
              money += item.goods_num * item.goods_saleprice
            }
          })
        })
        return money
      }
    },
    methods: {
      ...mapMutations({
        setLoading: SET_LOADING
      }),
      // 全部商品选择
      async checkall (status) {
        this.checkAllStatus = status
        this.data.map(item => {
          item.status = status
          item.goods.map(item => {
            item.status = status
          })
        })
      },
      // 单个商品选择
      async goodsChange (goodsGroup) {
        this.checkAllStatus = this.data.every(item => {
          return item.status
        })
        this.$refs.footer.setChecked(this.checkAllStatus)
      },
      // 店铺全部商品选择
      async goodsGroupChange (goodsGroup) {
        this.checkAllStatus = this.data.every(item => {
          return item.status
        })
        this.$refs.footer.setChecked(this.checkAllStatus)
      },
      // 商品库存改变
      async goodsNumChange (goods) {
        if (!this.token) {
          this.$toasted.show('请先进行登录！')
          return
        }

        this.setLoading({
          status: true,
          opacity: 0
        })
        let form = new FormData()
        form.append('shopping_id', goods.shopping_id)
        form.append('goods_num', goods.goods_num)
        let res = await updateShoppingCartGoodsNum(form)
        this.setLoading(false)
        if (res && res.code === 200) {
          goods.goods_num = res.data
        }
      },
      // 加载购物车商品
      async loadShoppingCart () {
        if (!this.token) {
          return
        }

        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await getShoppingCartList()
        this.setLoading(false)
        if (res && res.code === 200) {
          res.data.map(item => {
            item.status = false
            item.withoutShopcar = false
            item.goods.map(item => {
              item.status = this.checkedMap.get(item.shopping_id) || false
            })
            let flag = item.goods.every(goods => {
              return goods.status
            })
            item.status = flag
            this.checkedMap.clear()
          })
          this.data = res.data
        }
      },
      // 删除购物车商品
      async delGoods () {
        if (!this.token) {
          this.$toasted.show('请先进行登录！')
          return
        }

        let shoppingIdList = []
        let flag = true     // 默认未选择
        this.data.map(item => {
          item.goods.map(item => {
            if (item.status) {
              flag = false
              shoppingIdList.push(item.shopping_id)
            }
          })
        })
        if (flag) {
          this.$toasted.show('请选择要移除的购物车商品！')
          return
        }
        this.setLoading({
          status: true,
          opacity: 0
        })
        let res = await deleteShoppingCartGoods(qs.stringify({
          shoppingIdList: shoppingIdList
        }))
        this.setLoading(false)
        if (res && res.code === 200) {
          this.editStatus = false
          this.loadShoppingCart()
        }
      },
      async firmOrder () {
        let shoppingList = []
        this.data.map(group => {
          let goods = []
          group.goods.map(item => {
            if (item.status) {
              goods.push(item)
              this.checkedMap.set(item.shopping_id, true)
            }
          })
          if (goods.length > 0) {
            group.goods = goods
            shoppingList.push(group)
          }
        })
        if (shoppingList.length <= 0) {
          this.$toasted.show('请选择需要购买的商品！')
          return
        }
        sessionStorage.setItem('orderlist', JSON.stringify(shoppingList))
        this.$router.push('/firmOrder')
      }
    },
    created () {

    },
    activated () {
      this.loadShoppingCart()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";

  .content {
    height: calc(100% - #{$default_navbar_height} - #{$default_tabbar_height} - #{$default_toolbar_height});
  }

  .header {
    span {
      margin-right: 20px;
    }
  }

  .withoutLogin {
    .login {
      background-color: #fff;
      height: $default_toolbar_height;
      display: flex;
      align-items: center;
      padding: 0 20px;
      a {
        width: 150px;
        height: 50px;
        font-size: $default_font_size;
        border: 1px solid $default_border_color;/*no*/
        border-radius: 10px;
        text-align: center;
        line-height: 50px;
        margin-right: 20px;
      }
      span {
        font-size: $default_font_size;
      }
    }
    .icon {
      margin-top: 108px;
      text-align: center;
      p {
        margin-top: 33px;
      }
    }
  }
</style>
