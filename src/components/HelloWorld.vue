<template>
  <div class="button-wrap">
    <video
      ref="video"
      src="../assets/video/test.mp4"
      controls
      muted
      loop
      autoplay
    >
      您的浏览器不支持HTML5</video>
    <button class="share">
      分享此刻心情
    </button>
    <!-- <audio controls>
      <source src="horse.ogg">
      <source src="horse.mp3">
      您的浏览器不支持 audio 元素。
    </audio> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
.share {
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;
  color: aliceblue;
  font-size: 1.2rem;
  top: 50%;
}
.button-wrap {
  display: flex;
  justify-content: center;
  height: calc(100vh - 60px);
}
</style>
