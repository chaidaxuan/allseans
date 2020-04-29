import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Apng from '@/components/Apng.vue'
import Select from '@/components/Select.vue'
import Share from '@/components/Share.vue'
import Entry from '@/components/Entry.vue'
import apngTest from '@/components/apngTest.vue'
import CitySelect from '@/components/CitySelect.vue'
import Welcome from '@/components/Welcome.vue'

Vue.use(Router);
(Router.prototype as any).goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

export default new Router({

  // 老客进入欢迎页 /entry/beijing/ 目前是/welcome
  // 老客进入选择页 /select/beijing/
  // 老客进入分享页 /apng/0-0-0-beijing-1588066930730 isOldCustom:true

  // 新客进入老客的分享页 /apng/0-0-0-beijing-1588066930730 isOldCustom:false
  // 新客进入理想省份页面 /citySelect/0-0-0-beijing-1588066930730
  // 新客进入选择页面     /select/beijing/  这beijing是新客选择的
  // 新客进入分享页面     /select/0-0-0-beijing-1588066930730 isOldCustom:true 

  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }, {
    path: '/apng/:cid',
    name: 'Apng',
    component: Apng
  }, {
    path: '/apngTest',
    name: 'apngTest',
    component: apngTest
  }, {
    path: '/select/:cid',
    name: 'Select',
    component: Select
  }, {
    path: '/share',
    name: 'Share',
    component: Share
  }, {
    path: '/citySelect/:cid',
    name: 'CitySelect',
    component: CitySelect
  }, {
    path: '/entry/',
    name: 'Entry',
    component: Entry
  }
  ]
})
