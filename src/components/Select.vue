<template>
  <div class="apng-wrap">
    <audio
      id="audioPlay"
      class='audio'
      :src="audios[selectedAudio].path"
      autoplay
    ></audio>
    <canvas
      ref="theCanvas"
      class="canvas-apng"
      :width="imgWidth"
      :height="imgheight"
      id="apng-canvas"
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
        :class="imgsSrc[selectedImg].poemColor==='black'?'poem-blackfont':''"
      >
        <div class="poem">
          <!-- <div>{{currentDate}}<br></div> -->
          <!-- <div v-if="PoemProvince">我在{{PoemProvince}}<br></div> -->
          <div><br></div>
          <div
            v-for="(item,i) in poems[selectedPoem].poem"
            :key='i'
          >{{item}}<br></div>
          <div class="poem-info">{{poems[selectedPoem].info.auth}}<br></div>
          <div class="poem-info">{{poems[selectedPoem].info.chapter}}<br></div>
        </div>
      </div>
    </transition>
    <!-- 立即分享按钮 -->
    <!-- 定制专属诗签按钮 -->
    <img
      class="select-poem"
      src='../assets/btn-img/black_hua.png'
      @click="randomVideo()"
    >
    <img
      ref="theBtnMusic"
      src='../assets/btn-img/black_peiyue.png'
      @click="randomMusic()"
      class="select-video"
    >
    <img
      class="select-music"
      src='../assets/btn-img/black_xuanshi.png'
      @click="randomPoem()"
    >
    <img
      class="share-btn"
      src='../assets/btn-img/black_queren.png'
      @click="share()"
    >
    <img
      class="title-img"
      src='../assets/title.png'
    >

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class Select extends Vue {
  $router!: Router;
  $refs!: {
    theCanvas: HTMLCanvasElement;
    btn: HTMLButtonElement;
    theAudio: HTMLAudioElement;
    theBtnMusic: HTMLButtonElement;
  };

  msg = "Welcome to Your Vue.js App";
  show = false;
  selectedImg = 0;
  selectedAudio = 0;
  selectedPoem = 0;
  imgsSrc = [
    {
      path: require("../assets/3.png"),
      width: 528,
      height: 960,
      poemColor: "white"
    },
    {
      path: require("../assets/mountain.png"),
      width: 352,
      height: 640,
      poemColor: "black"
    }
  ];
  currentDate = this.timestampToTime(new Date().getTime());
  imgWidth = 320;
  imgheight = 640;
  poems = [
    {
      poem: [
        "你是四月早天里的云烟，",
        "黄昏吹着风的软，",
        "星子在无意中闪，",
        "细雨点洒在花前。"
      ],
      info: { auth: "——林徽因", chapter: "《你是人间的四月天》节选" }
    },
    {
      poem: [
        "最是那一低头的温柔",
        "象一朵水莲花不胜凉风的娇羞，",
        "道一声珍重，道一声珍重，",
        "那一声珍重里有蜜甜的忧愁",
        "沙扬娜拉"
      ],
      info: { auth: "——徐志摩", chapter: "《沙扬娜拉》" }
    }
  ];
  audios = [
    {
      path: require("../assets/audio/output2.mp3"),
      title: "output2"
    },
    {
      path: require("../assets/audio/output3.mp3"),
      title: "output3"
    }
  ];
  provinces = [
    { provinceCode: "shanghai", provinceName: "上海" },
    { provinceCode: "beijing", provinceName: "北京" }
  ];
  PoemProvince = "上海";
  currentProvince = "shanghai";

  created() {}
  mounted() {
    //
    let paramsUrl = this.$route.params.cid;
    debugger;
    if (paramsUrl.split("-").length > 3) {
      this.currentProvince = paramsUrl.split("-")[3];
      this.PoemProvince = this.provinces.filter(
        x => x.provinceCode === this.currentProvince
      )[0].provinceName;
      debugger;
    }
    debugger;
    this.selectedImg = parseFloat(paramsUrl.split("-")[0]);
    this.selectedAudio = parseFloat(paramsUrl.split("-")[1]);
    this.selectedPoem = parseFloat(paramsUrl.split("-")[2]);

    let ctx = this.$refs.theCanvas.getContext("2d");
    this.imgWidth = this.imgsSrc[this.selectedImg].width;
    this.imgheight = this.imgsSrc[this.selectedImg].height;

    this.playVideo();

    this.$refs.theBtnMusic.click();
    //播放诗歌动画
    let btn = this.$refs.btn;
    this.$refs.btn.click();
  }

  async playVideo() {
    let ctx = this.$refs.theCanvas.getContext("2d");
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
  }

  print() {
    this.imgWidth = this.imgsSrc[0].width;
    this.imgheight = this.imgsSrc[0].height;
  }
  switchMusic() {}
  randomSelect() {
    let imgMax = this.imgsSrc.length;
    this.selectedImg = Math.floor(Math.random() * (imgMax + 1));
    this.selectedAudio = Math.floor(Math.random() * (1 + 1));
    let data = { selectedImg: this.selectedImg };
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

    let ctx = this.$refs.theCanvas.getContext("2d");
    this.selectedImg === 0 ? (this.selectedImg = 1) : (this.selectedImg = 0);

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
    let params = {
      isOldCustomer: "true"
    };

    // 三个参数分别为(图片,音频,诗歌);
    const hash =
      this.selectedImg.toString() +
      "-" +
      this.selectedAudio.toString() +
      "-" +
      this.selectedPoem.toString() +
      "-" +
      this.currentProvince +
      "-" +
      new Date().getTime().toString();
    debugger;
    this.$router.replace({
      name: "Apng",
      params: {
        cid: hash,
        isOldCustomer: "true"
      }
    });
  }

  randomPoem() {
    this.show = !this.show;
    // this.show = !this.show;
    this.selectedPoem === 0 ? (this.selectedPoem = 1) : (this.selectedPoem = 0);
    setTimeout(() => {
      this.show = !this.show;
    }, 100);
  }
  randomMusic() {
    this.selectedAudio === 0
      ? (this.selectedAudio = 1)
      : (this.selectedAudio = 0);
  }
  timestampToTime(timestamp: number) {
    if (timestamp) {
      if (timestamp === 0) {
        return "";
      }
      if (timestamp.toString().length != 10) {
        debugger;
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      } else {
        var date = new Date(timestamp * 1000);
      }
      const Y = date.getFullYear() + "年";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      const D = date.getDate() + "日";
      debugger;
      return Y + M + D;
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
  left: 25%;
  bottom: 0%;
  width: 25%;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.select-music {
  position: absolute;
  margin: auto;
  left: 50%;
  bottom: 0%;
  width: 25%;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.select-poem {
  position: absolute;
  left: 0;
  bottom: 0%;
  width: 25%;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
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
  left: 75%;
  bottom: 0%;
  width: 10rem;
  width: 25%;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
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
  top: 17%;
  right: 10%;
  font-family: "Microsoft YaHei";
}
.poem {
  font-size: 0.8rem;
  text-align: left;
  /* margin: 0 auto; */
  height: 30vh;
  writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  writing-mode: tb-rl; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
}
.poem-info {
  font-size: 0.8em;
  float: right;
  clear: both;
}
.title-img {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 5%;
  width: 20%;
  height: 3%;
  object-fit: contain;
}

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-enter {
  transform: translateY(-10%);
  opacity: 0;
}
.poem-blackfont {
  color: black;
}
</style>
