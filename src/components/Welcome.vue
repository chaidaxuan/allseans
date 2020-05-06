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
        :class="imgsSrc[selectedPoem].poemColor==='black'?'poem-blackfont':''"
      >
        <div class="poem">
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
      src='../assets/share-btn.png'
      @click="oneClickShare()"
    >

    <img
      class="select-video"
      src='../assets/customize-btn.png'
      @click="customize()"
    >
    <img
      class="title-img"
      src='../assets/title.png'
    >

    <!-- <button
            class="select-poem"
            @click="oneClickShare()"
        > 一键分享</button>
        <button
            class="select-video"
            @click="customize()"
        > 定制 </button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

interface IIPApiReturn {
  address: string; // "CN|北京|北京|None|CHINANET|1|None",    #详细地址信息
  content: // #结构信息
  {
    address: string; // "北京市",    #简要地址信息
    address_detail: //  #结构化地址信息
    {
      city: string; // "北京市",    #城市
      city_code: number; // 131,    #百度城市代码
      province: string; // "北京市",    #省份
    };
    point: //  #当前城市中心点
    {
      x: string; // "116.39564504",    #当前城市中心点经度
      y: string; // "39.92998578"    #当前城市中心点纬度
    };
  };
  status: number; // 0    #结果状态返回码
}

@Component({ components: {} })
export default class Welcome extends Vue {
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
  provinceVideo = [
    {
      provinceCode: "anhui",
      imgsSrc: [
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
      ]
    },
    {
      provinceCode: "beijing",
      imgsSrc: [
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
      ]
    },
    {
      provinceCode: "上海市",
      imgsSrc: [
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
      ]
    }
  ];

  async getLocation() {
    return new Promise<IIPApiReturn>((resolve, reject) => {
      const url =
        "http://api.map.baidu.com/location/ip?ak=ddBZ2RjgVlRUwNs25lRHbWnEpunFXB6a&callback=getLocationCallback";
      const script = document.createElement("script");
      const timer = setTimeout(() => {
        window.document.body.removeChild(script);
        reject("timeout");
      }, 3000);
      (window as any).getLocationCallback = (result: IIPApiReturn) => {
        window.document.body.removeChild(script);
        clearTimeout(timer);
        resolve(result);
      };
      script.type = "text/javascript";
      script.src = url;
      window.document.body.appendChild(script);
    });
  }

  async created() {
    const loc = await this.getLocation();
    let currentProvince = loc.content.address_detail.province;
    let currentCity = loc.content.address_detail.city;
    localStorage.setItem("currentProvince", currentProvince);
    localStorage.setItem("currentCity", currentCity);

    this.imgsSrc = this.provinceVideo.filter(
      x => x.provinceCode === currentProvince
    )[0].imgsSrc;

    console.log(
      "city:",
      loc.content.address_detail.city,
      "prpvince:",
      loc.content.address_detail.province
    );
    console.log(loc);
  }

  mounted() {
    // 自动播放音乐
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
    const hash =
      this.selectedImg.toString() +
      "-" +
      this.selectedAudio.toString() +
      "-" +
      this.selectedPoem.toString() +
      "-" +
      "shanghai" +
      "-" +
      new Date().getTime().toString();
    this.$router.replace({
      name: "Select",
      params: {
        cid: hash,
        isOldCustomer: "true"
      }
    });
  }
  oneClickShare() {
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
      this.selectedPoem.toString();
    this.$router.replace({
      name: "Apng",
      params: {
        cid: hash,
        isOldCustomer: "true"
      }
    });
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
  top: 17%;
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
