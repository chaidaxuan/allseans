<template>
    <div class="anmimate-box">
        <transition
            :name="transitionName"
            mode="out-in"
        >
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            transitionName: 'slide-left'
        }
    },
    beforeRouteUpdate (to, from, next) {
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    }
}
</script>

<style scoped>
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.anmimate-box {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
</style>