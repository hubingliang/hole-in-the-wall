import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player'
import Album from '@/components/Album'
import List from '@/components/Album/List'
import Describe from '@/components/Describe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Album',
      name: 'Album',
      component: Album,
      children : [
        { path: '/Album/:id', component: List, props: true }
      ]
    },
    {
      path: '/Describe',
      name: 'Describe',
      component: Describe,
    }
  ]
})
