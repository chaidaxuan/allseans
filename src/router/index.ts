import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Apng from '@/components/Apng.vue'
import Video from '@/components/Video.vue'
import Select from '@/components/Select.vue'
import Share from '@/components/Share.vue'

Vue.use(Router);
(Router.prototype as any).goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/video',
    name: 'Video',
    component: Video
  }, {
    path: '/apng',
    name: 'Apng',
    component: Apng
  }, {
    path: '/select',
    name: 'Select',
    component: Select
  }, {
    path: '/share',
    name: 'Share',
    component: Share
  }]
})
