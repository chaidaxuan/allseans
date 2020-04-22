<template>
  <div style="margin: 8px;">
    <!-- 横向移动标签 -->
    <button
      class="randomSelection"
      @click="randomSelect()"
    >随机选择</button>
    <p>请选择想分享的视频</p>
    <div class="slide-box">
      <img
        v-for="(x,i) in imgsSrc "
        :key='i'
        :src="x"
        @click="selectedImg = i"
        :class="{'selected':selectedImg == i}"
      >
    </div>
    <p>请选择想分享的音乐(点击播放)</p>
    <p
      v-for="(x,i) in audioSrc"
      :key='i'
      :src="x"
      @click="selectedAudio = i,switchMusic()"
      :class="{'selectedAudio':selectedAudio == i}"
      style="    border: 1px solid white;"
    >{{i+1}}:音乐名称<i class="iconfont">{{selectedAudio===i?'&#xe633':'&#xe7f5'}}</i></p>
    <audio
      class='audio'
      :src='audioSrc[selectedAudio]'
    ></audio>

  </div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      selectedImg: -1,
      selectedAudio: -1,
      imgsSrc: ['/static/img/landscape.362f267.png', '/static/img/mountain.876ce18.png', '/static/img/mountain.876ce18.png', '/static/img/landscape.362f267.png'],
      audioSrc: ['../assets/test.mp3', '../assets/test2.mp3', '../assets/test.mp3']
    }
  },
  mounted () {
    // $('audio').click(() => {

    // })
  },
  methods: {
    print () {
      console.log('111');
    },
    switchMusic () {

    },
    randomSelect () {
      let imgMax = this.imgsSrc.length;
      this.selectedImg = Math.floor(Math.random() * (imgMax + 1));
      this.selectedAudio = Math.floor(Math.random() * (3 + 1));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  background-color: #fffdf4;
}
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

.slide-box {
  height: 20vh;
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
.slide-item {
  padding: 5px 10px;
  height: calc(100% - 5px);
}
img {
  width: 30%;
  height: calc(100% - 11px);
  border: 3px solid white;
  object-fit: cover;
  margin: auto 5px solid white;
}
.selected {
  border-color: black;
  border: 2px solid;
}
.selectedAudio {
  border: 1px solid white;
}
.randomSelection {
  border: 2px solid black;
  border-radius: 5px;
  background-color: transparent;
}
</style>
