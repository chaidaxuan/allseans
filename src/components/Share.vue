<template>
  <div class="share-wrap">
    <canvas
      ref="theCanvas"
      class="canvas-apng"
      :width="canvasWidth"
      :height="canvasHight"
      style="width:100%;height:100%;"
    >
    </canvas>
    <!-- <img
      ref="theImg"
      style="width:100%;height:100%;"
      id="Basemap"
    > -->
    <!-- <button @click="save()">
      测试按钮
    </button> -->
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
  canvasWidth = 528;
  canvasHight = 960;
  selectedImg = -1;
  imgsSrc = [
    { path: require("../assets/3.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];
  baseMap = [
    { path: require("../assets/普通底图.png"), width: 370, height: 670 }
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
    // 显示图片
    let that = this;
    let ctx = this.$refs.theCanvas.getContext("2d");
    let img = this.$refs.theImg;
    let imgBase = new Image();
    imgBase.src = this.baseMap[0].path;
    this.canvasWidth = this.baseMap[0].width;
    this.canvasHight = this.baseMap[0].height;

    imgBase.onload = function() {
      ctx!.drawImage(imgBase as HTMLImageElement, 0, 0);
      that.printPoem();
      that.printQCode();
    };
  }

  // 写诗部分
  printPoem() {
    let ctx = this.$refs.theCanvas.getContext("2d");
    ctx!.font = "16px bold 黑体";
    ctx!.fillStyle = "#FFFFFF";
    // ctx!!.fillText("你是四月早天里的云烟,", 100, 150);
    // ctx!!.fillText("你是四月早天里的云烟,", 200, 200);
    // 诗词竖排控制
    let name = "你是四月早天里的云烟"; // 文本内容
    let x = 50,
      y = 50; // 文字开始的坐标
    let letterSpacing = 5; // 设置字间距
    for (let i = 0; i < name.length; i++) {
      const str = name.slice(i, i + 1).toString();
      debugger;
      if (str.match(/[A-Za-z0-9]/) && y < 576) {
        // 非汉字 旋转
        ctx!.save();
        //保存当前的绘图状态
        ctx!.translate(x, y);
        ctx!.rotate((Math.PI / 180) * 90);
        ctx!.textBaseline = "bottom";
        ctx!.fillText(str, 0, 0);
        ctx!.restore();
        y += ctx!.measureText(str).width + letterSpacing; // 计算文字宽度
      } else if (str.match(/[\u4E00-\u9FA5]/) && y < 576) {
        ctx!.save();
        ctx!.textBaseline = "top";
        ctx!.fillText(str, x, y);
        ctx!.restore();
        y += ctx!.measureText(str).width + letterSpacing; // 计算文字宽度
      }
    }
  }

  // 画二维码部分
  printQCode() {
    let ctx = this.$refs.theCanvas.getContext("2d");
    let imgQRCode = new Image();
    imgQRCode.src = require("../assets/QRCode.png");
    imgQRCode.onload = function() {
      ctx!.drawImage(imgQRCode as HTMLImageElement, 100, 30);
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
