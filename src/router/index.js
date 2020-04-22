import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Apng from '@/components/Apng'
import Video from '@/components/Video'
import Select from '@/components/Select'
Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
