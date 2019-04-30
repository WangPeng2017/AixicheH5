<template>
  <div class="header">
        <div class="hongxingfontt"></div>
        <br/>
        <div class="upupt"></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default{
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['token', 'user'])
    }
  }
</script>

<style lang="scss" scoped>
 @import "../../../assets/css/pub";
  .header{
    position: relative;
    height: 351px;
    background-image: url("../../../assets/image/upbackgroundt@2x.png");
    background-size: cover;
    padding-top: 8%;
    text-align: center;
    .upupt{
      padding-top: 30%;
    }
  }
</style>

