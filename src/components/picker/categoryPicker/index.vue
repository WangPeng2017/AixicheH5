<template>
  <aside class="aside">
    <transition name="fade">
      <div class="back" @click.self="status = false" v-show="status"></div>
    </transition>
    <transition name="translate">
      <div class="wrapper" v-show="status">
        <div class="content">
          <group v-for="(layer1Item, index) in data"
                 :key="layer1Item.category_id"
                 :title="layer1Item.category_name">
            <template v-for="(layer2Item, index) in layer1Item.children">
              <cell is-link
                    :key="layer2Item.category_id"
                    :title="layer2Item.category_name"
                    :border-intent="false"
                    :arrow-direction="layer2Item.direction ? 'up' : 'down'"
                    @click.native="layer2Item.direction=!layer2Item.direction">
              </cell>
              <template v-if="layer2Item.direction">
                <cell
                      v-for="(layer3Item, index) in layer2Item.children"
                      :key="layer3Item.category_id"
                      :border-intent="true">
                  <check-icon
                    slot="title"
                    :value.sync="layer3Item.status"
                    @update:value="change(layer3Item)">{{ layer3Item.category_name }}</check-icon>
                </cell>
              </template>
            </template>
          </group>
          <group></group>
        </div>
        <div class="footer">
          <a href="javascript:void(0)" @click="hide">取消</a>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
  import { Group, Cell, CheckIcon } from 'vux'
  export default {
    props: {
      data: {}
    },
    components: {
      Group,
      Cell,
      CheckIcon
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
      change (item) {
        this.data.map(f => {
          f.children.map(s => {
            s.children.map(t => {
              if (t !== item) {
                t.status = false
              }
            })
          })
        })
        item.status = true
        this.$emit('change', item)
        this.hide()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/pub";

  .aside {
    z-index: 19;
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
    background-color: rgba(0, 0, 0, .5);
  }

  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    background-color: $default_background_color;
    width: 90%;
    height: 100%;
    .content {
      height: 100%;
      overflow-y: scroll;
      padding: 0px 0px $default_toolbar_height;
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
