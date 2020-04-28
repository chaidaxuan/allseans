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
    path: '/select',
    name: 'Select',
    component: Select
  }, {
    path: '/share',
    name: 'Share',
    component: Share
  }, {
    path: '/citySelect',
    name: 'CitySelect',
    component: CitySelect
  }, {
    path: '/entry/',
    name: 'Entry',
    component: Entry
  }
  ]
})
