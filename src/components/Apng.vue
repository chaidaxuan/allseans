<template>
  <div class="app-wrap">
    <div class="apng-wrap">
      <audio
        id="audioPlay"
        class='audio'
        :src="audios[selectedAudioIndex].path"
        autoplay
      ></audio>

      <canvas
        id="apng-canvas"
        :width="imgWidth"
        :height="imgheight"
        style="width: 100%;height: 100%;object-fit:cover;"
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
              v-for="(item,i) in poems[selectedPoemIndex].poem"
              :key='i'
            >{{item}}<br></div>
            <div class="poem-info">{{poems[selectedPoemIndex].info.auth}}<br></div>
            <div class="poem-info">{{poems[selectedPoemIndex].info.chapter}}<br></div>
          </div>
        </div>
      </transition>
      <!-- 立即分享按钮 -->
      <!-- 定制专属诗签按钮 -->

      <img
        v-if="isOldCustomer"
        class="share-btn"
        @click="saveImg()"
        src='../assets/share.png'
      >
      <button
        v-if="!isOldCustomer"
        class="select-city"
        @click="selectCity()"
      > 进入理想城市 </button>
      <!-- <img
        class="customize-btn"
        src='../assets/customize-btn.png'
        @click="routeToCustomize()"
      > -->

      <!-- 全季logo -->
      <img
        class="title-img"
        src='../assets/title.png'
      >
      <img
        ref="theImg"
        style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0"
        id="Basemap"
        v-if="canSave"
      >
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import Share from '@/components/Share'

export default {
  name: 'Apng',
  components: {
    Select,
    Share
  },

  data () {
    return {
      $refs: {
        theCanvas: HTMLCanvasElement,
        theImg: HTMLImageElement,
      },
      msg: 'Welcome to Your Vue.js App',
      show: false,
      canSave: true,
      imgIndex: 0,
      selectedImgIndex: 0,
      selectedPoemIndex: 0,
      selectedAudioIndex: 0,
      imgsSrc: [
        { path: require("../assets/3.png"), width: 528, height: 960 },
        { path: require("../assets/mountain.png"), width: 352, height: 640 }
      ],
      imgWidth: 528,
      imgheight: 960,
      isOldCustomer: false,
      poems: [{ poem: ['你是四月早天里的云烟，', '黄昏吹着风的软，', '星子在无意中闪，', '细雨点洒在花前。'], info: { auth: '——林徽因', chapter: '《你是人间的四月天》节选' } },
      { poem: ['最是那一低头的温柔', '象一朵水莲花不胜凉风的娇羞，', '道一声珍重，道一声珍重，', '那一声珍重里有蜜甜的忧愁', '沙扬娜拉'], info: { auth: '——徐志摩', chapter: '《沙扬娜拉》' } }
      ],
      audios: [
        {
          path: require("../assets/audio/output2.mp3"),
          title: "output2"
        },
        {
          path: require("../assets/audio/output3.mp3"),
          title: "output3"
        }
      ]
    }
  },

  mounted () {
    let that = this;
    this.selectedImgIndex = this.$route.params.cid.split('-')[0];
    this.selectedAudioIndex = this.$route.params.cid.split('-')[1];
    this.selectedPoemIndex = this.$route.params.cid.split('-')[2];

    // 判断是否是老客
    this.isOldCustomer = this.$route.params.isOldCustomer == 'true';
    console.log('是否是老客', this.isOldCustomer);

    //播放诗歌动画
    let btn = this.$refs.btn;
    this.$refs.btn.click();

    //播放视频
    this.print();
    if (this.isOldCustomer) {
      let image = new Image();
      if (this.selectedImgIndex === '0' && this.selectedPoemIndex === '1') {
        let image = new Image();
        image.src = require('../assets/0-1.png');
        image.onload = function () {
          let base64 = that.getBase64Image(image);
          that.$refs.theImg.src = base64;
          console.log(base64);
        }
      }
      if (this.selectedImgIndex === '0' && this.selectedPoemIndex === '0') {
        let image = new Image();
        image.src = require('../assets/0-0.png');
        image.onload = function () {
          let base64 = that.getBase64Image(image);
          that.$refs.theImg.src = base64;
          console.log(base64);
        }
      }
      if (this.selectedImgIndex === '1' && this.selectedPoemIndex === '1') {
        let image = new Image();
        image.src = require('../assets/1-1.png');
        image.onload = function () {
          let base64 = that.getBase64Image(image);
          that.$refs.theImg.src = base64;
          console.log(base64);
        }
      }
      if (this.selectedImgIndex === '1' && this.selectedPoemIndex === '0') {
        let image = new Image();
        debugger
        image.src = require('../assets/1-0.png');
        image.onload = function () {
          let base64 = that.getBase64Image(image);
          that.$refs.theImg.src = base64;
          debugger
          console.log(base64);
        }
        debugger
      }
    } else {
      this.canSave = false;
    }

    //  wx.config({
    //    　　debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
    //    　　appId: data.configMap.appId, // 必填，公众号的唯一标识
    //   　　 timestamp: data.configMap.timestamp, // 必填，生成签名的时间戳
    //    　　nonceStr: data.configMap.nonceStr, // 必填，生成签名的随机串
    //   　　 signature: data.configMap.signature,// 必填，签名，见附录1
    //      　jsApiList: [
    //          "onMenuShareTimeline",//分享朋友圈接口
    //          "onMenuShareAppMessage"//分享给朋友接口
    //      　] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // 　　});

    //wx自动播放声音
    wx.ready(function () {
      let audio = document.getElementById("audioPlay");
      audio.play();
    })

  },
  methods: {
    routeToCustomize () {
      this.$router.push({ name: 'Select' });
    },
    routeToShare () {
      this.imgIndex === 3 ? this.imgIndex = 0 : this.imgIndex++;
      this.imgSrc = this.imgsSrc[this.imgIndex];
    },
    print () {
      // 调整canvas的宽高
      this.imgWidth = this.imgsSrc[this.selectedImgIndex].width;
      this.imgheight = this.imgsSrc[this.selectedImgIndex].height;

      var images = document.querySelectorAll(".apng-image");
      console.log('images', images);
      for (var i = 0; i < images.length; i++) APNG.animateImage(images[i]);

      let canvansTest = document.getElementById('apng-canvas');
      APNG.animateContext(this.imgsSrc[this.selectedImgIndex].path, canvansTest.getContext("2d")).then(a => {
        console.log("fullfilled:", a);
      }).catch(e => {
        console.error("error:", e);
      });
    },

    saveImg () {

    },
    selectCity () {
      this.$router.push({ name: "CitySelect" });
    },
    getBase64Image (img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
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
  top: 10%;
  right: 10%;
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
.app-wrap {
  width: 100%;
  height: 100%;
}
.select-city {
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
  font-size: 1em;
}
</style>
