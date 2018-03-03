import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player'
import Album from '@/components/Album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Album',
      name: 'Album',
      component: Album,
    }
  ]
})
