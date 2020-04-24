<template>
  <div class="share-wrap">
    你选择的图片为{{Islogin}}
  </div>
</template>

<script>
export default {
  name: 'Share',
  props: ['isLog'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false
    }
  },
  computed: {
    Islogin () {
      return this.isLog;
    }
  },
  mounted () {
    console.log("拿到了：", this.$route.params);
  },
  activated () {
    console.log("activated")
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -9999;
  /*灰色调*/
  /*-webkit-filter:grayscale(100%)*/
}
.share-wrap {
  width: 100%;
  height: 100%;
}
</style>
