import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player'
import Album from '@/components/Album'
import List from '@/components/Album/List'
import Controller from '@/components/Controller'

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
      path: '/Controller',
      name: 'Controller',
      component: Controller,
    }
  ]
})
