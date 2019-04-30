<!--suppress ALL -->
<template>
  <div class="sort">
    <ul>
      <li v-for="item in filterData"
          class="new-sort-integrative"
          @click="filterDisplayChange(item)">
        <span>{{item.name}}</span>
        <div class="wrapper"
             v-show="!item.isUp">
          <div class="items"
               v-for="subitem in item.list"
               :class="{on: subitem.status}"
               @click="filterChange(subitem, item)">
            <div class="litem">{{ subitem.title }}</div>
            <div class="ritem"><i v-show="subitem.status"
                 class="check-icon"></i></div>
          </div>
        </div>
      </li>
      <li v-for="item in data"
          :class="[{'new-sort-integrative': item.type===1 }, {'new-sort-price': item.type===3 }, {'active': item.status}]"
          @click="sort(item)">
        <span v-if="item.type === 1">
          {{item.name}}
        </span>
        <div class="wrapper"
             v-show="item.type === 1 && !item.isUp">
          <div class="items"
               v-for="subitem in item.list"
               :class="{on: subitem.status}"
               @click="sortSubOneWay(subitem, item)">
            <div class="litem">{{ subitem.title }}</div>
            <div class="ritem"><i v-show="subitem.status"
                 class="check-icon"></i></div>
          </div>
        </div>

        <span v-if="item.type === 2">
          {{item.name}}
        </span>
        <span v-if="item.type === 3"
              :class="[item.status ? (item.isUp ? 'arrow-down' : 'arrow-up') : '']">
          {{item.name}}
        </span>

      </li>
      <li class="new-sort-choose"
          @click="filter"
          v-if="enableFilter">
        <span>筛选</span>
      </li>
      <li v-if="enableSwitch">
        <i :class="[display ? 'sort-icon' : 'sort-card-icon']"
           @click="switchChange"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    filterData: {
      type: Array
    },
    // 显示方式，true列表，false网格
    display: {
      type: Boolean
    },
    // 是否开启切换显示
    enableSwitch: {
      type: Boolean
    },
    // 是否启用筛选
    enableFilter: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    filterDisplayChange (item) {
      item.isUp = !item.isUp
      this.filterData.map(i => {
        if (item !== i) {
          i.isUp = true
        }
      })
    },
    filterChange (item, parent) {
      if (!item.status) {
        let name = parent.name
        parent.list.map(i => {
          if (i === item) {
            i.status = true
            name = i.title
          } else {
            i.status = false
          }
        })

        if (item != null) {
          parent.status = true
          parent.name = name
          parent.isUp = false
          item.status = true
          this.$emit('filterChange', parent)
        }
      } else {
        parent.isUp = true
      }
    },
    // 主排序项切换
    sort (item) {
      // 同元素再次点击
      if (item.type === 1) {
        // 综合重复点击，显示或隐藏二级菜单
        item.isUp = !item.isUp
      }

      if (item.type === 2) {
        if (item.status) {
          // 销量重复点击，固定降序
          item.isUp = false
        } else {
          this.clear()
          item.isUp = false
          item.status = true
          this.sortOneWay(item)
        }
      }

      if (item.type === 3) {
        if (item.status) {
          // 价格重复点击，切换升序降序
          item.isUp = !item.isUp
          this.sortTwoWay(item)
        } else {
          this.clear()
          item.isUp = true
          item.status = true
          this.sortTwoWay(item)
        }
      }
    },
    // 子项单向排序
    sortSubOneWay: function (item, parent) {
      if (!item.status) {
        this.clear()
        let name = parent.name
        parent.list.map(i => {
          if (i === item) {
            i.status = true
            name = i.title
          } else {
            i.status = false
          }
        })

        if (item != null) {
          parent.status = true
          parent.name = name
          parent.isUp = false
          item.status = true
          this.$emit('sortChange', item)
        }
      } else {
        parent.isUp = true
      }
    },
    // 主项双向排序
    sortTwoWay: function (parent) {
      let sord = parent.isUp ? 'asc' : 'desc'
      let item = parent.list.find(function (value, index, arr) {
        return value.sord === sord
      })
      if (item != null) {
        item.status = true
        this.$emit('sortChange', item)
      }
    },
    // 主项单向排序
    sortOneWay (parent) {
      let sord = parent.isUp ? 'asc' : 'desc'
      let item = parent.list.find(function (value, index, arr) {
        return value.sord === sord
      })

      if (item != null) {
        item.status = true
        this.$emit('sortChange', item)
      }
    },
    // 清除排序
    clear () {
      this.data.map(i => {
        i.status = false
        i.isUp = true
        i.list.map(k => {
          k.status = false
        })
      })
    },
    // 筛选
    filter () {
      this.data.map(i => {
        if (i.type === 1) {
          i.isUp = true
        }
      })
      this.$emit('filter')
    },
    // 显示切换
    switchChange () {
      this.$emit('switchChange')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/pub";

.sort {
  display: flex;
  align-items: center;
  width: 100vw;
  height: $default_toolbar_height;
  line-height: $default_toolbar_height;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid $default_border_color;
  ul {
    flex: 1;
    display: flex;
    justify-content: space-around;
    li {
      border-right: 0;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
      font-size: $default_font_size;
      text-align: center;
      span {
        color: $default_title_color;
        display: block;
      }

      span:after {
        display: inline-block;
        background-size: 400px 400px;
        background-repeat: no-repeat;
        background-image: url("../../assets/image/axc-sprites.png");
      }
      &.active {
        span {
          color: $default_red_color;
        }
        span:after {
          display: inline-block;
          background-size: 400px 400px;
          background-repeat: no-repeat;
          background-image: url("../../assets/image/axc-sprites.png");
        }
      }
    }

    .new-sort-integrative {
      span:after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 14px;
        background-position: -20px -218px;
        margin-left: 8px;
      }
      &.active {
        span:after {
          content: "";
          display: inline-block;
          width: 16px;
          height: 14px;
          background-position: 0 -218px;
          margin-left: 8px;
        }
      }
    }

    .new-sort-price {
      span:after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 20px;
        background-position: -340px -60px;
        margin-left: 8px;
      }

      span.arrow-down:after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 20px;
        background-position: -340px -30px;
        margin-left: 8px;
      }

      span.arrow-up:after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 20px;
        background-position: -340px 0;
        margin-left: 8px;
      }
    }

    .new-sort-choose {
      span:after {
        content: "";
        background-image: url(../../assets/image/axc-search-sprites.png);
        background-repeat: no-repeat;
        background-size: 400px 400px;
        background-position: -356px 6px;
        width: 30px;
        height: 26px;
        display: inline-block;
        margin-left: 8px;
      }
    }
  }
  .wrapper {
    width: 100vw;
    position: fixed;
    left: 0;
    margin-top: 1px;
    z-index: 999;
    background-color: #fff;
    text-align: left;
    .items {
      color: $default_title_color;
      padding: 0px 40px;
      height: $default_cell_height;
      line-height: $default_cell_height;
      vertical-align: middle;
      border-bottom: 1px solid #eee; /*no*/

      .litem {
        margin: 0;
        width: 50%;
        float: left;
        text-align: left;
      }

      .ritem {
        margin: 0;
        width: 50%;
        float: right;
        text-align: right;
      }
      &.on {
        color: $default_red_color;
      }
    }
  }
}
</style>
