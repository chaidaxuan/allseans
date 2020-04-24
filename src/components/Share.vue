<template>
  <div class="share-wrap">
    canvas
    <canvas
      ref="theCanvas"
      class="canvas-apng"
      width="300"
      height="300"
    >

    </canvas>
    img
    <img ref="theImg">
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
  created() {}
  mounted() {
    let ctx = this.$refs.theCanvas.getContext("2d");
    let theImg = this.$refs.theImg;
    ctx!.fillStyle = "#FF0000";
    ctx!.fillRect(0, 0, 150, 75);
    // this.$refs.theCanvas.toBlob(blob => {
    //   let url = URL.createObjectURL(blob);
    //   debugger;
    //   this.$refs.theImg.src = url;
    //   debugger;
    // });
    // debugger;
    this.$refs.theImg.src = this.$refs.theCanvas.toDataURL();
    debugger;
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
