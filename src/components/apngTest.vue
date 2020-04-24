<template>
    <div class="app-wrap">
        <div class="apng-wrap">
            <audio
                class='audio'
                src="../assets/output2.mp3"
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

            <img
                class="share-btn"
                src='../assets/share.png'
            >
            <img
                class="customize-btn"
                src='../assets/customize-btn.png'
                @click="routeToCustomize()"
            >
            <!-- 全季logo -->
            <img
                class="title-img"
                src='../assets/title.png'
            >
        </div>
    </div>
</template>

<script>
import Select from '@/components/Select'
import Share from '@/components/Share'

export default {
    name: 'apngTest',
    components: {
        Select,
        Share
    },

    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            show: false,
            imgIndex: 0,
            imgsSrc: [
                { path: require("../assets/landscape.png"), width: 528, height: 960 },
                { path: require("../assets/mountain.png"), width: 352, height: 640 }
            ],
            imgWidth: 528,
            imgheight: 960,
            audioSrc: '../assets/audio/贵族乐团 - 旅行鸟鸣水声',
            poems: [{ poem: ['你是四月早天里的云烟，', '黄昏吹着风的软，', '星子在无意中闪，', '细雨点洒在花前。'], info: { auth: '——林徽因', chapter: '《你是人间的四月天》节选' } },
            { poem: ['最是那一低头的温柔', '象一朵水莲花不胜凉风的娇羞，', '道一声珍重，道一声珍重，', '那一声珍重里有蜜甜的忧愁', '沙扬娜拉'], info: { auth: '——徐志摩', chapter: '《沙扬娜拉》' } }
            ],
        }
    },

    mounted () {
        let btn = this.$refs.btn
        this.$refs.btn.click()
        this.print();
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
            var images = document.querySelectorAll(".apng-image");
            console.log('images', images);
            for (var i = 0; i < images.length; i++) APNG.animateImage(images[i]);

            let canvansTest = document.getElementById('apng-canvas');
            APNG.animateContext(require('../assets/landscape.png'), canvansTest.getContext("2d")).then(a => {
                console.log("fullfilled:", a);
            }).catch(e => {
                console.error("error:", e);
            });
        },
        clear () {

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
</style>
