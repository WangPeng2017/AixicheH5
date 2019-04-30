<template>
  <div>
    <div class="part1">
      <img :src="data.url"
           alt="">
      <p>{{ data.title }}</p>
      <p>（ {{ data.cardType }} ）</p>
    </div>
    <div class="part2">
      <p>
        <span class="money">套餐金额：￥{{ data.money }}</span>
        <span class="date">有效期：{{ data.date }}</span>
      </p>
      <p>
        套餐简介：{{ data.content }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card1',
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.part1 {
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  line-height: 1;

  img {
    width: 150px;
    height: 72px;
  }
  p {
    margin: 5px 0;
  }
}
.part2 {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  background: rgba(247, 247, 247, 1);
  padding: 10px;
  p {
    margin-bottom: 5px;
    line-height: 1.5;

    .money {
      margin-right: 20px;
    }
  }
}
</style>
