import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import train from '@/components/train'
import analysis from '@/components/analysis'
import main from '@/components/main'
import passenger from '@/components/passenger'
import buy from '@/components/buy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: '',
          redirect: 'train'
        },
        {
          path: 'train',
          component: train
        },
        {
          path: 'passenger',
          component: passenger
        },
        {
          path: 'analysis',
          component: analysis
        },
        {
          path: 'buy',
          component: buy
        }
      ]
    }
  ]
})
