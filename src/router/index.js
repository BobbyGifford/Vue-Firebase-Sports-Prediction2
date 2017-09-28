import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PredictionList from '@/components/predictions/categories/FullList'
import PredictionItem from '@/components/predictions/categories/PredItem'
import NFL from '@/components/predictions/categories/NFL'
import College from '@/components/predictions/categories/College'
import AddPrediction from '@/components/predictions/AddPred'
import Edit from '@/components/predictions/Edit'

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
      component: PredictionItem
    },
    {
      path: '/predictionList',
      name: 'PredictionList',
      component: PredictionList
    },
    {
      path: '/addPrediction',
      name: 'AddPrediction',
      component: AddPrediction
    },
    {
      path: '/NFL',
      name: 'NFL',
      component: NFL
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/college',
      name: 'college',
      component: College
    }
  ],
  mode: 'history'
})
