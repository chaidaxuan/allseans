<template>
  <div class="apng-wrap">
    <audio
      class='audio'
      src="../assets/output2.mp3"
      autoplay
    ></audio>
    <canvas
      ref="theCanvas"
      class="canvas-apng"
      :width="imgWidth"
      :height="imgheight"
    >

    </canvas>

    <!-- 动画播放按钮 -->
    <button
      @click="show = true"
      ref="btn"
      style="display:none"
    >动画</button>
    <!-- 诗句显示 -->
    <transition name="slide-fade">
      <div
        v-if="show"
        class="poem-wrap"
      >
        <div class="poem">
          <div
            v-for="(item,i) in  poems[0].poem"
            :key='i'
          >{{item}}<br></div>
          <div class="poem-info">{{poems[0].info.auth}}<br></div>
          <div class="poem-info">{{poems[0].info.chapter}}<br></div>
        </div>
      </div>
    </transition>
    <!-- 立即分享按钮 -->
    <!-- 定制专属诗签按钮 -->
    <button class="select-poem"> 随机诗歌 </button>
    <button
      class="select-video"
      @click="randomVideo()"
    > 随机视频 </button>
    <button class="select-music"> 随机音乐 </button>
    <button
      class="share-btn"
      @click="share()"
    > 发布页面 </button>

  </div>
  <!-- <div style="margin:8px;width:calc(100vw - 16px)">
    <button
      class="randomSelection"
      @click="randomSelect"
    >随机选择</button>
    <button
      class="randomSelection"
      @click="toShare"
    >进入分享页</button>
    <p>请选择想分享的视频</p>
    <div class="slide-box">
      <img
        v-for="(x,i) in imgsSrc "
        :key='i'
        :src="x"
        @click="selectedImg = i"
        style=""
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
    <p
      id="message"
      style="display: block;"
    >apng-canvas needed</p>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class Select extends Vue {
  $router!: Router;
  $refs!: {
    theCanvas: HTMLCanvasElement;
  };

  msg = "Welcome to Your Vue.js App";
  show = false;
  selectedImg = -1;
  selectedAudio = -1;
  selectedPoem = 0;
  imgsSrc = [
    { path: require("../assets/landscape.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];
  audioSrc = ["/test3.mp3", "/test3.mp3", "/cx-testtest3.mp3"];
  imgWidth = 320;
  imgheight = 640;

  created() {}
  mounted() {
    this.randomVideo();
    this.$on("xxx1", (x: any) => console.log("xxx1XX: ", x));
  }
  print() {
    this.imgWidth = this.imgsSrc[0].width;
    this.imgheight = this.imgsSrc[0].height;
  }
  switchMusic() {}
  randomSelect() {
    let imgMax = this.imgsSrc.length;
    this.selectedImg = Math.floor(Math.random() * (imgMax + 1));
    this.selectedAudio = Math.floor(Math.random() * (3 + 1));
    let data = { selectedImg: this.selectedImg };
    this.$emit("xxx1", data);
  }
  toShare() {
    let imgMax = this.imgsSrc.length - 1;
    this.selectedImg = Math.floor(Math.random() * (1 + 1));
    this.selectedAudio = Math.floor(Math.random() * (3 + 1));
    let data = { selectedImg: this.selectedImg.toString() };
    this.$router.push({ name: "Share", params: data });
  }

  animations: { [key: string]: Promise<IAnimation> } = {};
  getAnimation(url: string): Promise<IAnimation> {
    if (!this.animations[url]) {
      this.animations[url] = APNG.parseURL(url);
    }

    return this.animations[url];
  }

  currentAnimation: IAnimation | null = null;
  downloading = false;
  async randomVideo() {
    if (this.downloading) {
      return;
    }
    this.downloading = true;

    let imgMax = this.imgsSrc.length - 1;
    let ctx = this.$refs.theCanvas.getContext("2d");
    this.selectedImg = Math.floor(Math.random() * (1 + 1));
    this.imgWidth = this.imgsSrc[this.selectedImg].width;
    this.imgheight = this.imgsSrc[this.selectedImg].height;

    if (this.currentAnimation) {
      this.currentAnimation.removeContext(ctx!);
    }

    const animation = await this.getAnimation(
      this.imgsSrc[this.selectedImg].path
    );
    animation.play();
    animation.addContext(ctx!);
    this.currentAnimation = animation;
    this.downloading = false;
  }

  share() {
    let data = {
      selectedImg: this.selectedImg.toString(),
      selectedPoem: this.selectedPoem.toString()
    };
    this.$router.push({ name: "Share", params: data });
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
  box-sizing: border-box;
}
.selected {
  border-color: black;
  border: 2px solid;
}
.selectedAudio {
  border: 1px solid white;
}
.randomSelection {
  border: 3px solid black;
  border-radius: 5px;
  background-color: transparent;
}
.select-video {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  border: 1px solid black;
  bottom: 20%;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 2em;
}
.select-music {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  border: 1px solid black;
  bottom: 10%;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 2em;
}
.select-poem {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  border: 1px solid black;
  bottom: 30%;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 2em;
}
.apng-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.canvas-apng {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.share-btn {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  border: 1px solid black;
  bottom: 1px;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 2em;
}
</style>
