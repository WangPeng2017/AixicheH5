<template>
  <div class="view">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">店铺信息</x-header>
    <div class="content">
      <group>
        <cell class="row">
          <img slot="icon"
               width="50"
               :src="data.seller_logo"
               v-img-field />
          <p slot="title">
            <span>{{data.seller_name}}</span>
          </p>
          <p slot="inline-desc">
            <span class="tag auth"
                  v-if="data.seller_authentication && data.seller_authentication===1">认证店铺</span>
            <span class="tag open"
                  v-if="data.seller_state===0">{{ data | sellerStateName}}</span>
            <span class="tag close"
                  v-if="data.seller_state!==0">{{ data | sellerStateName}}</span>
          </p>
        </cell>
      </group>

      <group>
        <cell class="row"
              title="店铺年限"
              :value="data.seller_years <= 1 ? '1年内' : data.seller_years + '年老店'"></cell>
        <cell class="row"
              title="关注人数"
              :value="data.seller_fans + '人'"></cell>
        <cell class="row"
              title="好评率"
              :value="data.seller_evaluate + '%'"></cell>
        <cell class="row"
              title="所在地区"
              :value="data.seller_region"></cell>
      </group>

      <group>
        <cell class="row"
              title="商铺电话">
          <i class="phone-icon"
             slot="icon"></i>
          <a :href="`tel:${data.shop_phone}`"
             slot="value">{{data.shop_phone}}</a>
        </cell>
        <cell class="row"
              title="24小时电话">
          <i class="phone2-icon"
             slot="icon"></i>
          <a :href="`tel:${data.hours_phone}`"
             slot="value"
             class="link">{{data.hours_phone}}</a>
        </cell>
        <cell class="row"
              title="详细地址"
              :value="data.seller_address"
              primary="content">
          <i class="address-color-icon"
             slot="icon"></i>
        </cell>
      </group>

      <group>
        <cell class="row"
              title="优惠券"
              is-link
              @click.native="$router.push({path: '/couponList', query: {a: 'seller', seller_id: $route.params.id, title: '店铺优惠券'}})">
          <i class="coupon-icon"
             slot="icon"></i>
        </cell>
        <cell class="row"
              title="详细介绍"
              is-link
              @click.native="$router.push(`/sellerDetailIntroduce/${$route.params.id}`)">
          <i class="shop-info-icon"
             slot="icon"></i>
        </cell>
        <cell class="row"
              title="店铺成员"
              is-link
              @click.native="$router.push(`/sellerDetailStaff/${$route.params.id}`)">
          <i class="peopleDetail-icon"
             slot="icon"></i>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import { XHeader, Cell, Group } from 'vux'

export default {
  data () {
    return {
      data: {}
    }
  },
  components: {
    XHeader,
    Cell,
    Group
  },
  filters: {
    sellerStateName (item) {
      let text = ''
      if (item.seller_state === 0) {
        text = '正常营业'
      } else if (item.seller_state === 1) {
        text = '闭店休息'
      } else if (item.seller_state === 2) {
        text = '休假中'
      }
      return text
    }
  },
  created () {
    let jsonStr = sessionStorage.getItem('sellerData')
    this.data = JSON.parse(jsonStr)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";
.row {
  img {
    display: block;
    margin-right: 20px;
    border-radius: 50%;
  }
  i {
    margin-right: 20px;
  }

  .tag {
    margin-right: 10px;
    padding: 2px 10px;
    font-size: $default_smallfont_size;
    border-radius: 10px;
  }
  .auth {
    color: $default_orange_color;
    border: 1px solid $default_orange_color; /*no*/
  }

  .open {
    color: $default_blue_color;
    border: 1px solid $default_blue_color; /*no*/
  }
  .close {
    color: $default_subtitle_color;
    border: 1px solid $default_subtitle_color; /*no*/
  }
}
</style>
