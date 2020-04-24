<template>
  <div class="app-div">
    <transition
      name='transitionName'
      keep-alive
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import Select from "./components/Select.vue";
import Share from "./components/Share.vue";

export default {
  name: 'App',
  components: {
    Select,
    Share
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectedImgIndex: -1,
      selectedAudioIndex: -1,
    }
  },
  beforeRouteUpdate (to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false;
  },
  methods: {}
}


</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html {
  background-color: #fffdf4;
  width: 100%;
  height: 100%;
}
@font-face {
  font-family: "iconfont"; /* project id 1769893 */
  src: url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.eot");
  src: url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.woff") format("woff"),
    url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1769893_pgwwuio0oo.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-play {
  content: "\e7f5;";
}
.icon-pause {
  content: "\e633;";
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
.app-div {
  width: 100%;
  height: 100%;
}
</style>
