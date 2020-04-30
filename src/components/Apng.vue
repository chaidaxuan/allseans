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
        ref="bgCanvas"
        :width="imgWidth"
        :height="imgheight"
        style="width: 100%;height: 100%;object-fit:cover;"
      >
      </canvas>
      <!-- 用于绘制画布 -->
      <canvas
        ref="theCanvas"
        class="canvas-apng"
        :width="canvasWidth"
        :height="canvasHight"
        style="width:100%;height:100%;display:none;"
      >
      </canvas>

      <canvas
        ref="codeCanvas"
        class="canvas-apng"
        width=70
        height=70
        style="display:none;"
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
            <div v-if="oldCustomerSharedTimestamp">{{oldCustomerSharedTimestamp}}<br></div>
            <div v-if="PoemProvince">我在{{PoemProvince}}<br></div>
            <div><br></div>
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
        src='../assets/btn-img/black_share_changan.png'
      >
      <!-- <button
        v-if="!isOldCustomer"
        class="select-city"
        @click="selectCity()"
      > 进入理想省份 </button> -->

      <img
        v-if="!isOldCustomer"
        class="select-city"
        @click="selectCity()"
        src='../assets/btn-img/black_xieshi.png'
      >

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
// import QRCode from 'qrcodejs2'
var QRCode = require('qrcode');
export default {
  name: 'Apng',
  components: {
    Select,
    Share
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      canSave: true,
      imgIndex: 0,
      selectedImgIndex: 0,
      selectedPoemIndex: 0,
      selectedAudioIndex: 0,
      selectedProvince: 'shanghai',
      oldCustomerSharedTimestamp: 0,
      imgsSrc: [
        { path: require("../assets/3.png"), width: 528, height: 960 },
        { path: require("../assets/mountain.png"), width: 352, height: 640 }
      ],
      provinces: [{ provinceCode: 'shanghai', provinceName: '上海' }, { provinceCode: 'beijing', provinceName: '北京' }],
      imgWidth: 528,
      imgheight: 960,
      canvasWidth: 0,
      canvasHight: 0,
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
      ],
      baseMap: [
        { path: require("../assets/普通底图.png"), width: 377, height: 670 },
        { path: require("../assets/普通底图2.png"), width: 377, height: 670 },
      ],
      PoemProvince: '',
      oldCustomerSharedTimestamp: ''
    }
  },

  mounted () {
    this.isOldCustomer = this.$route.params.isOldCustomer === 'true';
    // 判断是否是老客var
    if (this.isOldCustomer) {
      var paramsUrl = window.atob(this.$route.params.cid);
      debugger
    } else {
      var paramsUrl = this.$route.params.cid;
    }
    let that = this;
    this.selectedImgIndex = paramsUrl.split('-')[0];
    this.selectedAudioIndex = paramsUrl.split('-')[1];
    this.selectedPoemIndex = paramsUrl.split('-')[2];
    debugger
    if (this.isOldCustomer) {
      this.selectedProvince = paramsUrl.split('-')[3];
      debugger
      this.PoemProvince = this.provinces.filter(x => x.provinceCode === this.selectedProvince)[0].provinceName || '';
      this.oldCustomerSharedTimestamp = this.timestampToTime(parseFloat(paramsUrl.split('-')[4]));
      debugger
    } else {
      this.selectedProvince = paramsUrl.split('-')[3];
      debugger
      this.PoemProvince = this.provinces.filter(x => x.provinceCode === this.selectedProvince)[0].provinceName || '';
      this.oldCustomerSharedTimestamp = this.timestampToTime(parseFloat(paramsUrl.split('-')[4]));
      debugger
    }
    debugger

    //播放诗歌动画
    let btn = this.$refs.btn;
    this.$refs.btn.click();

    //播放视频  
    this.print();

    //画要下载的图片
    if (this.isOldCustomer) {
      this.printSaveImg();
    } else {
      this.canSave = false;
    }
  },
  methods: {
    routeToCustomize () {
      this.$router.replace({ name: 'Select' });
    },
    routeToShare () {
      this.imgIndex === 3 ? this.imgIndex = 0 : this.imgIndex++;
      this.imgSrc = this.imgsSrc[this.imgIndex];
    },
    print () {
      // 调整canvas的宽高
      this.imgWidth = this.imgsSrc[this.selectedImgIndex].width;
      this.imgheight = this.imgsSrc[this.selectedImgIndex].height;

      let canvansTest = this.$refs.bgCanvas;
      APNG.animateContext(this.imgsSrc[this.selectedImgIndex].path, canvansTest.getContext("2d")).then(a => {
        console.log("fullfilled:", a, this.imgsSrc[this.selectedImgIndex].path);
        debugger
      }).catch(e => {
        console.error("error:", e);
      });
    },

    selectCity () {
      const hash =
        this.selectedImgIndex.toString() +
        "-" +
        this.selectedAudioIndex.toString() +
        "-" +
        this.selectedPoemIndex.toString();

      this.$router.replace({
        name: "CitySelect",
        params: {
          cid: window.btoa(hash),
        }
      });
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
    },
    printSaveImg () {
      let that = this;
      let ctx = this.$refs.theCanvas.getContext("2d");
      let img = this.$refs.theImg;
      let imgBase = new Image();
      imgBase.src = this.baseMap[this.selectedImgIndex].path;
      this.canvasWidth = this.baseMap[this.selectedImgIndex].width;
      this.canvasHight = this.baseMap[this.selectedImgIndex].height;

      imgBase.onload = function () {
        ctx.drawImage(imgBase, 0, 0);
        that.printPoem();
        that.printQCode();

        that.$refs.theImg.src = that.$refs.theCanvas.toDataURL();
      };
    },
    printPoem () {
      let ctx = this.$refs.theCanvas.getContext("2d");
      ctx.font = "14px bold 黑体";
      ctx.fillStyle = "#FFFFFF";

      let poemContent = [...this.poems[this.selectedPoemIndex].poem];
      poemContent.push(`我在${this.PoemProvince}`);
      poemContent.push(`${this.oldCustomerSharedTimestamp}`);
      // 诗词竖排控制
      debugger
      poemContent.forEach((text, index) => {
        let name = text; // 文本内容
        let x = 100 + index * 25,
          y = 100; // 文字开始的坐标
        let letterSpacing = 5; // 设置字间距
        for (let i = 0; i < name.length; i++) {
          const str = name.slice(i, i + 1).toString();
          if (str.match(/[A-Za-z0-9]/) && y < 576) {
            // 非汉字 旋转
            ctx.save();
            //保存当前的绘图状态
            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * 90);
            ctx.textBaseline = "bottom";
            ctx.fillText(str, 0, 0);
            ctx.restore();
            y += ctx.measureText(str).width + letterSpacing; // 计算文字宽度
          } else if (str.match(/[\u4E00-\u9FA5]/) && y < 576) {
            ctx.save();
            ctx.textBaseline = "top";
            ctx.fillText(str, x, y);
            ctx.restore();
            y += ctx.measureText(str).width + letterSpacing; // 计算文字宽度
          }
        }
      })
    },
    // 画二维码部分
    printQCode () {
      let that = this;
      let currentTimestamp = new Date().getTime();
      let url = window.location.origin + window.location.pathname + '#/apng/' + this.selectedImgIndex + '-' + this.selectedAudioIndex + '-' + this.selectedPoemIndex + '-' + this.selectedProvince + '-' + currentTimestamp;
      console.log('codeUrl', url);
      debugger
      // 设置生成的二维码的属性
      let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 0,
      };
      QRCode.toDataURL(url, opts).then(base64 => {
        // 生成二维码
        let ctx = this.$refs.theCanvas.getContext("2d");
        let imgQRCode = new Image();
        imgQRCode.src = base64;
        imgQRCode.onload = function () {

          //使用canvas控制生成二维码的大小
          ctx.drawImage(imgQRCode, 0, 0, imgQRCode.width, imgQRCode.height, 30, 30, 70, 70);
          that.$refs.theImg.src = that.$refs.theCanvas.toDataURL();
        };
      }).catch(e => {
        console.error('e', e);
      })
    },
    printLogo () {
      let imgLogo = new Image();
      imgLogo.src = require('../assets/title.png');
      // imgLogo.onload = func
    },
    timestampToTime (timestamp) {
      if (timestamp) {
        if (timestamp === 0) {
          return ''
        }
        if (timestamp.length != 10) {
          debugger
          var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        } else {
          var date = new Date(timestamp * 1000);
        }
        const Y = date.getFullYear() + '年';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        const D = date.getDate() + '日';
        debugger
        return Y + M + D;
      }
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
  bottom: 13%;
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
  bottom: 13%;
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
</style>
