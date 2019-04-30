<template>
  <div class="content">
    <x-header :left-options="{backText: ''}"
              class="vux-1px-b">相关协议</x-header>
    <group>
      <cell class="row"
            title="平台服务协议"
            @click.native="gotoHelp('regist', '红幸云商平台服务协议')"></cell>
      <cell class="row"
            title="法律声明及隐私权政策"
            @click.native="gotoHelp('falvshengming', '法律声明及隐私权政策')"></cell>
      <cell class="row"
            title="红心返利通用规范"
            @click.native="gotoHelp('fanliguifan', '红心返利通用规范')"></cell>
    </group>
  </div>
</template>
<script>
import { XHeader, Group, Cell } from 'vux'
export default {
  components: {
    XHeader,
    Group,
    Cell
  },
  methods: {
    gotoHelp (code, title) {
      this.$router.push({
        path: '/help/' + code,
        query: { title: title }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/pub";
.content {
  height: calc(100% - #{$default_navbar_height} - #{$default_toolbar_height});
}
</style>



