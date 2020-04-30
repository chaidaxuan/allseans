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
    >
    </canvas>
    <!-- 诗歌显示 -->
    <transition name="slide-fade">
      <div
        v-if="show"
        class="poem-wrap"
      >
        <div class="poem">
          <div>{{currentDate}}<br></div>
          <div v-if="PoemProvince">我在{{PoemProvince}}<br></div>
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

    <!-- 动画播放按钮 -->
    <button
      @click="show = true"
      ref="btn"
      style="display:none"
    >动画</button>
    <img
      class="select-poem"
      src='../assets/btn-img/black_share_jike.png'
      @click="oneClickShare()"
    >

    <img
      class="select-video"
      src='../assets/btn-img/black_xieshi.png'
      @click="customize()"
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
export default class Entry extends Vue {
  $router!: Router;
  $refs!: {
    theCanvas: HTMLCanvasElement;
    btn: HTMLButtonElement;
    theAudio: HTMLAudioElement;
    theBtnMusic: HTMLButtonElement;
  };

  msg = "Welcome to Your Vue.js App";
  show = false;
  selectedImg = 1;
  selectedAudio = 0;
  selectedPoem = 0;
  PoemProvince = "";
  currentDate = this.timestampToTime(new Date().getTime());
  imgsSrc = [
    { path: require("../assets/3.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];
  provinces = [
    { provinceCode: "shanghai", provinceName: "上海" },
    { provinceCode: "beijing", provinceName: "北京" }
  ];
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

  created() {}
  mounted() {
    console.log("this.$route.params.cid", this.$route.params.cname);
    this.PoemProvince = this.PoemProvince = this.provinces.filter(
      x => x.provinceCode === this.$route.params.cname
    )[0].provinceName;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        let audio = <HTMLVideoElement>document.getElementById("audioPlay");
        audio.play();
        console.log("WeixinJSBridgeReady");
      },
      false
    );

    this.randomVideo();
    //播放诗歌动画
    let btn = this.$refs.btn;
    this.$refs.btn.click();
  }
  print() {
    this.imgWidth = this.imgsSrc[0].width;
    this.imgheight = this.imgsSrc[0].height;
  }
  randomSelect() {
    let imgMax = this.imgsSrc.length;
    this.selectedImg = Math.floor(Math.random() * (imgMax + 1));
    this.selectedAudio = Math.floor(Math.random() * (1 + 1));
    let data = { selectedImg: this.selectedImg };
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

  animations: { [key: string]: Promise<IAnimation> } = {};
  getAnimation(url: string): Promise<IAnimation> {
    if (!this.animations[url]) {
      this.animations[url] = APNG.parseURL(url);
    }
    return this.animations[url];
  }

  customize() {
    let params = {
      isOldCustomer: "true"
    };

    // this.selectedImg = Math.floor(Math.random() * (1 + 1));
    // this.selectedAudio = Math.floor(Math.random() * (1 + 1));
    // this.selectedPoem = Math.floor(Math.random() * (1 + 1));

    // 三个参数分别为(图片,音频,诗歌);
    const hash =
      this.selectedImg.toString() +
      "-" +
      this.selectedAudio.toString() +
      "-" +
      this.selectedPoem.toString() +
      "-" +
      this.$route.params.cname +
      "-" +
      new Date().getTime().toString();
    debugger;
    this.$router.replace({
      name: "Select",
      params: {
        cid: window.btoa(hash),
        isOldCustomer: "true"
      }
    });
  }
  oneClickShare() {
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
      this.$route.params.cname +
      "-" +
      new Date().getTime().toString();

    debugger;
    this.$router.replace({
      name: "Apng",
      params: {
        cid: window.btoa(hash),
        isOldCustomer: "true"
      }
    });
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
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 13%;
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.select-music {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  border: 1px solid black;
  bottom: 10%;
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.select-poem {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 20%;
  width: 8rem;
  height: 3rem;
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
  top: 26%;
  right: 10%;
  font-family: "Microsoft YaHei";
}
.poem {
  font-size: 0.8rem;
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
</style>
