<template>
  <div class="lds-css ng-scope">
    <div style="width:100%;height:100%" class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @keyframes lds-ripple {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }
  @-webkit-keyframes lds-ripple {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }
  .lds-ripple {
    position: relative;
  }
  .lds-ripple div {
    box-sizing: content-box;
    position: absolute;
    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    -webkit-animation: lds-ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation: lds-ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(1) {
    border-color: #0bc0e0;
  }
  .lds-ripple div:nth-child(2) {
    border-color: #0bc0e0;
    -webkit-animation-delay: -1.25s;
    animation-delay: -1.25s;
  }
  .lds-ripple {
    width: 200px !important;
    height: 200px !important;
    -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  }
  .ng-scope {
    display: flex;
    justify-content: center;
  }
</style>
