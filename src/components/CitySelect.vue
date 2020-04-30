<template>
  <div class="province-wrap">
    <canvas
      ref="theBackgroundCanvas"
      :width="imgWidth"
      :height="imgheight"
      style="width: 100%;height: 100%;object-fit:cover;"
    >
    </canvas>

    <img
      v-if="showSelectImg"
      class="citySelect-img"
      src='../assets/btn-img/black_lvcheng.png'
      @click="showSelectOption(),ModifyProvince()"
    >
    <div
      v-if="!showSelectImg"
      class="citySelect-btn"
    >
      <select
        class="form-control"
        @change="ModifyProvince()"
        v-model="selectedImgIndex"
      >
        <option
          style=""
          v-for=" item in Region"
          :value="item.videoIndex"
          :key="item.videoIndex"
        > {{item.province}}</option>
      </select>
    </div>
    <img
      class="toselect-btn"
      src='../assets/btn-img/black_chufa.png'
      @click="toSelect()"
    >
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class CitySelect extends Vue {
  $router!: Router;
  $refs!: {
    theBackgroundCanvas: HTMLCanvasElement;
  };
  // :class="canClickStart?'toselect-btn ':'toselect-btn img-onlyRead'"
  msg = "Welcome to Your Vue.js App";
  show = false;
  showSelectImg = true;
  selectedImg = 0;
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
  selectedImgIndex = 0;
  selectedAudioIndex = 0;
  selectedPoemIndex = 0;
  isHasSelectedCity = false;
  Region = [
    { province: "-请选择-", videoIndex: -1 },
    { province: "上海", videoIndex: 0 },
    { province: "北京", videoIndex: 1 }
  ];
  provinces = [
    { provinceCode: "shanghai", provinceName: "上海" },
    { provinceCode: "beijing", provinceName: "北京" }
  ];
  created() {}
  mounted() {
    let paramsUrl = this.$route.params.cid;
    this.selectedImgIndex = parseFloat(paramsUrl.split("-")[0]);
    this.selectedAudioIndex = parseFloat(paramsUrl.split("-")[1]);
    this.selectedPoemIndex = parseFloat(paramsUrl.split("-")[2]);

    this.firstSelected();
  }
  animations: { [key: string]: Promise<IAnimation> } = {};
  getAnimation(url: string): Promise<IAnimation> {
    if (!this.animations[url]) {
      this.animations[url] = APNG.parseURL(url);
    }
    return this.animations[url];
  }

  currentAnimation: IAnimation | null = null;
  downloading = false;

  async firstSelected() {
    if (this.selectedImgIndex > -1) {
      this.selectedImg = this.selectedImgIndex;

      debugger;
      // let canvansTest = document.getElementById("apng-canvas");
      this.imgWidth = this.imgsSrc[this.selectedImg].width;
      this.imgheight = this.imgsSrc[this.selectedImg].height;
      let ctx = this.$refs.theBackgroundCanvas.getContext("2d");

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
    window.scroll(0, 0);
  }

  async ModifyProvince() {
    this.isHasSelectedCity = true;
    if (this.selectedImgIndex > -1) {
      this.selectedImg = this.selectedImgIndex;
      // let canvansTest = document.getElementById("apng-canvas");
      this.imgWidth = this.imgsSrc[this.selectedImg].width;
      this.imgheight = this.imgsSrc[this.selectedImg].height;
      let ctx = this.$refs.theBackgroundCanvas.getContext("2d");

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
    window.scroll(0, 0);
  }
  toSelect() {
    if (this.isHasSelectedCity) {
      let provinceCode = this.provinces[this.selectedImgIndex].provinceCode;
      if (provinceCode) {
        debugger;
        const hash =
          this.selectedImg.toString() +
          "-" +
          this.selectedAudioIndex.toString() +
          "-" +
          this.selectedPoemIndex.toString() +
          "-" +
          provinceCode +
          "-" +
          new Date().getTime().toString();
        debugger;
        this.$router.replace({
          name: "Select",
          params: {
            cid: hash,
            isOldCustomer: "false"
          }
        });
      }
    }
  }
  showSelectOption() {
    this.showSelectImg = false;
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
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-100vh);
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

/* .form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
} */

.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: #999;
}

.form-control::-webkit-input-placeholder {
  color: #999;
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #eee;
  opacity: 1;
}

.form-control[disabled],
fieldset[disabled] .form-control {
  cursor: not-allowed;
}
.province-wrap {
  width: 100%;
  height: 100%;
}
.select-wrap {
  padding: 1em;
  display: none;
}
.toselect-btn {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 8%;
  width: 11rem;
  height: 3rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.citySelect-img {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 16%;
  width: 11rem;
  height: 4rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.citySelect-btn {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  /* top: 0; */
  bottom: 14%;
  width: 11rem;
  height: 4rem;
  background-color: transparent;
  color: white;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 1.5em;
}
.img-onlyRead {
  pointer-events: none;
}
</style>
