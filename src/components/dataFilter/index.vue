<template>
  <aside class="aside">
    <transition name="fade">
      <div class="back"
           @click.self="status = false"
           v-show="status"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper"
           v-show="status">
        <div class="content">
          <div class="filter-cell"
               v-if="data.categoryModel"
               @click="$emit('showCategoryPicker')">
            <span class="title">分类</span>
            <span class="exp">{{data.categoryModel.category_name || ''}}</span>
            <i class="right-icon"></i>
          </div>
          <div class="filter-money">
            <p class="choose-name">价格区间</p>
            <div class="choose-item">
              <input type="number"
                     :value="data.minprice"
                     @change="changeMinPrice"
                     placeholder="最低价">
              <span class="symbol"></span>
              <input type="number"
                     :value="data.maxprice"
                     @change="changeMaxPrice"
                     placeholder="最高价">
            </div>
            <div class="choose-item">
              <span class="item"
                    :class="{'on' : price.status}"
                    v-for="price in data.pricelist"
                    @click="changePrice(price)">
                <i :class="{'rbMark-icon': price.status}"></i>
                {{price.name}}
              </span>
            </div>
          </div>
          <div class="filter-grid margin-top"
               v-for="brand in data.brandlist">
            <div class="choose-name">{{ brand.name}}
              <i class="collapse"
                 v-if="brand.values.length > 3"
                 :class="[brand.collapse ? 'open-icon' : 'collapse-icon']"
                 @click="collapse(brand)"></i>
              <span class="exp">{{brand.valueexp}}</span>
            </div>
            <div class="choose-item"
                 :class="{'collapse': brand.collapse}">
              <span class="item"
                    :class="{'on': value.status}"
                    v-for="value in brand.values"
                    @click="changeBrand(value, brand)">
                <i :class="{'rbMark-icon': value.status}"></i>
                {{ value.name }}
              </span>
            </div>
          </div>
          <div class="filter-grid margin-top"
               v-for="attr in data.attrlist">
            <div class="choose-name">{{ attr.name}}
              <i class="collapse"
                 v-if="attr.values.length > 3"
                 :class="[attr.collapse ? 'open-icon' : 'collapse-icon']"
                 @click="collapse(attr)"></i>
              <span class="exp">{{attr.valueexp}}</span>
            </div>
            <div class="choose-item"
                 :class="{'collapse': attr.collapse}">
              <span class="item"
                    :class="{'on': value.status}"
                    v-for="value in attr.values"
                    @click="changeValue(value, attr)">
                <i :class="{'rbMark-icon': value.status}"></i>
                {{ value.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="footer">
          <a href="javascript:void(0)"
             @click="filter">完成</a>
          <a href="javascript:void(0)"
             @click="reset">重置</a>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
export default {
  props: {
    data: {}
  },
  data () {
    return {
      status: false
    }
  },
  methods: {
    show () {
      this.status = true
    },
    hide () {
      this.status = false
    },
    collapse (item) {
      item.collapse = !item.collapse
    },
    changeMinPrice (ev) {
      this.data.minprice = ev.target.value
    },
    changeMaxPrice (ev) {
      this.data.maxprice = ev.target.value
    },
    changePrice (item) {
      this.data.pricelist.map(i => {
        if (i === item) {
          i.status = !i.status
          if (i.status) {
            this.data.minprice = ''
            this.data.maxprice = ''
          }
        } else {
          i.status = false
        }
      })
    },
    changeBrand (item, brand) {
      let selectedCount = 0
      brand.values.map(i => {
        if (i.status) {
          selectedCount += 1
        }
      })
      if (item.status) {
        item.status = false
        brand.valuemap.delete(item.id)
      } else {
        if (selectedCount < brand.maxselect) {
          item.status = true
          brand.valuemap.set(item.id, item.name)
        } else {
          this.$toasted.show('最多选择' + brand.maxselect + '个品牌！')
        }
      }
      this.updateExp(brand)
    },
    changeValue (item, attr) {
      let selectedCount = 0
      attr.values.map(i => {
        if (i.status) {
          selectedCount += 1
        }
      })
      if (item.status) {
        item.status = false
        attr.valuemap.delete(item.id)
      } else {
        if (selectedCount < attr.maxselect) {
          item.status = true
          attr.valuemap.set(item.id, item.name)
        } else {
          this.$toasted.show('每类最多选择' + attr.maxselect + '个选项！')
        }
      }
      this.updateExp(attr)
    },
    updateExp (item) {
      if (item.valuemap.size > 0) {
        let i = 0
        for (let value of item.valuemap.values()) {
          if (i === 0) {
            item.valueexp = value
          } else {
            item.valueexp = item.valueexp + '，' + value
          }
          i++
        }
      } else {
        item.valueexp = '不限'
      }
    },
    reset () {
      console.log(this.data.categoryModel)
      if (this.data.categoryModel) {
        this.data.categoryModel.category_id = this.data.categoryModel.origin_category_id
        this.data.categoryModel.category_name = this.data.categoryModel.origin_category_name
      }
      this.data.minprice = ''
      this.data.maxprice = ''
      this.data.attrlist.map(attr => {
        attr.values.map(value => {
          value.status = false
        })
      })
      this.data.brandlist.map(attr => {
        attr.values.map(value => {
          value.status = false
        })
      })
      this.data.pricelist.map(item => {
        item.status = false
      })
    },
    filter () {
      this.$emit('filter')
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.aside {
  z-index: 9;
  position: fixed;
  top: 0;
  right: 0;
}

.back {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  width: 90%;
  height: 100%;
  .content {
    height: 100%;
    overflow-y: scroll;
    padding: 0px 20px $default_toolbar_height;
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
  box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
  a {
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    &:first-child {
      background-color: $default_red_color;
      color: #fff;
    }
    &:last-child {
      color: $default_font_color;
      background-color: #fff;
    }
  }
}

.filter-money {
  padding: 20px 0;
  border-bottom: 1px solid $default_border_color;
  .choose-name {
    font-size: $default_font_size;
    color: $default_font_color;
    .collapse {
      margin-top: 16px;
      float: right;
    }
  }
  .choose-item {
    margin-top: 20px;
    max-height: none;
    overflow: hidden;
    &.collapse {
      max-height: 74px;
    }
    input {
      width: 44%;
      height: 54px;
      line-height: 54px;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      background-color: #f0f2f5;
      border-radius: 5px;
      border: 0;
      outline: 0;
    }
    .symbol {
      width: 4%;
      height: 1px; /*no*/
      background-color: #bfbfbf;
      display: inline-block;
      margin: 0 15px;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item {
      width: 28%;
      font-size: $default_smallfont_size;
      padding: 0 10px;
      background-color: #f0f2f5;
      border: 2px solid #f0f2f5;
      margin-bottom: 20px;
      margin-top: 10px;
      margin-right: 14px;
      height: 54px;
      line-height: 54px;
      text-align: center;
      vertical-align: middle;
      border-radius: 5px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(3n) {
        margin-right: 0px;
      }
      &.on {
        background-color: #fff;
        border: 1px solid $default_red_color;
        color: $default_red_color;
      }
    }
  }
}

.filter-grid {
  .choose-name {
    font-size: $default_font_size;
    color: $default_font_color;
    .collapse {
      margin-top: 16px;
      float: right;
    }
    .exp {
      font-size: $default_middlefont_size;
      margin-right: 20px;
      float: right;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      width: 70%;
      text-align: right;
      vertical-align: middle;
      height: 44px;
      line-height: 44px;
    }
  }
  .choose-item {
    margin: 20px 0;
    max-height: none;
    overflow: hidden;
    &.collapse {
      max-height: 74px;
    }
    .item {
      width: 28%;
      font-size: $default_smallfont_size;
      padding: 0 10px;
      background-color: #f0f2f5;
      border: 1px solid #f0f2f5;
      margin-bottom: 20px;
      margin-top: 10px;
      margin-right: 14px;
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
      &:nth-child(3n) {
        margin-right: 0px;
      }
      &.on {
        background-color: #fff;
        border: 1px solid $default_red_color;
        color: $default_red_color;
      }
    }
  }
}

.filter-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  padding: 40px 0;
  border-bottom: 1px solid $default_border_color;
  .title {
    font-size: $default_font_size;
  }
  .exp {
    margin: 0 20px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: transform 0.5s;
}

.translate-enter,
.translate-leave-to {
  transform: translate(100%, 0);
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
