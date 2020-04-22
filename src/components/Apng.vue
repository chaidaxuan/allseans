<template>
  <div>
    <div style="width: 100vw;height: 100vh;">
      <!-- 声音按钮 -->

      <img
        src="../assets/landscape.png"
        style="width: 100vw;height: 100vh;object-fit:cover;"
      >

      <button
        @click="show = true"
        ref="btn"
        style="display:none"
      >动画</button>
      <transition name="slide-fade">
        <button
          v-if="show"
          class="text-btn"
        >
          <!-- <div class="poem">
            {{poems[0].poem[0]}}<br>
            <text>你是四月早天里的云烟，<br></text>黄昏吹着风的软，<br>星子在无意中闪，<br>细雨点洒在花前。<br>——林徽因<br>《你是人间的四月天》节选
          </div> -->

          <div class="poem">
            <div
              v-for="(item,i) in  poems[0].poem"
              :key='i'
            >{{item}}<br></div>
          </div>

        </button>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Apng',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      poems: [{ poem: ['你是四月早天里的云烟，', '黄昏吹着风的软，', '星子在无意中闪，', '细雨点洒在花前。'], info: { auth: '林徽因', chapter: '《你是人间的四月天》节选' } }]
    }
  },
  mounted () {
    let btn = this.$refs.btn
    this.$refs.btn.click()
    console.log('btn', btn)
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
  transform: translateY(-10vh);
  opacity: 0;
}

/* .slide-fade-enter {
  animation: bounce-in 3s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
} */
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
.text-btn {
  display: block;
  position: fixed;
  color: white;
  font-size: 30px;
  border: 0px;
  padding: 0px;
  background-color: transparent;
  top: 50px;
  right: 50px;
  font-family: "Microsoft YaHei";
}
.poem {
  font-size: 1.1rem;
  text-align: left;
  margin: 0 auto;
  height: 50vh;
  writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  writing-mode: tb-rl; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
}
</style>
