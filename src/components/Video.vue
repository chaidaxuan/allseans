<template>
  <div style="width: 100vw;height: 100vh;text-align:center;">
    <audio
      src="../assets/audio/test.mp3"
      autoplay="autoplay"
    ></audio>
    <video
      ref="video"
      src="https://vdept.bdstatic.com/5836487a6962746341794578636b6e77/456c477257636959/33822ca6142e07509fba5869e19cb99c4ffdcdc450a4f46d473cadbfebb8e79508cbb7c643245d50a72f76b9ca8c9dcc.mp4?auth_key=1587356781-0-0-9ef31a9c2cb127310c99bbb65621434b"
      controls
      muted
      loop
      autoplay
      controlslist="nodownload"
    >
      您的浏览器不支持HTML5</video>
    <button class="share">
      分享此刻心情
    </button>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false
    }
  },
  mounted () {

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
  font-size: 1.2rem;
  top: 50%;
  color: white;
}

.button-wrap {
  display: flex;
  justify-content: center;
  height: calc(100vh - 200px);
}

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-100vh);
}
</style>
