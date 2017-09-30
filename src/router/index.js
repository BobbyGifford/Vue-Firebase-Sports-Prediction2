import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PredictionList from '@/components/predictions/categories/FullList'
import PredictionItem from '@/components/predictions/categories/PredItem'
import NFL from '@/components/predictions/categories/NFL'
import College from '@/components/predictions/categories/College'
import AddPrediction from '@/components/predictions/AddPred'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/predictionItem/:id',
      props: true,
      name: 'PredictionItem',
      component: PredictionItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/predictionList',
      name: 'PredictionList',
      component: PredictionList,
      beforeEnter: AuthGuard
    },
    {
      path: '/addPrediction',
      name: 'AddPrediction',
      component: AddPrediction,
      beforeEnter: AuthGuard
    },
    {
      path: '/NFL',
      name: 'NFL',
      component: NFL,
      beforeEnter: AuthGuard
    },
    {
      path: '/college',
      name: 'college',
      component: College,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
