<template>
  <footer class="footer-nav">
    <nav>
      <router-link to="/home" replace>
        <i></i>
        <p>首页</p>
      </router-link>
      <router-link to="/category" replace>
        <i></i>
        <p>分类</p>
      </router-link>
      <router-link to="/discover" replace>
        <i></i>
        <p>发现</p>
      </router-link>
      <router-link to="/shopcar" replace>
        <i></i>
        <p>购物车</p>
      </router-link>
      <router-link to="/my" replace>
        <i></i>
        <p>我的</p>
      </router-link>
    </nav>
  </footer>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/pub";
  .footer-nav {
    width: 100%;
    height: $default_tabbar_height;
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(8, 1, 3, 0.27);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    nav {
      display: flex;
      a {
        height: $default_tabbar_height;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.router-link-active {
          color: $default_theme_color;
          &:nth-child(1) {
            i {
              @include backimg('./../../assets/image/navup1');
            }
          }
          &:nth-child(2) {
            i {
              @include backimg('./../../assets/image/navup2');
            }
          }
          &:nth-child(3) {
            i {
              @include backimg('./../../assets/image/navup');
            }
          }
          &:nth-child(4) {
            i {
              @include backimg('./../../assets/image/navup4');
            }
          }
          &:nth-child(5) {
            i {
              @include backimg('./../../assets/image/navup5');
            }
          }
        }
        &:nth-child(1) {
          i {
            @include backimg('./../../assets/image/nav1', $default_tabbar_image_size);
          }
        }
        &:nth-child(2) {
          i {
            @include backimg('./../../assets/image/nav2', $default_tabbar_image_size);
          }
        }
        &:nth-child(3) {
          i {
            @include backimg('./../../assets/image/nav3', $default_tabbar_image_size);
          }
        }
        &:nth-child(4) {
          i {
            @include backimg('./../../assets/image/nav4', $default_tabbar_image_size);
          }
        }
        &:nth-child(5) {
          i {
            @include backimg('./../../assets/image/nav5', $default_tabbar_image_size);
          }
        }
        i {
          width: $default_tabbar_image_size;
          height: $default_tabbar_image_size;
        }
        p {
          margin-top: 4px;
          font-size: $default_middlefont_size;
        }
      }
    }
  }
</style>
