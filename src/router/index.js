import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Apng from '@/components/Apng'
import Video from '@/components/Video'
import Select from '@/components/Select'
import PageTransition from '@/components/PageTransition'
Vue.use(Router)
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes: [{
    path: '/',
    name: 'PageTransition',
    component: PageTransition, // 引入页面切换组件
    children: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
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
      }]
  }
  ]
})
