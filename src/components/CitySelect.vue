<template>
  <div class="province-wrap">
    <div style="width: 100%;position: absolute;top: 20%;">
      <div class="select-wrap">
        <select class="form-control">
          <option
            v-for=" item in Region"
            :value="item"
            :key="item"
          > {{item}}</option>
        </select>
      </div>
      <div style="text-align: center;">
        请选择你的理想城市
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class CitySelect extends Vue {
  $router!: Router;
  $refs!: {
    theCanvas: HTMLCanvasElement;
  };

  msg = "Welcome to Your Vue.js App";
  show = false;
  selectedImg = -1;
  selectedAudio = -1;
  selectedPoem = 0;
  imgsSrc = [
    { path: require("../assets/3.png"), width: 528, height: 960 },
    { path: require("../assets/mountain.png"), width: 352, height: 640 }
  ];
  imgWidth = 320;
  imgheight = 640;
  Region = [
    "-请选择-",
    "安徽",
    "北京",
    "重庆",
    "福建",
    "甘肃",
    "广东",
    "广西",
    "贵州",
    "海南"
  ];
  created() {}
  mounted() {}
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
  color: #555;
  background-color: #fff;
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

.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

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
}
</style>
