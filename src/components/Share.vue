<template>
  <div class="share-wrap">
    <!-- <canvas
      ref="theCanvas"
      class="canvas-apng"
      :width="imgWidth"
      :height="imgheight"
      style="width:100%;height:100%;"
    >
    </canvas> -->
    <img
      ref="theImg"
      style="width:100%;height:100%;"
      id="Basemap"
    >
    <button @click="save()">
      测试按钮
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class Share extends Vue {
  $router!: Router;
  $refs!: {
    theCanvas: HTMLCanvasElement;
    theImg: HTMLImageElement;
  };
  imgWidth = 528;
  imgheight = 960;
  selectedImg = -1;
  imgsSrc = [
    { path: require("../assets/3.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];
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

  created() {}
  mounted() {
    this.print();
    // this.$refs.theCanvas.toBlob(blob => {
    //   let url = URL.createObjectURL(blob);
    //   debugger;
    //   this.$refs.theImg.src = url;
    //   debugger;
    // });
    // debugger;
    // this.$refs.theImg.src = this.$refs.theCanvas.toDataURL();
  }
  print() {
    // let that = this;
    // let ctx = this.$refs.theCanvas.getContext("2d");
    // let img = this.$refs.theImg;
    // let imgBase = new Image();
    // imgBase.src = require("../assets/basemap.jpg");
    // imgBase.onload = function() {
    //   ctx!.drawImage(imgBase as HTMLImageElement, 0, 0);
    //   that.printPoem();
    //   that.printQCode();
    // };
  }
  // 写诗部分
  printPoem() {
    let ctx = this.$refs.theCanvas.getContext("2d");
    ctx!.font = "24px bold 黑体";
    ctx!.fillStyle = "#FF0000";
    ctx!.fillText("你是四月早天里的云烟，", 100, 150);
  }

  // 画二维码部分
  printQCode() {
    let ctx = this.$refs.theCanvas.getContext("2d");
    let imgBase = new Image();
    imgBase.src = require("../assets/aigen.png");
    imgBase.onload = function() {
      ctx!.drawImage(imgBase as HTMLImageElement, 150, 0);
    };
  }
  save() {
    this.$refs.theImg.src = this.$refs.theCanvas.toDataURL();
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
.share-wrap {
  width: 100%;
  height: 100%;
}
</style>
