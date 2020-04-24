<template>
  <div class="share-wrap">
    <canvas
      ref="theCanvas"
      class="canvas-apng"
      :width="imgWidth"
      :height="imgheight"
    >
    </canvas>
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
  imgWidth = 320;
  imgheight = 640;
  selectedImg = -1;
  imgsSrc = [
    { path: require("../assets/landscape.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];

  created() {}
  mounted() {
    console.log("this.$route.query", this.$route.params.selectedImg);
    this.selectedImg = parseInt(this.$route.params.selectedImg);
    // this.print();

    // let ctx = this.$refs.theCanvas.getContext("2d");
    // let theImg = this.$refs.theImg;
    // ctx!.fillStyle = "#FF0000";
    // ctx!.fillRect(0, 0, 150, 75);
    // ctx!.fillText("testtest", 10, 10);
    // ctx!.font = "30px Verdana";
    // ctx!.fillStyle = "#";
    // // this.$refs.theCanvas.toBlob(blob => {
    // //   let url = URL.createObjectURL(blob);
    // //   debugger;
    // //   this.$refs.theImg.src = url;
    // //   debugger;
    // // });
    // // debugger;
    // this.$refs.theImg.src = this.$refs.theCanvas.toDataURL();
    // debugger;
  }
  print() {
    // var images = document.querySelectorAll(".apng-image");
    // console.log("images", images);
    // for (var i = 0; i < images.length; i++) APNG.animateImage(images[i]);
    // let canvansTest = document.getElementById("apng-canvas");
    // APNG.animateContext(
    //   require("../assets/landscape.png"),
    //   canvansTest.getContext("2d")
    // )
    //   .then(a => {
    //     console.log("fullfilled:", a);
    //   })
    //   .catch(e => {
    //     console.error("error:", e);
    //   });
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
