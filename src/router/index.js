import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/home'
import About from '../components/about/about'
import Chores from '../components/chores/chores'
import World from '../components/world/world'
import Detail from '../components/detail/detail'
import '../assets/css/base.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About

    },
    {
      path: '/chores',
      name: 'chores',
      component : Chores
    },
    {
      path: '/world',
      name : 'world',
      component : World
    },
    {
      path: '/detail',
      name : 'detail',
      component : Detail
    }
  ]
})
