<template>
    <div>

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
            msg: 'Welcome to Your Vue.js App',
            show: false,
            imgIndex: 0,
            imgSrc: '/cx-test/static/landscape.png',
            imgsSrc: ['/cx-test/static/landscape.png', '/cx-test/static/road.png', '/cx-test/static/mountain.png', '/cx-test/static/apng.png',],
            audioSrc: '../assets/audio/贵族乐团 - 旅行鸟鸣水声',
            poems: [{ poem: ['你是四月早天里的云烟，', '黄昏吹着风的软，', '星子在无意中闪，', '细雨点洒在花前。'], info: { auth: '——林徽因', chapter: '《你是人间的四月天》节选' } },
            { poem: ['最是那一低头的温柔', '象一朵水莲花不胜凉风的娇羞，', '道一声珍重，道一声珍重，', '那一声珍重里有蜜甜的忧愁', '沙扬娜拉'], info: { auth: '——徐志摩', chapter: '《沙扬娜拉》' } }
            ]
        }
    },

    mounted () {
        let btn = this.$refs.btn
        this.$refs.btn.click()
        console.log('btn', btn)

        this.print();
    },
    methods: {

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
