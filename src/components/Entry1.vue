<template>
  <div class="entray-wrap">
    当前入口:xxx城市
    {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Router from "vue-router";

@Component({ components: {} })
export default class Entry1 extends Vue {
  $router!: Router;

  created() {}
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.entray-wrap {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
