<template>
  <div>
    <Select @isLogFn="lisLogFn"></Select>
    <Share :isLog="selectedImgIndex"></Share>
  </div>
</template>

<script>
import Select from '@/components/Select'
import Share from '@/components/Share'

export default {
  name: 'Parents',
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

  mounted () {
    let btn = this.$refs.btn
    this.$refs.btn.click()
    console.log('btn', btn)

    this.print();
  },
  methods: {
    lisLogFn (imgIndex, audioIndex) {
      debugger
      this.selectedImgIndex = imgIndex;
      this.selectedAudioIndex = audioIndex;
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
  font-size: 1.2rem;
  top: 50%;
}

.button-wrap {
  display: flex;
  justify-content: center;
  height: calc(100vh - 200px);
}

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
.sound-group {
  width: 5vw;
  height: 5vh;
  padding: 3%;
  z-index: 1000;
  position: absolute;
  top: 0;
  right: 0;
}
.bgaudio {
  width: 100%;
  height: auto;
}
.poem-wrap {
  width: 40%;
  height: 20%;
  display: block;
  position: absolute;
  color: white;
  font-size: 30px;
  padding: 0px;
  background-color: transparent;
  top: 50px;
  right: 50px;
  font-family: "Microsoft YaHei";
}
.poem {
  font-size: 1.1rem;
  text-align: left;
  /* margin: 0 auto; */
  height: 40vh;
  writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  writing-mode: tb-rl; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
}
.poem-info {
  font-size: 0.8em;
  float: right;
  clear: both;
}
.customize-btn {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 10vh;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  border: 0;
  color: white;
  object-fit: contain;
}
.share-btn {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 20vh;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  border: 0;
  color: white;
  object-fit: contain;
}
.apng-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
