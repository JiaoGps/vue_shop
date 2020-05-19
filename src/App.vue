<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <tabbar class="footer-mTabbar" v-show="$route.meta.showFooter"></tabbar>
  </div>
</template>

<script>
//引入组件
import Tabbar from "@/components/tabbar/index";
// 软键盘关闭事件
document.body.addEventListener("focusout", () => {
  // 回到原点  \
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
export default {
  name: "app",
  components: { Tabbar },
  data() {
    return {
      keepAlive: "main-keep-alive", //需要缓存的页面 例如首页
      transitionName: "slide-left", //初始过渡动画方向
      isShowTabbar: true //是否显示底部导航
    };
  },
  watch: {
    $route(to, from) {
      // 切换动画
      let isBack = this.$route.isBack;
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style lang="scss">
#app {
  // 字体
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
  overflow: hidden;
  .Router {
    position: absolute;
    width: 100%;
    height: calc(100vh - 102px);
    top: 0;
    transition: all 0.35s ease;//动画
    will-change: transform;
    overflow-y: auto; //auto 如果溢出框，则应该提供滚动机制。
    //background: #8a8686;
  }
  .footer-mTabbar {
    position: absolute;
    bottom: 0;
  }
}
</style>
