import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import management from '@/components/management/management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/management',
      name: 'management',
      component: management
    }
  ]
})
