import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import train from '@/components/train'
import main from '@/components/main'
import passenger from '@/components/passenger'
import buy from '@/components/buy'
import ticketInformation from '@/components/ticketInformation'

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
          path: 'buy',
          component: buy
        },
        {
          path: 'ticketInformation',
          component: ticketInformation
        }
      ]
    }
  ]
})
